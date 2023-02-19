<template>
	<div class="activity-frame">
		<transition-group name="tab" appear>
		<template
			v-for="activity in ctx.activityStack"
			:key="activity.id"
		>
				<div class="activity-wrapper" v-show="activity === ctx.activityStack.last()">
					<button class="back-button" :class="{ hide: activity === ctx.activityStack[0] }" @click="ctx.pop()">
						<FaIcon>arrow-left</FaIcon>
					</button>

					<component
						:is="activity.component"

						v-bind="activity.props"
						v-on="activity.listeners"

						@close="ctx.activityStack.remove(activity)"
					/>
				</div>
		</template>
		</transition-group>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue';
	import { ActivityDescriptor, createActivityContext } from './activityService';

	export default defineComponent({
		name: 'ActivityFrame',
		props: {
			base: {
				type: Object as PropType<ActivityDescriptor<any>>
			}
		},
		setup(props) {
			const ctx = createActivityContext();
			ctx.push(props.base as any);

			return {
				ctx
			}
		}
	})
</script>

<style lang="scss" scoped>
	.activity-frame {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
	}

	.back-button {
		position: absolute;

		left: 10px;
		top: 10px;

		font-size: var(--font-size-md);
		color: var(--neutral-lightest);

		padding: .5em;

		cursor: pointer;

		border: none;
		border-radius: 50%;
		background: hsla(var(--neutral-md-hsl), 0);
		opacity: .5;

		transition: background-color .4s ease, opacity .2s ease;

		&:hover {
			opacity: .9;
			background: hsla(var(--neutral-md-hsl), 0.3);
		}

		&.hide {
			opacity: 0;
			pointer-events: none;
		}
	}

	.activity-wrapper {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		background: var(--neutral-dark);

		padding: var(--spacer-5) var(--spacer-4) var(--spacer-3);
	}


	.tab-enter-active,
	.tab-leave-active {
		transition: opacity .2s ease, transform .4s ease;
	}

	.tab-leave-to:last-child {
		opacity: 0;
		transform: translateX(100px);
	}
	.tab-enter-from:last-child {
		opacity: 0;
		transform: translateX(100px);
	}

	.tab-enter-to {
		opacity: 1;
		transform: translateX(0px);
	}
</style>
