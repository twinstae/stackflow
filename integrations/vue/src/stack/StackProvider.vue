<script lang="ts" setup>import { Stack } from '@stackflow/core';
import { provideStack } from './StackContext';

const props = defineProps<{
  value: Stack;
}>()

provideStack(props.value);
</script>

<template>
	<slot />
</template>