
import type { DefineComponent } from 'vue'
export type ActivityComponentType<
  T extends { [K in keyof T]: string | undefined } = {},
> = DefineComponent<{ params: T }>;