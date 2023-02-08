import { inject } from 'vue';
import { STACK_CONTEXT_KEY } from './StackContext';

/**
 * Get overall stack state
 */
export const useStack = () => inject(STACK_CONTEXT_KEY);
