import { CoreStore } from '@stackflow/core';
import { type InjectionKey, provide } from "vue";

export const CORE_ACTIONS_KEY = Symbol("stackflow-core-actions-key") as InjectionKey<CoreStore["actions"]>;
export const provideCoreActions = (value: CoreStore["actions"]) => provide(CORE_ACTIONS_KEY, value);
