<template>
	<div class="user-avatar" :class="{ interactive }" :style="{ '--avatar-hue': hue+'deg' }">
		<div class="inner">
			<div class="initials">
				{{ initials }}
			</div>
		</div>

		<svg xmlns:xlink="http://www.w3.org/1999/xlink" width="800" xmlns="http://www.w3.org/2000/svg" height="800"
			 id="screenshot-d2f5acbb-adcc-808f-8001-8c58f93a0976" viewBox="0 0 800 800"
			 style="-webkit-print-color-adjust: exact;" fill="none" version="1.1">
			<g clip-path="url(#frame-clip-d2f5acbb-adcc-808f-8001-8c58f93a0976-93dad3d0-813c-80ab-8001-8c59c44ab0e8)">
				<g class="frame-children">
					<g class="outer-circle" rx="0" ry="0">
						<path rx="0" ry="0"
							  d="M526.108,734.957C536.539,730.674,548.372,736.376,552.176,746.798C556.433,757.227,550.757,769.108,540.327,772.89C518.062,781.4,495.321,787.594,472.09,791.853C448.407,796.104,424.699,798,401.491,798C291.562,798,192.038,753.444,120.032,681.388C47.539,609.302,3,509.753,3,399.279C3,289.291,47.537,189.72,120.032,117.65C192.05,45.58,291.564,1,401.491,1C511.418,1,610.924,45.58,683.429,117.65C755.455,189.72,800,289.285,800,399.279C800,410.653,790.512,420.145,779.622,420.145C768.247,420.145,758.76,410.652,758.76,399.279C758.76,300.648,718.963,211.52,654.054,146.566C589.605,82.102,500.055,41.804,401.493,41.804C302.945,41.804,213.371,82.094,148.932,146.566C84.017,211.528,44.218,300.658,44.218,399.279C44.218,498.362,84.015,587.5,148.932,652.472C213.365,716.952,302.931,757.25,401.493,757.25C423.298,757.25,444.144,755.347,464.989,751.579C485.843,747.749,506.213,742.078,526.108,734.957ZZ" />
						<path rx="0" ry="0"
							  d="M721.918,558.244C727.14,548.291,739.497,544.024,749.477,549.235C759.927,554.445,763.726,566.778,758.981,576.732C742.81,608.51,723.333,637.894,699.586,663.977C676.309,690.054,649.703,713.281,619.767,732.705C610.271,738.875,597.437,736.043,591.27,727.018C585.096,717.549,587.948,704.749,597.437,698.579C624.051,681.052,648.273,660.185,669.174,636.942C690.09,613.253,707.66,586.685,721.918,558.244ZZ" />
						<path fill-rule="evenodd" rx="0" ry="0"
							  d="M769,504C779.948,504,789,494.952,789,483.992C789,473.048,779.941,464,769,464C758.052,464,749,473.048,749,483.992C748.992,494.952,758.052,504,769,504ZZ" />
					</g>
				</g>
			</g>
		</svg>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent } from 'vue';
	import { User } from '../../shared/models/User';

	export default defineComponent({
		name: 'UserAvatar',
		props: {
			user: User,
			interactive: {
				type: Boolean,
				default: false
			}
		},
		setup(props) {
			return {
				initials: computed(() => {
					if (!props.user) return '';

					let { name } = props.user;
					let names = name.split(' ');

					if (names.length == 1) {
						return name.substr(0, 2);
					} else {
						return names[0].substr(0, 1) + names[1].substr(0, 1);
					}
				}),
				hue: computed(() => {
					if (!props.user) return 0;

					let { id } = props.user;
					return (id * 1546496) % 360;
				}),
			}
		}
	})
</script>

<style lang="scss" scoped>
	.user-avatar {
		--avatar-size-i: var(--avatar-size, 50px);
		--avatar-hue-i: var(--avatar-hue, 100deg);
		width: var(--avatar-size-i);
		aspect-ratio: 1;

		position: relative;

		user-select: none;

		.inner {
			width: 75%;
			aspect-ratio: 1;
			border-radius: 50%;
			overflow: hidden;

			background: hsl(var(--avatar-hue-i), 90%, 30%);

			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);

			transition: box-shadow .4s ease;
		}

		.initials {
			font-family: $font-title;
			color: var(--neutral-lightest);
			font-size: calc(var(--avatar-size-i) * .45);

			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-45%);
		}

		svg {
			width: 100%;
			height: 100%;

			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			transition: transform .3s cubic-bezier(.53,-0.78,.55,1.9);
			transform-origin: 50%;

			.outer-circle {
				fill: hsl(var(--avatar-hue-i), 90%, 50%);
				fill-opacity: 1;

			}
		}

		&.interactive {
			cursor: pointer;

			&:hover {
				.inner {
					box-shadow: 0 0 calc(var(--avatar-size-i) * .5) hsla(var(--avatar-hue-i), 90%, 50%, .5);
				}

				svg {
					transform: translate(-50%,-50%) scale(1.1);
				}
			}
		}
	}
</style>
