import { inject } from "vue";
import { ACTIVITY_KEY } from "./ActivityContext";
import type { Activity } from "@stackflow/core";

/**
 * Get current activity state
 * 현재 액티비티 상태를 가져옵니다
 */
export const useActivity = () => inject(ACTIVITY_KEY) as Activity;