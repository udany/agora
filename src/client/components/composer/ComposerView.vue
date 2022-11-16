<template>
	<div class="composer-view">
		<div class="contents" v-html="html"></div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, inject, ref, watch } from 'vue';
	import { contentToHtml } from './contentToHtml';

	export default defineComponent({
		name: 'ComposerView',
		props: {
			content: Object
		},
		setup(props) {
			let html = ref('');

			function updateHtml() {
				if (props.content) {
					html.value = contentToHtml(props.content, inject('document'));
				} else {
					html.value = '';
				}
			}

			watch(() => props.content, async () => {
				updateHtml();
			});

			updateHtml();

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
