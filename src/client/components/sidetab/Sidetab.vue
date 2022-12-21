<template>
	<div class="side-tab" :class="{left, right, open}">
		<div class="tab-body">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'Sidetab',
		props: {
			left: { type: Boolean, default: false },
			right: { type: Boolean, default: false },
			open: { type: Boolean, default: false }
		},
		setup(ctx, props) {

			return {

			}
		}
	})
</script>

<style lang="scss" scoped>
	.side-tab {
		position: absolute;
		top: 0;
		bottom: 0;

		width: 50%;
		min-width: 300px;
		overflow: hidden;

		pointer-events: none;

		.tab-body {
			background: var(--neutral-dark);
			overflow-y: auto;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;

			opacity: 0;

			transition: opacity .3s ease, transform .3s ease;

			pointer-events: all;
		}

		&.right {
			right: 0;
			transform: translateX(100%);

			.tab-body {
				transform: translateX(-100%);
				border-left: hsla(var(--secondary-hsl), .4) 1px solid;
			}
			&.open {
				.tab-body {
					transform: translateX(0);
				}
			}
		}

		&.left {
			left: 0;
			transform: translateX(-100%);

			.tab-body {
				transform: translateX(100%);
			}
			&.open {
				.tab-body {
					transform: translateX(0);
				}
			}
		}

		&.open {
			.tab-body {
				opacity: 1;
			}
		}
	}
</style>
