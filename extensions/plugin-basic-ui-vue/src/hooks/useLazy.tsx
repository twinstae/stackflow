import { shallowRef, watchEffect } from "vue";

import { requestNextFrame } from "../utils";

export function useLazy<T>(value: T) {
  const stateRef = shallowRef(undefined as T | undefined);

  watchEffect(() => {
    requestNextFrame(() => {
      stateRef.value = value;
    });
  });

  return stateRef;
}
