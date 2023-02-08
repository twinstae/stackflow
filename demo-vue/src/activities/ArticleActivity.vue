<script lang="ts" setup>
import { useFlow } from '@/useFlow';
import { AppScreen } from "@stackflow/plugin-basic-ui-vue";
import { useActivityParams } from "@stackflow/vue";

import ArticleCard from "@/components/ArticleCard.vue";
import ArticleProfile from "@/components/ArticleProfile.vue";
import * as css from "./Article.css";
const { pop } = useFlow();

function goBack(e: MouseEvent){
	e.preventDefault();
	pop({ animate: true })
}

const recommenderCard = [
	{
		articleId: "25140667",
		price: 41,
		title: "Ran",
	},
	{
		articleId: "60547101",
		price: 24,
		title: "Rest",
	},
	{
		articleId: "34751776",
		price: 42,
		title: "Those",
	},
	{
		articleId: "04114554",
		price: 12,
		title: "Beauty",
	},
	{
		articleId: "81339443",
		price: 3,
		title: "Mighty",
	},
	{
		articleId: "44738871",
		price: 1,
		title: "Afternoon",
	},
	{
		articleId: "57388513",
		price: 31,
		title: "Brown",
	},
	{
		articleId: "60883443",
		price: 49,
		title: "Musical",
	},
	{
		articleId: "00932094",
		price: 26,
		title: "Occasionally",
	},
	{
		articleId: "10749683",
		price: 35,
		title: "Having",
	},
];

const { articleId, title } = useActivityParams();

const imageUrl = `https://picsum.photos/800/800/?id=${articleId}`;
</script>

<template>
	<AppScreen backgroundColor="white" dimBackgroundColor="lightgray">
		<div :class="css.container">
			<a @click="goBack">뒤로가기</a>
			<div :class="css.image">
				<div :class="css.imageInner">
					<img :src="imageUrl" style="width: 100%; height: 100%;" />
				</div>
			</div>
			<ArticleProfile />
			<div :class="css.content">
				<div :class="css.title">{{ title }}</div>
				<div :class="css.subtitle">Baby & Kids ∙ 3 days ago</div>
				<div :class="css.body">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
					elementum sit sem ullamcorper urna, lacinia eu tortor, mattis.
					Venenatis ut cursus amet in.
				</div>
				<div :class="css.subtitle">1 chats ∙ 2 favorites ∙ 212 views</div>
			</div>
			<div :class="css.section">
				<div :class="css.sectionTitle">Other Items by Emila </div>
				<div :class="css.recommenderGrid">
					<ArticleCard v-for="card in recommenderCard" :key="card.articleId" v-bind="card" />
				</div>
			</div>
		</div>
	</AppScreen>
</template>
