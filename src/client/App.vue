<template>
	<component class="base-layout" :is="layout">
		<router-view v-slot="{ Component }">
			<transition name="route">
				<component :is="Component" />
			</transition>
		</router-view>
	</component>
</template>

<script>
	import DefaultLayout from './layouts/DefaultLayout.vue';
	import { computed } from 'vue';
	import { useRoute } from 'vue-router';

	export default {
		name: 'App',
		setup() {
			const route = useRoute();
			const layout = computed(() => route.meta.layout || DefaultLayout);

			return {
				layout
			}
		}
	}
</script>

<style lang="scss" scoped>
	.base-layout {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.route-enter-active,
	.route-leave-active {
		transition: opacity .2s ease, transform .4s ease;
	}

	.route-leave-active {
		position: absolute;
	}

	.route-leave-to {
	}
	.route-enter-from {
		transform: translateY(-20px);
	}

	.route-enter-from,
	.route-leave-to {
		opacity: 0;
	}
</style>
