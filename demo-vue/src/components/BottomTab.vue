<script lang="ts" setup>
import IconChatting from "../assets/IconChatting.vue";
import IconHome from "../assets/IconHome.vue";
import IconMenu from "../assets/IconMenu.vue";
import IconProfile from "../assets/IconProfile.vue";
import IconSell from "../assets/IconSell.vue";
import * as css from "./BottomTab.css";

</script>

<template>
	<div :class="css.container">
		<button type="button" :class="css.button">
			<div :class="css.buttonIcon">
				<IconHome />
			</div>
			<div :class="css.buttonLabel">Home</div>
		</button>
		<button type="button" :class="css.button">
			<div :class="css.buttonIcon">
				<IconMenu />
			</div>
			<div :class="css.buttonLabel">Categories</div>
		</button>
		<button type="button" :class="css.button">
			<div :class="css.buttonIcon">
				<IconSell />
			</div>
			<div :class="css.buttonLabel">Sell</div>
		</button>
		<button type="button" :class="css.button">
			<div :class="css.buttonIcon">
				<IconChatting />
			</div>
			<div :class="css.buttonLabel">Chats</div>
		</button>
		<button type="button" :class="css.button">
			<div :class="css.buttonIcon">
				<IconProfile />
			</div>
			<div :class="css.buttonLabel">My</div>
		</button>
	</div>

</template>