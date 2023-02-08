import {
	getCurrentScope,
	onScopeDispose,
	ref,
} from 'vue'

export function useExternalStore<T>(store: {
	subscribe: (callback: (value: T) => void) => () => void;
}) {
	let state = ref()

	let unsubscribe = store.subscribe(value => {
		console.log('update store ref');
		state.value = value
	})

	getCurrentScope() && onScopeDispose(unsubscribe)
	return state
}