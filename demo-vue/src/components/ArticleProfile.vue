<script lang="ts" setup>
import ImageProfileRating from "../assets/ImageProfileRating.vue";
import * as css from "./ArticleProfile.css";

const imageUrl = `https://picsum.photos/120/120/`;
</script>

	<template>

	<div :class="css.container">
		<div :class="css.avatar">
			<img
				:src="imageUrl"
				style="width: 100%; height: 100%;"
			/>
		</div>
		<div :class="css.labels">
			<div :class="css.name">Emilia</div>
			<div :class="css.region">Woolston</div>
		</div>
		<div :class="css.rating">
			<div :class="css.ratingImg">
				<ImageProfileRating />
			</div>
			<div :class="css.ratingCaption">Rating</div>
		</div>
	</div>
	</template>
