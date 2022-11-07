<template>
	<input
		class="form-input"
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
	/>
</template>

<script lang="ts" setup>
	defineProps(['modelValue'])
	defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
	.form-input {
		background: hsla(var(--neutral-darkest-hsl), .4);
		color: var(--neutral-lightest);
		font-size: inherit;

		padding: var(--spacer-1) var(--spacer-2);

		border: none;
		outline: none !important;
		border-bottom: 1px solid var(--neutral-lightest);

		transition: border-bottom-color .6s;

		&:focus {
			border-bottom: 1px solid var(--primary);
		}
	}
</style>
