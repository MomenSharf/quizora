export function focusEditorField(path: string) {
  const element = document.querySelector<HTMLElement>(
    `[data-field-name="${CSS.escape(path)}"]`,
  );

  if (!element) {
    console.warn(
      `Unable to find editor field: ${path}`,
    );

    return false;
  }

  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  window.setTimeout(() => {
    element.focus({
      preventScroll: true,
    });
  }, 250);

  return true;
}