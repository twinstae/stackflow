import { type InjectionKey, provide, type ComputedRef, computed, type Ref } from "vue";
import type { Stack } from "@stackflow/core";

export const CORE_STATE_KEY = Symbol("stackflow-core-state-key") as InjectionKey<Ref<Stack>>;
export const provideCoreState = (ref: Ref<Stack>) => provide(CORE_STATE_KEY, ref);
