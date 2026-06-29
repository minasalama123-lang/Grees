import { NextResponse, type NextRequest } from "next/server";
import { isSameOrigin } from "@/lib/http";
import { getSupabaseAdmin, STORAGE_BUCKET } from "@/lib/supabase/server";

/**
 * Product image upload → Supabase Storage. Returns a public URL the product
 * form stores in the gallery. Server-side validation of type and size is the
 * security boundary (never trust the client's claimed content-type alone).
 */
export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

/**
 * Detect a real raster-image type from the file's leading bytes (magic
 * numbers), independent of the client-supplied Content-Type. Returns the
 * canonical MIME, or null when the bytes don't match a supported image.
 *
 * This — not `file.type` — is the security boundary. SVG is intentionally
 * absent: it is an XML document that can embed <script>, so it is never
 * accepted as a product image.
 */
function sniffImageType(b: Uint8Array): string | null {
  // JPEG: FF D8 FF
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) {
    return "image/jpeg";
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    b.length >= 8 &&
    b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 &&
    b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a
  ) {
    return "image/png";
  }
  // GIF: "GIF87a" or "GIF89a"
  if (
    b.length >= 6 &&
    b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x38 &&
    (b[4] === 0x37 || b[4] === 0x39) && b[5] === 0x61
  ) {
    return "image/gif";
  }
  // WebP: RIFF container — "RIFF" .... "WEBP"
  if (
    b.length >= 12 &&
    b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
    b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50
  ) {
    return "image/webp";
  }
  // AVIF: ISO-BMFF — "ftyp" at offset 4, with an AVIF brand at offset 8.
  if (
    b.length >= 12 &&
    b[4] === 0x66 && b[5] === 0x74 && b[6] === 0x79 && b[7] === 0x70
  ) {
    const brand = String.fromCharCode(b[8], b[9], b[10], b[11]);
    if (brand === "avif" || brand === "avis") return "image/avif";
  }
  return null;
}

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const db = getSupabaseAdmin();
  if (!db) {
    return NextResponse.json(
      { ok: false, error: "Connect Supabase to upload images." },
      { status: 400 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid upload." },
      { status: 400 },
    );
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "No file provided." },
      { status: 400 },
    );
  }

  if (file.size === 0 || file.size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Image must be between 1 byte and 5 MB." },
      { status: 413 },
    );
  }

  const bytes = new Uint8Array(await file.arrayBuffer());

  // Verify the ACTUAL bytes are a supported image. The client-declared
  // Content-Type (file.type) is ignored for this decision — it is trivially
  // spoofable. A file whose bytes aren't a real image (or is an SVG) is
  // rejected here.
  const detected = sniffImageType(bytes);
  const ext = detected ? ALLOWED[detected] : undefined;
  if (!detected || !ext) {
    return NextResponse.json(
      {
        ok: false,
        error: "Unsupported or invalid image (use a real JPG, PNG, WebP, AVIF or GIF).",
      },
      { status: 415 },
    );
  }

  const path = `products/${crypto.randomUUID()}.${ext}`;

  const { error } = await db.storage
    .from(STORAGE_BUCKET)
    .upload(path, bytes, { contentType: detected, upsert: false });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const { data } = db.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return NextResponse.json({ ok: true, url: data.publicUrl, path });
}
