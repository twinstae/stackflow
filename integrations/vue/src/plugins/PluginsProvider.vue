<script lang="ts" setup>
import { PluginsContextValue, providePlugins } from './PluginContext';

const props = defineProps<{
  value: PluginsContextValue;
}>()

providePlugins(props.value);
</script>

<template>
	<slot />
</template>