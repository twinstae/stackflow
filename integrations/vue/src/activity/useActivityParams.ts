import { useActivity } from './useActivity';

/**
 * Get current activity parameters
 * 현재 액티비티의 파라미터를 가져옵니다
 */
export const useActivityParams = () => useActivity().params;