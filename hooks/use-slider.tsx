"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

export interface UseSliderReturn<T extends HTMLElement> {
  ref: RefObject<T | null>;

  canScroll: boolean;
  canScrollLeft: boolean;
  canScrollRight: boolean;

  isAtStart: boolean;
  isAtEnd: boolean;

  overflow: "none" | "left" | "right" | "both";

  scrollNext: () => void;
  scrollPrevious: () => void;
  scrollToStart: () => void;
  scrollToEnd: () => void;
  scrollBy: (value: number) => void;

  update: () => void;
}

export function useSlider<T extends HTMLElement>(
  step = 250,
): UseSliderReturn<T> {
  const ref = useRef<T>(null);

  const [state, setState] = useState({
    canScroll: false,
    canScrollLeft: false,
    canScrollRight: false,
    isAtStart: true,
    isAtEnd: true,
    overflow: "none" as "none" | "left" | "right" | "both",
  });

  const update = useCallback(() => {
    const el = ref.current;

    if (!el) return;

    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);

    const canScroll = maxScroll > 1;

    const isAtStart = el.scrollLeft <= 1;
    const isAtEnd = el.scrollLeft >= maxScroll - 1;

    const canScrollLeft = canScroll && !isAtStart;
    const canScrollRight = canScroll && !isAtEnd;

    let overflow: "none" | "left" | "right" | "both";

    if (!canScroll) overflow = "none";
    else if (isAtStart) overflow = "right";
    else if (isAtEnd) overflow = "left";
    else overflow = "both";

    setState({
      canScroll,
      canScrollLeft,
      canScrollRight,
      isAtStart,
      isAtEnd,
      overflow,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(el);

    const mutationObserver = new MutationObserver(update);
    mutationObserver.observe(el, {
      childList: true,
      subtree: true,
    });

    el.addEventListener("scroll", update, {
      passive: true,
    });

    window.addEventListener("resize", update);

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();

      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByValue = useCallback((value: number) => {
    ref.current?.scrollBy({
      left: value,
      behavior: "smooth",
    });
  }, []);

  const scrollNext = useCallback(() => {
    scrollByValue(step);
  }, [scrollByValue, step]);

  const scrollPrevious = useCallback(() => {
    scrollByValue(-step);
  }, [scrollByValue, step]);

  const scrollToStart = useCallback(() => {
    ref.current?.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const scrollToEnd = useCallback(() => {
    const el = ref.current;

    if (!el) return;

    el.scrollTo({
      left: el.scrollWidth,
      behavior: "smooth",
    });
  }, []);

  return {
    ref,

    ...state,

    scrollNext,
    scrollPrevious,
    scrollToStart,
    scrollToEnd,
    scrollBy: scrollByValue,

    update,
  };
}