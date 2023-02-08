import { type InjectionKey, inject, provide } from 'vue';

export type AppScreenContext = {
	scroll: (args: { top: number }) => void;
};

const SCROLL_CONTEXT_KEY = Symbol('stackflow-scroll-context-key') as InjectionKey<AppScreenContext>
export const provideScrollContext = (value: AppScreenContext) => provide(SCROLL_CONTEXT_KEY, value)
export function useAppScreen() {
	return inject(SCROLL_CONTEXT_KEY);
}
