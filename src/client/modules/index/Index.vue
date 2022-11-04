<template>
	<MainContent>
		<main class="home py-4">
			<div class="text-center mb-3">
				<MainLogo style="width: 30%" />
			</div>

			<h1 class="text-center mb-4">Welcome to Agora!</h1>

			<p>
				Agora is a simple discussion forum with medium-esque composing features.
			</p>
			<p>
				We believe the internet has favored short bursts of communication for far too long, with algorithms
				designed to intensify said discussions, but mostly in detriment of the key fundamentals of communication
				such as <b>clarity</b>, <b>empathy</b> and <b>consensus</b>.
			</p>
			<p>
				As such, we propose we go back to a time where communication was crafted thoughtfully, without the
				overt hurry and brevity of our times, and Agora is our contribution in that direction.
			</p>

			<div style="max-width: 300px; margin: var(--spacer-4) auto 0; display: flex; justify-content: space-between; align-items: center;">
				<router-link to="login">
					<BaseButton
						type="submit" icon="key" class="primary large"
						:disabled="loading"
					>
						Login
					</BaseButton>
				</router-link>

				<div class="text-xs">or</div>

				<router-link to="register">
					<BaseButton
						type="submit" icon="pencil-alt" class="primary large"
						:disabled="loading"
					>
						Register
					</BaseButton>
				</router-link>
			</div>
		</main>
	</MainContent>
</template>

<script lang="ts">
	import { defineComponent, reactive, onMounted } from 'vue';
	import MainContent from '../../components/layout/MainContent.vue';
	import MainLogo from '../../components/MainLogo.vue';
	import BaseButton from 'udany-toolbox/vue/ui/Button/BaseButton.vue';

	export default defineComponent({
		components: { MainLogo, MainContent, BaseButton },
		Name: 'Home',
		setup() {

			return {}
		}
	})
</script>

<style lang="scss" scoped></style>
