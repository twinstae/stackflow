<script lang="ts" setup>
import type { Activity } from "@stackflow/core";
import { provideActivity } from "./ActivityContext";

const props = defineProps<{
	value: Activity
}>()
provideActivity(props.value);
</script>

<template>
	<slot />
</template>