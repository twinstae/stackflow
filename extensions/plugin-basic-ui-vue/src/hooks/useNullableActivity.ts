import type { Activity } from "@stackflow/core";
import { useActivity } from "@stackflow/vue";

export function useNullableActivity() {
	return useActivity() as Activity | null;
}
