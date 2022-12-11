<template>
	<div class="text-composer-outer" :class="{ focused: data.focused }">
		<div class="toolbar">
			<IconButton
				tooltip="Bold"

				:toggled="editorState.marksToggled.includes('strong')"
				:disabled="false"

				@mousedown.stop.prevent="commands.bold"
			>
				bold
				<template v-slot:tooltip><b>Bold</b></template>
			</IconButton>
			<IconButton
				tooltip="Italic"

				:toggled="editorState.marksToggled.includes('em')"
				:disabled="false"

				@mousedown.stop.prevent="commands.italic"
			>
				italic
				<template v-slot:tooltip><i>Italic</i></template>
			</IconButton>
			<IconButton
				tooltip="Underline"

				:toggled="editorState.marksToggled.includes('underline')"
				:disabled="false"

				@mousedown.stop.prevent="commands.underline"
			>
				underline
				<template v-slot:tooltip><u>Underline</u></template>
			</IconButton>
			<IconButton
				tooltip="Strike"

				:toggled="editorState.marksToggled.includes('strikethrough')"
				:disabled="false"

				@mousedown.stop.prevent="commands.strikethrough"
			>
				strikethrough
				<template v-slot:tooltip><s>Strike</s></template>
			</IconButton>
			<IconButton
				tooltip="Link"

				:toggled="editorState.marksToggled.includes('link')"
				:disabled="false"

				@mousedown.stop.prevent="commands.link"
			>
				link
			</IconButton>

			<div class="spacer"></div>

			<template v-if="!inline">
				<IconButton
					tooltip="Paragraph"

					:toggled="editorState.currentNode?.type.name === 'paragraph'"
					:disabled="false"

					@mousedown.stop.prevent="commands.paragraph"
				>
					paragraph
				</IconButton>
				<IconButton
					tooltip="Heading"

					:toggled="editorState.currentNode?.type.name === 'heading' "
					:disabled="false"

					@mousedown.stop.prevent="commands.heading"
				>
					heading
				</IconButton>
			</template>
		</div>

		<div
			class="text-composer"
			ref="root"
			:class="{ focused: data.focused }"
		></div>
	</div>
</template>

<script lang="ts">
	import { onBeforeUnmount, onMounted, reactive, ref, watch, defineComponent, computed } from 'vue';
	import { commands, customKeymap, schema } from './prosemirror';
	import { EditorState } from 'prosemirror-state';
	import { EditorView } from 'prosemirror-view';
	import { keymap } from 'prosemirror-keymap';
	import { history } from 'prosemirror-history';

	import IconButton from 'udany-toolbox/vue/ui/Button/IconButton.vue';
	import { PlaceholderPlugin } from './plugins/placeholder';
	import { TabIndexPlugin } from './plugins/tabindex';
	import { useState } from './plugins/state';
	import { Node } from 'prosemirror-model';
	import { IdPlugin } from './plugins/ids';

	export default defineComponent({
		name: 'TextComposer',
		emits: [
			'focus', 'blur',
			'selectionChange',
			'update:modelValue'
		],
		props: {
			inline: {
				type: Boolean,
				default: false
			},
			focus: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: ''
			},
			tabindex: {
				type: String,
				default: '1'
			},
			modelValue: {
				type: Object,
				default: null
			}
		},
		components: { IconButton },
		setup(props, ctx) {
			let state: EditorState, view: EditorView;

			const root = ref();
			const data = reactive({
				focused: false
			});

			const hist = history();

			const editorState = useState();

			watch(() => editorState.selected, () => {
				ctx.emit('selectionChange', { editorState, view })
			});

			watch(() => editorState.content, () => {
				ctx.emit('update:modelValue', editorState.content);
			});

			const currentKeymap = {
				...customKeymap
			}

			if (props.inline) {
				currentKeymap.Enter = () => false
			}

			const plugins = [
				hist,
				keymap(currentKeymap),
				PlaceholderPlugin(props.placeholder),
				TabIndexPlugin(props.tabindex),
				editorState.plugin(),
				IdPlugin()
			];

			onMounted(() => {
				if (props.modelValue) {
					// Create from loaded doc
					state = EditorState.create({
						plugins,
						doc: Node.fromJSON(schema, props.modelValue)
					});
				} else {
					// Create blank doc
					state = EditorState.create({
						schema: schema,
						plugins
					});
				}

				view = new EditorView(root.value, {
					state,
					handleDOMEvents: {
						blur() {
							data.focused = false;
							ctx.emit('blur');
						},
						focus() {
							data.focused = true;
							ctx.emit('focus');
						},
					},
				});

				if (props.focus) view.focus();
			});

			onBeforeUnmount(() => {
				// The timeout prevents flickering when the routes are transitioning
				setTimeout(() => {
					view.destroy();
				}, 500);
			});

			const viewCommands = {
				bold: () => commands.bold(view.state, view.dispatch),
				italic: () => commands.italic(view.state, view.dispatch),
				underline: () => commands.underline(view.state, view.dispatch),
				strikethrough: () => commands.strikethrough(view.state, view.dispatch),

				paragraph: () => commands.paragraph(view.state, view.dispatch),
				heading: () => commands.heading(view.state, view.dispatch),

				link: () => commands.link(view.state, view.dispatch),

				undo: () => commands.undo(view.state, view.dispatch),
				redo: () => commands.redo(view.state, view.dispatch),
			};

			return {
				root,
				data,
				editorState,
				commands: viewCommands,

				selectedNodeType: ref('')
			}
		},
	})
</script>

<style lang="scss" scoped>
	.text-composer {
		border-left: 2px solid hsla(var(--neutral-lightest-hsl), .1);
		margin-left: -2px;

		&.focused {
			background: hsla(var(--neutral-lightest-hsl), .05);
		}

		&::v-deep(div:first-child) {
			padding: var(--spacer-3) var(--spacer-2);

			min-height: 1em;
			outline: none !important;
			cursor: text;

			&.ProseMirror[data-placeholder]::before {
				color: var(--neutral-md);
				position: absolute;
				content: attr(data-placeholder);
				pointer-events: none;
				line-height: 1.5em;
			}

			@import "./text-style";
		}
	}

	.text-composer-outer {
		position: relative;
		margin-top: -24px;

		&.focused {
			.toolbar {
				opacity: 1;
				transform: translateY(0%);

				transition: opacity .3s ease, transform .3s ease;
				pointer-events: all;
			}
		}
	}

	.toolbar {
		background: hsla(var(--neutral-darkest-hsl), .8);
		backdrop-filter: blur(2px);
		font-size: var(--font-size-md);
		position: sticky;
		top: 0;

		border-left: 2px solid hsla(var(--neutral-lightest-hsl), .1);
		margin-left: -2px;

		opacity: 0;
		transform: translateY(50%);

		display: flex;

		margin-top: -24px;

		transition: opacity .1s ease, transform .1s ease;
		pointer-events: none;

		padding: var(--spacer-1) 0;

		.spacer {
			width: var(--spacer-2);
		}
	}
</style>
