import { inject } from 'vue';
import { PLUGIN_CONTEXT_KEY } from './PluginContext';

export const usePlugins = () => inject(PLUGIN_CONTEXT_KEY);