export function delegateHover(
  root: HTMLElement,
  selector: string,
  onEnter: (el: HTMLElement) => void,
  onLeave: (el: HTMLElement) => void,
): () => void {
  const handleEnter = (e: Event) => {
    const el = (e.target as Element).closest?.(selector) as HTMLElement | null;
    if (el) onEnter(el);
  };
  const handleLeave = (e: Event) => {
    const el = (e.target as Element).closest?.(selector) as HTMLElement | null;
    if (!el) return;
    const to = (e as PointerEvent | FocusEvent).relatedTarget as Node | null;
    if (to && el.contains(to)) return;
    onLeave(el);
  };
  root.addEventListener("pointerover", handleEnter);
  root.addEventListener("pointerout", handleLeave);
  root.addEventListener("focusin", handleEnter);
  root.addEventListener("focusout", handleLeave);
  return () => {
    root.removeEventListener("pointerover", handleEnter);
    root.removeEventListener("pointerout", handleLeave);
    root.removeEventListener("focusin", handleEnter);
    root.removeEventListener("focusout", handleLeave);
  };
}
