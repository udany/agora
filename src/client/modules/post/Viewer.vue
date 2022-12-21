<template>
	<MainContent>
		<Sidetab :open="data.side" right>
			<ActivityFrame
				:base="{ component: SampleActivity }"
			/>
		</Sidetab>
		<AutoResizer v-if="data.post.id">
			<div class="post" :class="[data.theme.cssClass]">
				<h1 :style="data.headingStyle.getStyle()">
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

				<div class="mt-4 text-end" v-if="data.post?.id && data.post?.user?.id === session.user?.id">
					<router-link :to="{name: 'post-edit', params: {id: data.post.id}}">
						<BaseButton
							type="submit" icon="pencil-alt" class="primary large"
						>
							Edit
						</BaseButton>
					</router-link>
				</div>
			</div>
		</AutoResizer>
	</MainContent>
</template>

<script lang="ts">
	import {
		computed,
		defineComponent, nextTick,
		onBeforeUnmount,
		onMounted,
		onServerPrefetch,
		onUpdated,
		reactive,
		watch
	} from 'vue';
	import BaseButton from 'udany-toolbox/vue/ui/Button/BaseButton.vue';
	import AutoResizer from 'udany-toolbox/vue/ui/AutoResizer/AutoResizer.vue';
	import MainContent from '../../components/layout/MainContent.vue';
	import MainLogo from '../../components/MainLogo.vue';
	import TextComposer from '../../components/composer/TextComposer.vue';
	import FormInput from '../../components/form/FormInput.vue';
	import { useRoute, RouteLocation } from 'vue-router';
	import { Post } from '../../../shared/models/Post';
	import { apiService } from '../../services/api';
	import ComposerView from '../../components/composer/ComposerView.vue';
	import { sessionService } from '../../services/session';
	import { DocumentTheme, Selector, ThemeStyle, useDynamicStyle } from '../../../shared/models/DocumentTheme';
	import Sidetab from '../../components/sidetab/Sidetab.vue';
	import ActivityFrame from '../../components/activity/ActivityFrame.vue';
	import SampleActivity from '../../components/activity/SampleActivity.vue';

	async function loadPost(route: RouteLocation) {
		if (route.params.id) {
			return await apiService.post.get(parseInt(route.params.id as string));
		}
		return null;
	}

	let textStyle = new ThemeStyle().$fill({id: `7hhgfhgcbf7d27-b910-4b53-8a4c-3af72bd79025`});
	textStyle.name = 'Text';
	textStyle.font = 'Time News Roman';
	textStyle.size = 16;
	textStyle.selectors = [Selector.any];

	let headingStyle = new ThemeStyle().$fill({ parentId: textStyle.id, color: [0, 1, .5, 1] });
	headingStyle.name = 'Heading';
	headingStyle.size = 32;
	headingStyle.selectors = [Selector.heading];

	let theme = new DocumentTheme().$fill({
		styles: [textStyle, headingStyle]
	});

	export default defineComponent({
		components: { SampleActivity, ActivityFrame, Sidetab, ComposerView, FormInput, TextComposer, MainLogo, MainContent, BaseButton, AutoResizer },
		Name: 'Home',
		async beforeRouteEnter(to, from, next) {
			const post = await loadPost(to);

			next(vm => vm.data.post = post);
		},
		setup() {
			const route = useRoute();

			let data = reactive({
				post: new Post(),
				loading: null as Promise<void>,
				headingStyle,
				textStyle,
				theme,
				side: true
			});

			const load = async () => {
				if (data.loading) return data.loading;

				data.loading = loadPost(route).then((post) => {
					data.post = post;
					data.loading = null;
				})
			};
			const routeIdMatches = () => parseInt(route.params.id as string) === data.post?.id;

			onServerPrefetch(async () => {
				await load();
			});

			let dynamicStyle = useDynamicStyle(computed(() => data.theme.css));

			onMounted(async () => {
				dynamicStyle.mount();

				await nextTick();
				if (!routeIdMatches()) {
					await load();
				}
			});

			onBeforeUnmount(() => {
				dynamicStyle.destroy();
			})

			watch(() => route.params.id, async () => {
				if (!routeIdMatches()) {
					await load();
				}
			});

			return {
				session: sessionService.session,
				data,
				SampleActivity
			}
		}
	})
</script>

<style lang="scss" scoped>
	small {
		color: var(--neutral-md);
	}
</style>
