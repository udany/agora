<template>
	<MainContent>
		<AutoResizer>
			<div :key="data.post.id">
				<h1>
					<ComposerView :content="data.post.title" />
				</h1>

				<main class="home pt-4">
					<ComposerView :content="data.post.body" />
				</main>
			</div>
		</AutoResizer>
	</MainContent>
</template>

<script lang="ts">
	import { defineComponent, onMounted, reactive } from 'vue';
	import BaseButton from 'udany-toolbox/vue/ui/Button/BaseButton.vue';
	import AutoResizer from 'udany-toolbox/vue/ui/AutoResizer/AutoResizer.vue';
	import MainContent from '../../components/layout/MainContent.vue';
	import MainLogo from '../../components/MainLogo.vue';
	import TextComposer from '../../components/composer/TextComposer.vue';
	import FormInput from '../../components/form/FormInput.vue';
	import { useRoute, useRouter } from 'vue-router';
	import { Post } from '../../../shared/models/Post';
	import { apiService } from '../../services/api';
	import ComposerView from '../../components/composer/ComposerView.vue';
	import { sessionService } from '../../services/session';

	export default defineComponent({
		components: { ComposerView, FormInput, TextComposer, MainLogo, MainContent, BaseButton, AutoResizer },
		Name: 'Home',
		setup() {
			const route = useRoute();

			let data = reactive({
				post: new Post()
			});

			onMounted(async () => {
				if (route.params.id) {
					data.post = await apiService.post.get(parseInt(route.params.id as string));
				}
			});

			return {
				session: sessionService.session,
				data
			}
		}
	})
</script>

<style lang="scss" scoped></style>
