<template>
	<router-link :to="{ name: 'post-view', params: { id: post.id }}">
		<div class="post-card">
			<div v-if="post.id">
				<h1>
					<ComposerView :content="post.title" />
				</h1>
				<small>
					by {{ post.user?.name }} on {{ post.created.format('d/m/Y') }}
					at {{ post.created.format('H:i') }}
				</small>
				<small v-if="post.edited">
					and edited
					<template v-if="post.created.format('d/m/Y') != post.edited.format('d/m/Y')">
						on {{ post.edited.format('d/m/Y') }}
					</template>
					at {{ post.edited.format('H:i') }}
				</small>
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import { Post } from '../../../shared/models/Post';
	import ComposerView from '../composer/ComposerView.vue';

	export default defineComponent({
		name: 'PostCard',
		components: { ComposerView },
		props: {
			post: Post
		},
		setup() {
		}
	})
</script>

<style lang="scss" scoped>
	a {
		text-decoration: none;
		display: block;
	}

	.post-card {
		padding: var(--spacer-3) var(--spacer-3);

		background: hsla(var(--neutral-darkest-hsl), .3);

		h1 {
			font-size: var(--font-size-lg);
		}

		small {
			font-size: var(--font-size-xs);
			color: var(--neutral-md);
		}
	}
</style>
