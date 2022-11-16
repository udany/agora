<template>
	<div class="composer-view">
		<div class="contents" v-html="html"></div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, onMounted, ref, watch } from 'vue';
	import { contentToHtml } from './contentToHtml';

	export default defineComponent({
		name: 'ComposerView',
		props: {
			content: Object
		},
		async setup(props) {
			let html = ref('');

			async function updateHtml() {
				if (props.content) {
					html.value = await contentToHtml(props.content);
				} else {
					html.value = '';
				}
			}

			watch(() => props.content, async () => {
				await updateHtml();
			});

			await updateHtml();

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
