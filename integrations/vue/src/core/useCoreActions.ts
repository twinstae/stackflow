import { inject } from 'vue';
import { CORE_ACTIONS_KEY } from './CoreActionsContext';

export const useCoreActions = () => inject(CORE_ACTIONS_KEY);
