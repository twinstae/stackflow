import { type Ref, shallowRef, watchEffect } from 'vue';

import { listenResize, noop } from "../utils";

export function useMaxWidth({
	outerRef,
	innerRef,
	enable,
}: {
	outerRef: Ref<any>;
	innerRef: Ref<any>;
	enable: boolean;
}) {
	const maxWidth = shallowRef<number | undefined>(undefined);

	watchEffect(() => {
		const $outer = outerRef && "current" in outerRef && outerRef.value;
		const $inner = innerRef.value;

		if (!enable || !$outer || !$inner) {
			return noop;
		}

		const dispose = listenResize(() => {
			const screenWidth = $outer.clientWidth;

			const leftWidth = $inner.offsetLeft;
			const centerWidth = $inner.clientWidth;
			const rightWidth = screenWidth - leftWidth - centerWidth;

			const sideMargin = Math.max(leftWidth, rightWidth);

			maxWidth.value = (screenWidth - 2 * sideMargin);
		});

		return dispose;
	});

	return {
		maxWidth,
	};
}
