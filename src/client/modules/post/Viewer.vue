<template>
	<MainContent>
		<AutoResizer>
			<div v-if="data.post.id">
				<h1>
					<ComposerView :content="data.post.title" />
				</h1>
				<small>
					by {{ data.post.user.name }} on {{ data.post.created.format('d/m/Y') }}
					at {{ data.post.created.format('H:i') }}
				</small>
				<small v-if="data.post.edited">
					and edited
					<template v-if="data.post.created.format('d/m/Y') != data.post.edited.format('d/m/Y')">
						on {{ data.post.edited.format('d/m/Y') }}
					</template>
					at {{ data.post.edited.format('H:i') }}
				</small>

				<main class="home pt-4">
					<ComposerView :content="data.post.body" />
				</main>
			</div>

			<div class="mt-4 text-end" v-if="data.post?.user?.id === session.user?.id">
				<router-link :to="{name: 'post-edit', params: {id: data.post.id}}">
					<BaseButton
						type="submit" icon="pencil-alt" class="primary large"
					>
						Edit
					</BaseButton>
				</router-link>
			</div>
		</AutoResizer>
	</MainContent>
</template>

<script lang="ts">
	import { defineComponent, onMounted, reactive, watch } from 'vue';
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

			async function loadPost() {
				if (route.params.id) {
					data.post = await apiService.post.get(parseInt(route.params.id as string));
				}
			}

			onMounted(() => {
				loadPost();
			});

			watch(() => route.params.id, () => {
				loadPost();
			});

			return {
				session: sessionService.session,
				data
			}
		}
	})
</script>

<style lang="scss" scoped>
	small {
		color: var(--neutral-md);
	}
</style>
