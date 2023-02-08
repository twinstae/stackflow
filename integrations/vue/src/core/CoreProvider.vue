<script lang="ts" setup>
import type { CoreStore } from "@stackflow/core";
import { useExternalStore } from "../shims";
import { provideCoreActions } from './CoreActionsContext';
import { provideCoreState } from './CoreStateContext';

const props = defineProps<{ coreStore: CoreStore }>()
const coreStore = props.coreStore;

const stack = useExternalStore({
	subscribe(callback) {
		callback(coreStore.actions.getStack());
		return coreStore.subscribe(() => {
			console.log('update!', coreStore.actions.getStack())
			callback(coreStore.actions.getStack());
		});
	}
});
provideCoreState(stack);
provideCoreActions(coreStore.actions);
</script>

<template>
	<slot />
</template>
