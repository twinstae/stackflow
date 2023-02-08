import { computed } from '@vue/reactivity';
import { defineComponent, h, watchEffect } from 'vue';

import type { ActivityComponentType } from "./activity";
import PluginRenderer from "./PluginRenderer";
import { useCoreState } from "./core";
import { usePlugins } from "./plugins";
import type { WithRequired } from "./utils";
export default defineComponent({
	props: ['activityComponentMap'],
	setup(props: {
		activityComponentMap: {
			[key: string]: ActivityComponentType;
		};
	}) {

		const coreState = useCoreState()!;
		const plugins = usePlugins() ?? [];

		const renderingPlugins = computed(() => {
			return plugins.filter(
				(plugin): plugin is WithRequired<typeof plugin, "render"> => 'render' in plugin,
			)
		});
		console.log('main Renderer render', { stack: coreState.value })
		watchEffect(() => {
			if (renderingPlugins.value.length === 0) {
				// eslint-disable-next-line no-console
				console.warn(
					`Stackflow -` +
					` There is no rendering plugin, so "<Stack />" doesn't render anything.` +
					` If you want to render some UI, use "@stackflow/plugin-renderer-basic"` +
					` or add another rendering plugin.`,
				);
			}
		});

		return () => {
			let output = h(
				'div',
				renderingPlugins.value.map((plugin) => (
					h(PluginRenderer, {
						key: plugin.key,
						activityComponentMap: props.activityComponentMap,
						plugin
					}, () => [])
				))
			);

			plugins.forEach((plugin) => {
				output =
					plugin.wrapStack?.({
						stack: {
							...coreState.value,
							render() {
								return output;
							},
						},
					}) ?? output;
			});
			console.log('render!', output);
			return output;
		}
	}
})