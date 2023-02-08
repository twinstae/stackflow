/* eslint-disable no-param-reassign */

import type { Ref } from 'vue';

import { globalVars } from "../theme.css";
import { listenOnce, noop } from "../utils";
import { useStyleEffect } from "./useStyleEffect";
import { OFFSET_PX_CUPERTINO } from "./useStyleEffectOffset";

export function useStyleEffectSwipeBack({
  theme,
  dimRef,
  edgeRef,
  paperRef,
  hasEffect,
  prevented,
  onSwiped,
}: {
  theme: "android" | "cupertino";
  dimRef: Ref<HTMLDivElement | null>;
  edgeRef: Ref<HTMLDivElement | null>;
  paperRef: Ref<HTMLDivElement | null>;
  hasEffect?: boolean;
  prevented?: boolean;
  onSwiped?: () => void;
}) {
  useStyleEffect({
    styleName: "swipe-back",
    refs: [paperRef],
    effect: hasEffect
      ? ({ refs }) => {
          if (theme !== "cupertino") {
            return noop;
          }

          if (!dimRef.value || !edgeRef.value || !paperRef.value) {
            return noop;
          }

          const $dim = dimRef.value;
          const $edge = edgeRef.value;
          const $paper = paperRef.value;

          let x0: number | null = null;
          let t0: number | null = null;
          let x: number | null = null;

          let cachedRefs: Array<{
            style: {
              transform: string;
              transition: string;
            };
            parentElement?: {
              style: {
                display: string;
              };
            };
          }> = [];

          const resetState = () => {
            x0 = null;
            t0 = null;
            x = null;
            cachedRefs = [];
          };

          let _rAFLock = false;

          function movePaper(dx: number) {
            if (!_rAFLock) {
              _rAFLock = true;

              requestAnimationFrame(() => {
                const p = dx / $paper.clientWidth;

                $dim.style.opacity = `${1 - p}`;
                $dim.style.transition = "0s";

                $paper.style.overflowY = "hidden";
                $paper.style.transform = `translate3d(${dx}px, 0, 0)`;
                $paper.style.transition = "0s";

                refs.forEach((ref) => {
                  if (!ref.value) {
                    return;
                  }

                  ref.value.style.transform = `translate3d(${
                    -1 * (1 - p) * OFFSET_PX_CUPERTINO
                  }px, 0, 0)`;
                  ref.value.style.transition = "0s";

                  if (ref.value.parentElement?.style.display === "none") {
                    ref.value.parentElement.style.display = "block";
                  }
                });

                _rAFLock = false;
              });
            }
          }

          function resetPaper({ swiped }: { swiped: boolean }): Promise<void> {
            return new Promise((resolve) => {
              requestAnimationFrame(() => {
                $dim.style.opacity = `${swiped ? 0 : 1}`;
                $dim.style.transition = globalVars.transitionDuration;

                $paper.style.overflowY = "hidden";
                $paper.style.transform = `translateX(${swiped ? "100%" : "0"})`;
                $paper.style.transition = globalVars.transitionDuration;

                refs.forEach((ref) => {
                  if (!ref.value) {
                    return;
                  }

                  ref.value.style.transition = globalVars.transitionDuration;
                  ref.value.style.transform = `translate3d(${
                    swiped ? "0" : `-${OFFSET_PX_CUPERTINO / 16}rem`
                  }, 0, 0)`;
                });

                const _cachedRefs = [...cachedRefs];

                resolve();

                listenOnce($paper, "transitionend", () => {
                  $dim.style.opacity = "";
                  $paper.style.overflowY = "";
                  $paper.style.transform = "";

                  refs.forEach((ref, i) => {
                    if (!ref.value) {
                      return;
                    }

                    const _cachedRef = _cachedRefs[i];

                    if (swiped) {
                      ref.value.style.transition = "";
                      ref.value.style.transform = "";

                      if (ref.value.parentElement) {
                        ref.value.parentElement.style.display = "";
                      }
                    } else if (_cachedRef) {
                      ref.value.style.transition =
                        _cachedRef.style.transition;
                      ref.value.style.transform = _cachedRef.style.transform;

                      if (
                        ref.value.parentElement &&
                        _cachedRef.parentElement
                      ) {
                        ref.value.parentElement.style.display =
                          _cachedRef.parentElement.style.display;
                      }
                    }
                  });
                });
              });
            });
          }

          const onTouchStart = (e: TouchEvent) => {
            const { activeElement } = document as any;

            activeElement?.blur?.();
            // eslint-disable-next-line no-multi-assign
            x0 = x = e.touches[0].clientX;
            t0 = Date.now();

            cachedRefs = refs.map((ref) => {
              if (!ref.value) {
                return {
                  style: {
                    transform: "",
                    transition: "",
                  },
                };
              }

              return {
                style: {
                  transform: ref.value.style.transform,
                  transition: ref.value.style.transition,
                },
                parentElement: ref.value.parentElement
                  ? {
                      style: {
                        display: ref.value.parentElement.style.display,
                      },
                    }
                  : undefined,
              };
            });
          };

          const onTouchMove = (e: TouchEvent) => {
            if (!x0) {
              resetState();
              return;
            }

            x = e.touches[0].clientX;

            movePaper(x - x0);
          };

          const onTouchEnd = () => {
            if (!x0 || !t0 || !x) {
              resetState();
              return;
            }

            const t = Date.now();
            const v = (x - x0) / (t - t0);
            const swiped = v > 1 || x / $paper.clientWidth > 0.4;

            if (swiped) {
              onSwiped?.();
            }

            Promise.resolve()
              .then(() => resetPaper({ swiped }))
              .then(() => resetState());
          };

          $edge.addEventListener("touchstart", onTouchStart, { passive: true });
          $edge.addEventListener("touchmove", onTouchMove, { passive: true });
          $edge.addEventListener("touchend", onTouchEnd, { passive: true });
          $edge.addEventListener("touchcancel", onTouchEnd, { passive: true });

          return () => {
            $edge.removeEventListener("touchstart", onTouchStart);
            $edge.removeEventListener("touchmove", onTouchMove);
            $edge.removeEventListener("touchend", onTouchEnd);
            $edge.removeEventListener("touchcancel", onTouchEnd);
          };
        }
      : undefined,
    effectDeps: [prevented],
  });
}
