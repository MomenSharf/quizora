type ScrollPosition = "top" | "bottom";

export function scrollElement(
  element: HTMLElement | null,
  position: ScrollPosition,
  behavior: ScrollBehavior = "smooth",
) {
  if (!element) return;

  element.scrollTo({
    top: position === "top" ? 0 : element.scrollHeight,
    behavior,
  });
}
