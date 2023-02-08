<script lang="ts" setup>
import { useFlow } from '@/useFlow';
import * as css from "./FeedCard.css";

const props = defineProps<{
	articleId: string;
	title: string;
	region: string;
	price: number;
	daysAgo: number;
}>();

const { push } = useFlow();

const imageUrl = `https://picsum.photos/800/800/?id=${props.articleId}`;

const onClick = () => {
	push("ArticleActivity", {
		articleId: String(props.articleId),
		title: props.title,
	});
};
</script>

<template>

	<div :class="css.container">
		<button type="button" :class="css.button" @click="onClick">
			<div :class="css.thumbnail">
				<img :src="imageUrl" width="108" height="108" />
			</div>
			<div :class="css.right">
				<div :class="css.title">{{ title }}</div>
				<div :class="css.subtitle">
					{{ region }} · {{ daysAgo }} day ago
				</div>
				<div :class="css.price">£{{ price }}.00</div>
			</div>
		</button>
	</div>

</template>