import { stackflow, type ActivityComponentType } from "@stackflow/vue";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic-vue";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui-vue";

import ArticleActivity from "./activities/ArticleActivity.vue";
import MainActivity from "./activities/MainActivity.vue";

const activities = {
	ArticleActivity,
	MainActivity,
} as {
	ArticleActivity: ActivityComponentType<{ articleId: string, title: string }>,
	MainActivity: ActivityComponentType<{}>
};
export type TypeActivities = typeof activities;

export const { Stack } = stackflow({
	transitionDuration: 350,
	activities,
	initialActivity: () => 'MainActivity',
	plugins: [
		basicRendererPlugin(),
		basicUIPlugin({
			theme: "cupertino",
		}),
	],
});
