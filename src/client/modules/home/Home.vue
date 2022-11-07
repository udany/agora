<template>
	<MainContent>
		<main class="home py-4">
			<div class="text-center mb-3">
				<MainLogo style="width: 30%; --logo-fill: hsla(var(--neutral-md-hsl), .2)" />
			</div>

			<AutoResizer>
				<div class="footer" v-if="!data.posts.length && !data.loading">
					<div class="text-xs">How about...</div>

					<router-link :to="postNewRoute">
						<BaseButton
							type="submit" icon="pencil-alt" class="primary large"
						>
							Writing your first post?
						</BaseButton>
					</router-link>
				</div>
				<div class="footer" v-else-if="!data.loading">
					<div class="text-xs">How about...</div>

					<router-link :to="postNewRoute">
						<BaseButton
							type="submit" icon="pencil-alt" class="primary large"
						>
							Writing a new post?
						</BaseButton>
					</router-link>
				</div>
			</AutoResizer>

			<AutoResizer>
				<div class="post-list" v-if="data.posts.length">
					<PostCard v-for="post in data.posts" :post="post" />
				</div>
			</AutoResizer>
		</main>
	</MainContent>
</template>

<script lang="ts">
	import { defineComponent, reactive, onMounted } from 'vue';
	import MainContent from '../../components/layout/MainContent.vue';
	import MainLogo from '../../components/MainLogo.vue';
	import BaseButton from 'udany-toolbox/vue/ui/Button/BaseButton.vue';
	import AutoResizer from 'udany-toolbox/vue/ui/AutoResizer/AutoResizer.vue';
	import { ComposerRoutes } from '../post/routes';
	import { apiService } from '../../services/api';
	import { sessionService } from '../../services/session';
	import { Post } from '../../../shared/models/Post';
	import PostCard from '../../components/cards/PostCard.vue';


	export default defineComponent({
		components: { PostCard, MainLogo, MainContent, BaseButton, AutoResizer },
		Name: 'Home',
		setup() {
			let data = reactive({
				posts: [] as Post[],
				loading: true
			});

			onMounted(async () => {
				let results = await apiService.post.getByUser(sessionService.session.user.id);
				data.posts.push(...results);
				data.loading = false;
			})

			return {
				data,
				postNewRoute: ComposerRoutes.postEdit
			}
		}
	})
</script>

<style lang="scss" scoped>
	.footer {
		max-width: 350px;
		margin: var(--spacer-4) auto 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.post-list {
		margin-top: var(--spacer-4);

		> * + * {
			margin-top: var(--spacer-3);
		}
	}
</style>
