import { useActions } from "@stackflow/vue";
import type { TypeActivities } from "./stackflow";

export const useFlow = () => {
  return useActions<TypeActivities>();
};
