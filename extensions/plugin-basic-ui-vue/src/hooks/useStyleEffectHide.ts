/* eslint-disable no-param-reassign */

import type { Ref } from 'vue';

import { noop } from "../utils";
import { useStyleEffect } from "./useStyleEffect";

export function useStyleEffectHide({
  refs,
  hasEffect,
}: {
  refs: Array<Ref<any>>;
  hasEffect?: boolean;
}) {
  useStyleEffect({
    styleName: "hide",
    refs,
    effect: hasEffect
      ? ({ activityTransitionState, refs }) => {
          const cleanup = () => {
            refs.forEach((ref) => {
              if (!ref.value) {
                return;
              }
              const $ref = ref.value;

              $ref.style.display = "";
            });
          };

          switch (activityTransitionState) {
            case "enter-done": {
              refs.forEach((ref) => {
                if (!ref.value) {
                  return;
                }
                const $ref = ref.value;

                $ref.style.display = "none";
              });

              return () => {
                cleanup();
              };
            }
            default: {
              cleanup();

              return noop;
            }
          }
        }
      : undefined,
  });
}
