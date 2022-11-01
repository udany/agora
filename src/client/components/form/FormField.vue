<template>
	<div class="field">
		<label v-if="label" :for="$props.for">{{ label }}</label>
		<slot></slot>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'FormField',
		props: {
			for: {
				type: String,
				default: ''
			},
			label: {
				type: String,
				default: ''
			},
		},
		setup() {
		}
	})
</script>

<style lang="scss" scoped>
	.field {
		display: flex;
		flex-direction: column;

		label {
			margin-bottom: var(--spacer-2);
		}
	}
</style>
