import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render } from "@testing-library/react";
import { Reveal } from "./Reveal";

/**
 * Reveal must NEVER leave content permanently hidden, on any browser. These
 * tests cover the three failure modes the production iOS Safari bug exposed.
 */

// Captured after setup.ts has installed its (immediately-firing) IO stub.
const installedIO = globalThis.IntersectionObserver;
const FALLBACK_PLUS = 1600; // a bit over the component's 1500ms safety net

function wrapperOf(container: HTMLElement): HTMLElement {
  return container.firstChild as HTMLElement;
}

afterEach(() => {
  globalThis.IntersectionObserver = installedIO;
  vi.useRealTimers();
});

describe("Reveal resilience", () => {
  it("reveals content when the observer fires normally", () => {
    // setup.ts's stub reports the element as intersecting immediately.
    const { container, getByText } = render(
      <Reveal>
        <p>visible content</p>
      </Reveal>,
    );
    expect(getByText("visible content")).toBeInTheDocument();
    expect(wrapperOf(container).className).toContain("opacity-100");
    expect(wrapperOf(container).className).not.toContain("opacity-0");
  });

  it("stays visible when IntersectionObserver is unavailable", () => {
    // Simulate a browser / environment without IO support.
    globalThis.IntersectionObserver =
      undefined as unknown as typeof IntersectionObserver;

    const { container } = render(
      <Reveal>
        <p>no observer</p>
      </Reveal>,
    );
    // Never armed → renders visible, never hidden.
    expect(wrapperOf(container).className).toContain("opacity-100");
    expect(wrapperOf(container).className).not.toContain("opacity-0");
  });

  it("reveals via the fallback timer if the observer never fires", () => {
    vi.useFakeTimers();
    // An observer that is set up but never invokes its callback (the iOS bug).
    class NeverFiringObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "";
      readonly thresholds = [];
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    }
    globalThis.IntersectionObserver =
      NeverFiringObserver as unknown as typeof IntersectionObserver;

    const { container } = render(
      <Reveal>
        <p>stuck?</p>
      </Reveal>,
    );

    // Armed but not yet revealed → hidden at this instant.
    expect(wrapperOf(container).className).toContain("opacity-0");

    // After the safety-net timeout, it reveals itself.
    act(() => {
      vi.advanceTimersByTime(FALLBACK_PLUS);
    });
    expect(wrapperOf(container).className).toContain("opacity-100");
    expect(wrapperOf(container).className).not.toContain("opacity-0");
  });
});
