<template>
	<div class="sample">
		<h1 :style="{ color: '#' + color.toHex() }">
			#{{ color.toHex() }}
		</h1>

		<br>

		<BaseButton v-for="o in options" :style="{ color: '#' + o.toHex() }" @click="open(o)">
			#{{ o.toHex() }}
		</BaseButton>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import { HslColor } from 'udany-toolbox/modules/base';
	import BaseButton from 'udany-toolbox/vue/ui/Button/BaseButton.vue';
	import { getActivityContext } from './activityService';

	const SampleActivity = defineComponent({
		name: 'SampleActivity',
		components: { BaseButton },
		props: {
			color: {
				type: HslColor,
				default: () => new HslColor().$fill([0.05, .95, .5])
			}
		},
		setup() {
			let options = [0, 0, 0].map(() => new HslColor().$fill([Math.random(), .95, .5]));
			let ctx = getActivityContext();

			return {
				options,
				open(o) {
					ctx.push({
						component: SampleActivity,
						props: {
							color: o
						}
					})
				}
			}
		}
	})

	export default SampleActivity;
</script>

<style lang="scss" scoped></style>
