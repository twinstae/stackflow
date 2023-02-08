<script lang="ts" setup>
import { useActions } from '@stackflow/vue';
import * as css from "./ArticleCard.css";

const props = defineProps<{
	articleId: string;
	title: string;
	price: number;
}>();

const { push } = useActions();

const imageUrl = `https://picsum.photos/800/800/?id=${props.articleId}`;

const onClick = () => {
	push("ArticleActivity", {
		articleId: String(props.articleId),
		title: props.title,
	});
};
</script>

<template>
	<button type="button" :class="css.container" @click="onClick">
		<div :class="css.thumbnail">
			<div :class="css.innerImage">
				<img :src="imageUrl" style="width: 100%; height: 100%;" />
			</div>
		</div>
		<div :class="css.title">{{ title }}</div>
		<div :class="css.price">£{{ price }}.00</div>
	</button>
</template>