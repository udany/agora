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
	import { onBeforeRouteLeave, useRouter } from 'vue-router';
	import { onBeforeUnmount, ref } from 'vue';

	export default {
		name: 'MainContent',
		setup() {
			const router = useRouter();
			let leaving = ref(false);

			const removeAfterEachGuard = router.afterEach(() => {
				leaving.value = false;
			});

			onBeforeRouteLeave((to, from) => {
				if (to.path !== from.path) {
					leaving.value = true;
				}
			});

			onBeforeUnmount(() => {
				removeAfterEachGuard();
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
