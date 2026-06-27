import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Reveal } from "./Reveal";

/**
 * Reveal is now pure CSS (no JS / IntersectionObserver). The contract we must
 * guarantee: content is ALWAYS in the DOM and visible by default — the reveal
 * animation is enhancement only and can never hide anything.
 */
describe("Reveal (CSS-only, visible by default)", () => {
  it("renders its children", () => {
    const { getByText } = render(
      <Reveal>
        <p>hello</p>
      </Reveal>,
    );
    expect(getByText("hello")).toBeInTheDocument();
  });

  it("applies .reveal but never an opacity-0 / hidden state", () => {
    const { container } = render(<Reveal className="custom">x</Reveal>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("reveal");
    expect(el.className).toContain("custom");
    // No utility or inline style hides it by default.
    expect(el.className).not.toContain("opacity-0");
    expect(el.style.opacity).not.toBe("0");
  });

  it("honours the `as` prop", () => {
    const { container } = render(<Reveal as="section">x</Reveal>);
    expect((container.firstChild as HTMLElement).tagName).toBe("SECTION");
  });

  it("still accepts the deprecated delay prop", () => {
    const { getByText } = render(<Reveal delay={120}>kept</Reveal>);
    expect(getByText("kept")).toBeInTheDocument();
  });
});
