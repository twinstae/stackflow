import type { ActivityStep } from "@stackflow/core";
import { useActivity } from 'activity';

/**
 * Get current step
 */
export function useStep(): ActivityStep | null {
  const { steps, id } = useActivity();

  return steps.filter((step) => step.id !== id).at(-1) ?? null;
}
