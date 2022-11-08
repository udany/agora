<template>
	<div class="outer">
		<div class="main-content" :class="{ leaving }">
			<div class="inner">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { onBeforeRouteLeave } from 'vue-router';
	import { ref } from 'vue';

	export default {
		name: 'MainContent',
		setup() {
			let leaving = ref(false);
			onBeforeRouteLeave(() => {
				leaving.value = true;
			});

			return {
				leaving
			}
		}
	}
</script>

<style lang="scss" scoped>
	.outer {
		width: 100%;
	}

	.main-content {
		max-width: 768px;
		background: var(--neutral-dark);
		margin: var(--spacer-3) auto;


		transition: opacity .3s, filter .3s;
		&.leaving {
			opacity: .5;
			filter: blur(2px) grayscale(1);
			pointer-events: none;
		}
	}

	.inner {
		padding: var(--spacer-4) var(--spacer-5);
	}
</style>
