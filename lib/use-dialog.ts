"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface UseDialogOptions {
  open: boolean;
  onClose: () => void;
  containerRef: RefObject<HTMLElement | null>;
  /** Modal dialogs trap focus and lock page scroll. */
  modal?: boolean;
  /** Element to focus on open; defaults to the first focusable element. */
  initialFocusRef?: RefObject<HTMLElement | null>;
}

/**
 * Keyboard and focus behaviour for overlays: Escape closes, focus moves in on
 * open and returns to the trigger on close; modal mode also traps Tab and
 * stops the page behind from scrolling.
 */
export function useDialog({
  open,
  onClose,
  containerRef,
  modal = true,
  initialFocusRef,
}: UseDialogOptions) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    if (modal) document.body.style.overflow = "hidden";

    const getFocusable = () =>
      Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
      );

    // Wait a frame so the overlay is mounted before focusing into it.
    const frame = requestAnimationFrame(() => {
      const target =
        initialFocusRef?.current ?? getFocusable()[0] ?? containerRef.current;
      target?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (!modal || event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      if (modal) document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, modal, containerRef, initialFocusRef]);
}
