<template>
	<MainContent>
		<main class="home py-4">
			<AutoResizer>
				<div class="text-center mb-3" v-if="data.user">
					<UserAvatar :user="data.user" class="avatar" />
					<h1 class="mt-3">{{ data.user.name }}</h1>
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
	import { useRoute } from 'vue-router';

	import { Post } from '../../../shared/models/Post';
	import { User } from '../../../shared/models/User';

	import { ComposerRoutes } from '../post/routes';
	import { apiService } from '../../services/api';

	import MainContent from '../../components/layout/MainContent.vue';
	import MainLogo from '../../components/MainLogo.vue';
	import BaseButton from 'udany-toolbox/vue/ui/Button/BaseButton.vue';
	import AutoResizer from 'udany-toolbox/vue/ui/AutoResizer/AutoResizer.vue';
	import PostCard from '../../components/cards/PostCard.vue';
	import UserAvatar from '../../components/UserAvatar.vue';

	export default defineComponent({
		components: { UserAvatar, PostCard, MainLogo, MainContent, BaseButton, AutoResizer },
		Name: 'Home',
		setup() {
			const route = useRoute();

			let data = reactive({
				user: null as User,
				posts: [] as Post[],
				loading: true
			});

			async function loadUser() {
				if (route.params.id) {
					data.user = await apiService.user.get(parseInt(route.params.id as string));
				}
			}

			async function loadPosts() {
				if (route.params.id) {
					let results = await apiService.post.getByUser(parseInt(route.params.id as string));
					data.posts.push(...results);
					data.loading = false;
				}
			}

			onMounted(() => {
				loadUser();
				loadPosts();
			})

			return {
				data,
				postNewRoute: ComposerRoutes.postEdit
			}
		}
	})
</script>

<style lang="scss" scoped>
	.avatar {
		--avatar-size: 120px;
		display: inline-block;
	}

	.post-list {
		margin-top: var(--spacer-4);

		> * + * {
			margin-top: var(--spacer-3);
		}
	}
</style>
