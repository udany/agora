<template>
	<div class="text-composer-outer" :class="{ focused: data.focused }">
		<div class="toolbar">
			<IconButton
				tooltip="Bold"

				:toggled="false"
				:disabled="false"

				@mousedown.stop.prevent="commands.bold"
			>
				bold
				<template v-slot:tooltip><b>Bold</b></template>
			</IconButton>
			<IconButton
				tooltip="Italic"

				:toggled="false"
				:disabled="false"

				@mousedown.stop.prevent="commands.italic"
			>
				italic
				<template v-slot:tooltip><i>Italic</i></template>
			</IconButton>
			<IconButton
				tooltip="Underline"

				:toggled="false"
				:disabled="false"

				@mousedown.stop.prevent="commands.underline"
			>
				underline
				<template v-slot:tooltip><u>Underline</u></template>
			</IconButton>
			<IconButton
				tooltip="Strike"

				:toggled="false"
				:disabled="false"

				@mousedown.stop.prevent="commands.strikethrough"
			>
				strikethrough
				<template v-slot:tooltip><s>Strike</s></template>
			</IconButton>
		</div>

		<div
			class="text-composer"
			ref="root"
			:class="{ focused: data.focused }"
		></div>
	</div>
</template>

<script lang="ts">
	import { onBeforeUnmount, onMounted, reactive, ref, watch, defineComponent } from 'vue';
	import { schema } from './prosemirror';
	import { EditorState } from 'prosemirror-state';
	import { EditorView } from 'prosemirror-view';
	import { keymap } from 'prosemirror-keymap';
	import { baseKeymap, toggleMark } from 'prosemirror-commands';
	import { history, undo, redo, undoDepth } from 'prosemirror-history';

	import IconButton from 'udany-toolbox/vue/ui/Button/IconButton.vue';
	import { PlaceholderPlugin } from './plugins/placeholder';

	//import { useProseMirrorSelection } from './useProseMirrorSelection';

	export default defineComponent({
		name: 'TextComposer',
		emits: [
			'focus', 'blur',
			'selectionChange',
			'newBlock'
		],
		props: {
			multiline: {
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

			// const selection = useProseMirrorSelection();
			// watch(() => selection.selected, () => {
			// 	ctx.emit('selectionChange', { selection, view })
			// })

			const currentKeymap = {
				...baseKeymap,
				"Mod-b": toggleMark(schema.marks.strong),
				"Mod-i": toggleMark(schema.marks.em),
				"Mod-u": toggleMark(schema.marks.underline),
				"Mod-tilde": toggleMark(schema.marks.strikethrough),
				"Mod-Shift-z": redo,
				"Mod-z": undo,
				"Mod-y": redo,
			}

			if (!props.multiline) {
				currentKeymap.Enter = () => false
			}

			onMounted(() => {
				state = EditorState.create({
					schema,
					plugins: [
						hist,
						keymap(currentKeymap),
						PlaceholderPlugin(props.placeholder)
						//selection.plugin()
					]
				});

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
						}
					}
				});

				view.focus();
			});

			onBeforeUnmount(() => {
				view.destroy();
			})

			const commands = {
				bold: () => toggleMark(schema.marks.strong)(view.state, view.dispatch),
				italic: () => toggleMark(schema.marks.em)(view.state, view.dispatch),
				underline: () => toggleMark(schema.marks.underline)(view.state, view.dispatch),
				strikethrough: () => toggleMark(schema.marks.strikethrough)(view.state, view.dispatch),

				undo: () => undo(view.state, view.dispatch),
				redo: () => redo(view.state, view.dispatch),
			};

			return {
				root,
				data,
				commands
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
				color: var(--neutral-light);
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

		&.focused {
			.toolbar {
				opacity: 1;
				transform: translateY(0%);
			}
		}
	}

	.toolbar {
		font-size: var(--font-size-md);
		position: sticky;
		top: 0;

		opacity: 0;
		transform: translateY(50%);

		transition: opacity .3s ease, transform .3s ease;
	}
</style>
