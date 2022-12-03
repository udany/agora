<template>
	<div
		class="font-preview"
		:class="{
			'ín-view': inView,
			selected
		}"

		:style="{
			'--font': font?.family,
			'--size': size + 'px',
		}"
		ref="root"
	>
		<template v-if="font">
			<div
				class="main-content single-line ellipsis"
				:class="{
					loaded: loader.loaded
				}"

				:style="{
					fontWeight: weight
				}"
				v-if="inView"
			>
				{{!preview ? font.family : preview}}
			</div>

			<transition name="fade">
				<div
					v-if="preview"

					class="title"
					:class="{
						loaded: loader.loaded
					}"
				>{{font.family}}</div>
			</transition>

			<div
				class="info scroll-discreet"
				:class="{
					loaded: loader.loaded
				}"

				v-if="inView && showInfo"
			>
				<div>
					<b>Subsets</b> <br>

					<span
						v-for="subset of font.subsets"
						:key="subset"

						class="subset d-inline-block ms-2"
					>
						{{subset}}
					</span>
				</div>
				<div>
					<b>variants</b> <br>

					<span
						v-for="variant of font.variants.filter(v => !v.italic)"
						:key="variant.weight"

						class="variant d-inline-block ms-2"
						:class="{
							selected: weight === variant.weight
						}"

						:style="{
							fontWeight: variant.weight
						}"

						@click.stop.prevent="weight = variant.weight"
					>
						{{variant.weight}}

						<FaIcon
							v-if="!!font.variants.find(v => v.weight === variant.weight)"
							title="Italic available"
						>italic</FaIcon>
					</span>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import { computed, ref, watch } from 'vue';
	import { useFont } from './useFont';
	import { useIntersectionObserver } from '@vueuse/core';

	export default {
		name: 'FontPreview',
		props: {
			selected: {
				type: Boolean,
				default: false
			},

			fontName: {
				required: true
			},

			preview: {
				type: String,
				default: ''
			},

			size: {
				type: Number,
				default: 64
			},

			showInfo: {
				type: Boolean,
				default: true
			},
		},
		data: () => ({
			weight: 400,
			italic: false
		}),
		setup(props) {
			const root = ref();
			const inView = ref(false);

			let loader = useFont();

			useIntersectionObserver(
				root,
				([{ isIntersecting }]) => {
					inView.value = isIntersecting;

					if (isIntersecting && !loader.loaded) {
						loader.load(props.fontName);
					} else if (!isIntersecting && loader.loaded) {
						loader.unload();
					}
				},
			);

			watch(() => props.fontName, () => {
				if (inView.value) loader.load(props.fontName);
			})

			return {
				inView,
				root,
				loader,
				font: computed(() => loader.font)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.font-preview {
		--content-size: var(--size, 3.5em);

		height: calc(var(--content-size) * 2);

		display: flex;
		justify-content: flex-end;
		align-items: center;

		padding: 0 var(--spacer-4);

		background: rgba(black, .1);

		contain: layout;

		cursor: pointer;

		border-left: var(--spacer-1) hsla(var(--accent), .3) solid;
		transition: border-color .3s, background-color .3s;

		&:hover, &.selected {
			border-color: hsla(var(--accent), 1);
			background: rgba(black, .2);
		}

		&.selected {
			pointer-events: none;
		}

		> * {
			display: none;
		}

		&.ín-view {
			> * {
				display: block;
			}
		}

		.main-content {
			width: 100%;
			padding: var(--spacer-3) 0;

			font-size: var(--content-size);
			font-family: var(--font);

			text-align: center;

			opacity: 0;

			&.loaded {
				transition: opacity .3s;
				opacity: 1;
			}
		}

		.title {
			font-size: 1.4em;
			font-family: var(--font);

			position: absolute;
			left: var(--spacer-3);
			top: 0;

			opacity: 0;

			&.loaded {
				transition: opacity .3s;
				opacity: 1;
			}
		}

		.info {
			width: 300px;
			color: $neutral-light;

			text-align: right;
			font-size: .8em;

			flex-shrink: 0;

			display: flex;
			align-items: center;
			align-self: stretch;

			padding: var(--spacer-2) 0;

			> * {
				width: 50%;
				padding: 0 var(--spacer-2);

				overflow: auto;
			}

			.variant {
				cursor: pointer;

				&:hover, &.selected {
					color: $secondary;
				}

				.fa-icon {
					font-size: .6em;
					transform: translate(-.2em, -.1em);
				}
			}
		}
	}
</style>
