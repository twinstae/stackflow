import { inject } from 'vue';
import { CORE_STATE_KEY } from './CoreStateContext';

export const useCoreState = () => inject(CORE_STATE_KEY)
