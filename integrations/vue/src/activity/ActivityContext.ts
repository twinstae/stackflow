import { type InjectionKey, provide } from "vue";
import type { Activity } from "@stackflow/core";

export const ACTIVITY_KEY = Symbol("stackflow-activity-key") as InjectionKey<Activity>;
export const provideActivity = (value: Activity) => provide(ACTIVITY_KEY, value);
