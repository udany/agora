<template>
	<MainContent>
		<AutoResizer>
			<div :key="data.post.id">
				<h1>
					<TextComposer v-model="data.post.title" placeholder="Title" inline />
				</h1>

				<main class="home pt-4">
					<TextComposer v-model="data.post.body" focus placeholder="Every story starts with typing a single character..." />
				</main>
			</div>
		</AutoResizer>

		<div class="mt-4 text-end">
			<BaseButton
				type="submit" icon="pencil-alt" class="primary large"
				@click="save"
			>
				Publish
			</BaseButton>
		</div>
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
	import { ComposerRoutes } from './routes';

	export default defineComponent({
		components: { FormInput, TextComposer, MainLogo, MainContent, BaseButton, AutoResizer },
		Name: 'Home',
		setup() {
			const route = useRoute();
			const router = useRouter();

			let data = reactive({
				post: new Post()
			});

			onMounted(async () => {
				if (route.params.id) {
					data.post = await apiService.post.get(parseInt(route.params.id as string));
				}
			});

			async function save() {
				let response = await apiService.post.save(data.post);

				data.post.$fill(response);

				router.push({
					...ComposerRoutes.postView,
					params: {
						id: data.post.id
					}
				});
			}

			return {
				data,
				save
			}
		}
	})
</script>

<style lang="scss" scoped></style>
