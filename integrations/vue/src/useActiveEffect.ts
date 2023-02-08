import { type WatchEffect, watchEffect, type WatchOptionsBase } from 'vue';
import { useActivity } from "./activity/useActivity";
import { noop } from "./utils";

export const useActiveEffect = (
	effect: WatchEffect,
	options?: WatchOptionsBase
) => {
  const { isActive } = useActivity();

  watchEffect((onCleanUp) => {
    if (isActive) {
      return effect(onCleanUp);
    }

    return noop;
  }, options);
};
