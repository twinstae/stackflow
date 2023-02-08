import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/vue";
import { defineComponent, h } from 'vue';
import ActivityProvider from "./ActivityProvider.vue";
import { useActivity } from "./useActivity";
import { useActivityParams } from './useActivityParams';
const fakeActivity = {
	id: "test-activity-id",
	name: 'TestActivity',
	params: {
		id: 'params-1'
	},
	transitionState: 'enter-done', 
	zIndex: 99
} as any;

const ActivityTestingChild = defineComponent({
	setup() {
		const activity = useActivity();
		const params = useActivityParams();
		return { activity, params }
	},
	template: `<button id="provided-activity">{{ activity.id }}</button>`,
})

it("useActivity can get provided activity State", () => {
	render(ActivityProvider, {
		props: {
			value: fakeActivity,
		},
		slots: {
			default: h(ActivityTestingChild)
		}
	});

	expect(screen.getByRole("button")).toHaveTextContent("test-activity-id");
})