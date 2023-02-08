<script lang="ts" setup>
import { useActions } from "@stackflow/vue";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { ref } from 'vue';

import { useGlobalOptions } from "../basicUIPlugin";
import {
	useLazy,
	useNullableActivity,
	useStyleEffectHide,
	useStyleEffectOffset,
	useStyleEffectSwipeBack,
} from "../hooks";
import { provideScrollContext } from './AppScreenContext';
import type { GlobalVars } from "../theme.css";
import { globalVars } from "../theme.css";
import { compactMap } from "../utils";
// import AppBar from "./AppBar.vue";
import * as css from "./AppScreen.css";
import { computed } from '@vue/reactivity';
import IconBack from '../assets/IconBack.vue';

const props = defineProps<{
	backgroundColor: string;
	dimBackgroundColor: string;
	// appBar?: Omit<PropOf<typeof AppBar>, "theme" | "ref" | "key">;
	preventSwipeBack?: boolean;
	modalPresentationStyle?: "fullScreen";
}>()

const globalOptions = useGlobalOptions()!;
const activity = useNullableActivity();

const { pop } = useActions();

const appScreenRef = ref<HTMLDivElement>();
const dimRef = ref<HTMLDivElement | null>(null);
const paperRef = ref<HTMLDivElement | null>(null);
const edgeRef = ref<HTMLDivElement | null>(null);
const appBarRef = ref<HTMLDivElement>();

const presentModalFullScreen = props.modalPresentationStyle === "fullScreen";
const swipeBackPrevented = props.preventSwipeBack || presentModalFullScreen;

useStyleEffectHide({
	refs: [appScreenRef],
	hasEffect: true,
});
useStyleEffectOffset({
	theme: globalOptions.theme,
	refs:
		globalOptions.theme === "cupertino" ? [			paperRef] : [
			paperRef,
			appBarRef],
	hasEffect: !presentModalFullScreen,
});
useStyleEffectSwipeBack({
	theme: globalOptions.theme,
	dimRef,
	edgeRef,
	paperRef,
	hasEffect: true,
	prevented: swipeBackPrevented,
	onSwiped() {
		pop();
	},
});

const hasAppBar = false; // !!props.appBar;

const zIndexBase = (activity?.zIndex ?? 0) * 5;
const zIndexDim = zIndexBase;
const zIndexPaper =
	zIndexBase + (globalOptions.theme === "cupertino" && hasAppBar ? 1 : 3);
const zIndexEdge = zIndexBase + 4;
const zIndexAppBar =
	globalOptions.theme === "cupertino" ? zIndexBase + 7 : zIndexBase + 4;

const transitionState = activity?.transitionState ?? "enter-done";
const lazyTransitionState = useLazy(transitionState);

const onAppBarTopClick = (e: MouseEvent) => {
	// props.appBar?.onTopClick?.(e);

	if (!e.defaultPrevented) {
		paperRef.value?.scroll({
			top: 0,
			behavior: "smooth",
		});
	}
};

provideScrollContext({
	scroll({ top }: { top: number }) {
		paperRef?.value?.scroll({
			top,
			behavior: "smooth",
		});
	},
})

const screenClass = computed(() => css.appScreen({
	transitionState: transitionState === "enter-done" ||
		transitionState === "exit-done" ? transitionState : lazyTransitionState.value,
}));
const screenStyle = computed(() => assignInlineVars(compactMap({
	[globalVars.backgroundColor]: props.backgroundColor,
	[globalVars.dimBackgroundColor]: props.dimBackgroundColor,
	// [globalVars.appBar.height]: props.appBar?.height,
	// [globalVars.appBar.heightTransitionDuration]:
	// 	props.appBar?.heightTransitionDuration, [css.vars.zIndexes.dim]:
	// 	`${zIndexDim}`, [css.vars.zIndexes.paper]: `${zIndexPaper}`, [css.vars.zIndexes.edge]: `${zIndexEdge}`,
	[css.vars.zIndexes.appBar]: `${zIndexAppBar}`, [css.vars.transitionDuration]: transitionState === "enter-active" ||
		transitionState === "exit-active" ? globalVars.transitionDuration : "0ms",
}),))
</script>

<template>
	<div ref="appScreenRef" :class="screenClass" :style="screenStyle">
		<div :class="css.dim" ref="dimRef"></div>
		<!-- <AppBar v-if="appBar" v-bind="appBar" ref="appBarRef" :modalPresentationStyle="modalPresentationStyle" :onTopClick="onAppBarTopClick" /> -->
		<div :key="activity?.id" :class="css.paper({ hasAppBar, presentModalFullScreen, })" ref="paperRef">
			<slot />
		</div>
		<div v-if="!activity?.isRoot && globalOptions.theme === 'cupertino' && !swipeBackPrevented"
			:class="css.edge({ hasAppBar })" ref="edgeRef" />
	</div>

</template>