import { type InjectionKey, provide } from "vue";
import type { StackflowVuePlugin } from "../StackflowVuePlugin";

export type PluginsContextValue = Array<ReturnType<StackflowVuePlugin>>;

export const PLUGIN_CONTEXT_KEY = Symbol("stackflow-plugin-context-key") as InjectionKey<PluginsContextValue>;
export const providePlugins = (value: PluginsContextValue) => provide(PLUGIN_CONTEXT_KEY, value);
