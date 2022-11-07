<template>
	<MainContent>
		<main class="home py-4">
			<div class="text-center mb-3">
				<MainLogo style="width: 30%; --logo-fill: hsla(var(--neutral-md-hsl), .2)" />
			</div>

			<div style="max-width: 350px; margin: var(--spacer-4) auto 0; display: flex; justify-content: space-between; align-items: center;">
				<div class="text-xs">How about...</div>

				<router-link :to="postNewRoute">
					<BaseButton
						type="submit" icon="pencil-alt" class="primary large"
						:disabled="loading"
					>
						Writing your first post?
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
	import { ComposerRoutes } from '../post/routes';


	export default defineComponent({
		components: { MainLogo, MainContent, BaseButton },
		Name: 'Home',
		setup() {
			return {
				postNewRoute: ComposerRoutes.postEdit
			}
		}
	})
</script>

<style lang="scss" scoped></style>
