<template>
	<div class="composer-view">
		<div class="contents" ref="root"></div>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent, ref, watchEffect } from 'vue';
	import { DOMSerializer, Node } from 'prosemirror-model';
	import { schema } from './prosemirror';

	export default defineComponent({
		name: 'ComposerView',
		props: {
			content: Object
		},
		setup(props) {
			const root = ref();
			let serializer = DOMSerializer.fromSchema(schema);
			let html = computed(() => props.content ? serializer.serializeFragment(Node.fromJSON(schema, props.content).content) : null);

			watchEffect(() => {
				if (html.value && root.value) {
					root.value.innerHTML = '';
					root.value.appendChild(html.value);
				}
			})

			return {
				root
			}
		}
	})
</script>

<style lang="scss" scoped>
	.composer-view ::v-deep(.contents) {
		@import "./text-style";
	}
</style>
