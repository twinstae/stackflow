import { watchEffect, type WatchEffect, type WatchOptionsBase } from 'vue';
import { useActivity } from "./activity/useActivity";
import { noop } from "./utils";

export const useEnterDoneEffect = (
  effect: WatchEffect,
	options?: WatchOptionsBase,
) => {
  const { isTop, transitionState } = useActivity();

  watchEffect((onCleanUp) => {
    if (isTop && transitionState === "enter-done") {
      return effect(onCleanUp);
    }

    return noop;
  }, options);
};
