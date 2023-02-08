import { defineComponent, h } from 'vue';
import type { ActivityComponentType } from "./activity";
import { ActivityProvider } from "./activity";
import { useCoreState } from "./core";
import { usePlugins } from "./plugins";
import { StackProvider } from "./stack";
import type { StackflowVuePlugin } from "./StackflowVuePlugin";
import type { WithRequired } from "./utils";

export default defineComponent({
	props: ['activityComponentMap', 'plugin'],
	setup(props: {
		activityComponentMap: {
			[key: string]: ActivityComponentType;
		};
		plugin: WithRequired<ReturnType<StackflowVuePlugin>, "render">;
	}) {

		const coreState = useCoreState()!;
		const plugins = usePlugins()!;
		const plugin = props.plugin;
		const activityComponentMap = props.activityComponentMap;

		console.log('plugin renderer render', coreState.value)
		const output = plugin.render({
			stack: {
				...coreState.value,
				render(overrideStack) {
					const stack = {
						...coreState.value,
						...overrideStack,
					};
					return {
						activities: stack.activities ? stack.activities.map((activity) => ({
							...activity,
							key: activity.id,
							render(overrideActivity) {
								const Activity = activityComponentMap[activity.name];

								let output = h(Activity, { params: activity.params });

								plugins.forEach((p) => {
									output =
										p.wrapActivity?.({
											activity: {
												...activity,
												render: () => output,
											},
										}) ?? output;
								});

								return h(
									StackProvider,
									{ value: stack },
									() => h(
										ActivityProvider,
										{
											key: activity.id,
											value: {
												...activity,
												...overrideActivity,
											},
										},
										() => output
									)
								);
							},
						})) : []
					};
				}
			}
		})

		return () => output
	}
})