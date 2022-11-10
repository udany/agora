<template>
	<div class="composer-view">
		<div class="contents" v-html="html"></div>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent, ref, watchEffect } from 'vue';
	import { contentToHtml } from './contentToHtml';

	export default defineComponent({
		name: 'ComposerView',
		props: {
			content: Object
		},
		setup(props) {
			let html = computed(() => props.content ? contentToHtml(props.content) : null);

			return {
				html
			}
		}
	})
</script>

<style lang="scss" scoped>
	.composer-view ::v-deep(.contents) {
		@import "./text-style";
	}
</style>
