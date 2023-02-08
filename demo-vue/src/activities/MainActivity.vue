<script lang="ts" setup>

import { AppScreen } from "@stackflow/plugin-basic-ui-vue";

import IconBell from "../assets/IconBell.vue";
import IconExpandMore from "../assets/IconExpandMore.vue";
import IconSearch from "../assets/IconSearch.vue";
import IconSettings from "../assets/IconSettings.vue";
import BottomTab from "../components/BottomTab.vue";
import FeedCard from "../components/FeedCard.vue";
import * as css from "./Main.css";

const cards = [
	{
		articleId: "02542470",
		price: 41,
		title: "Master",
		region: "Nagevan",
		daysAgo: 4,
	},
	{
		articleId: "11257089",
		price: 24,
		title: "Wild",
		region: "Inguima",
		daysAgo: 4,
	},
	{
		articleId: "08407137",
		price: 42,
		title: "Universe",
		region: "Litenego",
		daysAgo: 4,
	},
	{
		articleId: "32979422",
		price: 12,
		title: "Private",
		region: "Umumtaw",
		daysAgo: 6,
	},
	{
		articleId: "37998208",
		price: 3,
		title: "Harbor",
		region: "Gubdidgi",
		daysAgo: 3,
	},
	{
		articleId: "01695878",
		price: 1,
		title: "Valuable",
		region: "Jumjelewu",
		daysAgo: 1,
	},
	{
		articleId: "09792471",
		price: 31,
		title: "Also",
		region: "Salhega",
		daysAgo: 1,
	},
	{
		articleId: "23939055",
		price: 49,
		title: "Ever",
		region: "Jaifuup",
		daysAgo: 9,
	},
	{
		articleId: "94689745",
		price: 26,
		title: "Production",
		region: "Idcipwel",
		daysAgo: 3,
	},
	{
		articleId: "49322156",
		price: 35,
		title: "Chest",
		region: "Ajapaktar",
		daysAgo: 7,
	},
];

// <!-- const Main: ActivityComponentType = () => {
//   const appBarLeft = () => (
//     <div className={css.appBarLeft}>
//       Woolston
//       <div className={css.appBarLeftIcon}>
//         <IconExpandMore />
//       </div>
//     </div>
//   );

//   const appBarRight = () => (
//     <div className={css.appBarRight}>
//       <IconSearch />
//       <IconSettings />
//       <IconBell />
//     </div>
//   ); -->
</script>

<template>
	<AppScreen backgroundColor="white" dimBackgroundColor="lightgray">
		<div :class="css.wrapper">
			<div :class="css.scrollable">
				<FeedCard v-for="card in cards" :key="card.articleId" v-bind="card" />
			</div>
			<div :class="css.bottom">
				<BottomTab />
			</div>
		</div>
	</AppScreen>

</template>