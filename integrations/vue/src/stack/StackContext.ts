import type { Stack } from '@stackflow/core';
import { type InjectionKey, provide } from "vue";


export const STACK_CONTEXT_KEY = Symbol("stackflow-stack-context-key") as InjectionKey<Stack>;
export const provideStack = (value: Stack) => provide(STACK_CONTEXT_KEY, value);
