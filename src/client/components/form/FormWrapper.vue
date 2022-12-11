<template>
	<div class="form-wrapper" @keydown.enter="onEnter" @keydown.esc="onEscape">
		<slot />
	</div>
</template>

<script lang="ts">
	import { defineComponent, emit } from 'vue';

	export default defineComponent({
		name: 'FormWrapper',
		emits: ['submit', 'cancel'],
		setup(props, { emit }) {
			return {
				onEnter(e: KeyboardEvent) {
					emit('submit')
				},
				onEscape(e: KeyboardEvent) {
					emit('cancel')
				},
			}
		}
	})
</script>

<style lang="scss" scoped></style>
