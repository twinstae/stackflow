import type { Activity, Stack, StackflowPlugin } from "@stackflow/core";
import type { VNode } from "vue";
import { h } from "vue";

// TODO 구현해봐야 함
export type StackflowVuePlugin<T = never> = () => {
	/**
	 * Determine how to render by using the stack state
	 */
	render?: (args: {
		stack: Stack & {
			render: (overrideStack?: Partial<Stack>) => {
				activities: Array<
					Activity & {
						key: string;
						render: (overrideActivity?: Partial<Activity>) => VNode;
					}
				>;
			};
		};
	}) => VNode | null;

	/**
	 * Wrap `<Stack />` component with your `Provider` or custom elements
	 */
	wrapStack?: (args: {
		stack: Stack & {
			render: () => VNode;
		};
	}) => VNode | null;

	/**
	 * Wrap an activity with your `Provider` or custom elements
	 */
	wrapActivity?: (args: {
		activity: Activity & {
			render: () => VNode;
		};
	}) => VNode | null;
} & ReturnType<StackflowPlugin>;

export function basicRendererPlugin(): StackflowVuePlugin {
	return () => ({
		key: "plugin-renderer-basic",
		render({ stack }) {
			console.log('renderer render', stack);
			return h(
				"div",
				stack
					.render()
					.activities.filter(
						(activity) => activity.transitionState !== "exit-done",
					)
					.map((activity) => activity.render()),
			);
		},
	});
}
