<template>
	<div class="main-content">
		<div class="inner">
			<slot></slot>
		</div>
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
		background: var(--neutral-dark);
		margin: var(--spacer-3) auto;
	}

	.inner {
		padding: var(--spacer-2) var(--spacer-5);
	}
</style>
