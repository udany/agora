<template>
	<div class="main-content">
		<slot></slot>
	</div>
</template>

<script lang="ts">
	export default {
		name: 'MainContent',
		setup() {
		}
	}
</script>

<style lang="scss" scoped>
	.main-content {
		max-width: 768px;
		background: $neutral-dark;

		padding: var(--spacer-2) var(--spacer-3);
		margin: var(--spacer-3) auto;
	}
</style>
