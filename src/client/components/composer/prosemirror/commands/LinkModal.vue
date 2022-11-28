<template>
	<ModalFrame
		icon="link"
		:title="href ? 'Edit link' : 'Add link'"

		:size="ModalSize.medium"

		:show-close="false"

		ref="rootRef"
	>
		<FormWrapper class="form" @submit="save" @cancel="close">
			<FormField for="text" label="Text">
				<FormInput tabindex="1" id="text" v-model="data.text" :disabled="!!text" />
			</FormField>

			<FormField for="href" label="Link">
				<FormInput tabindex="2" id="href" v-model="data.href" />
			</FormField>

			<FormField for="title" label="Title">
				<FormInput tabindex="3" id="title" v-model="data.title" />
			</FormField>

			<div class="text-end pt-2 pb-3">
				<BaseButton tabindex="5" class="secondary ms-2" @keydown.enter.stop @click="remove" icon="trash">
					Remove
				</BaseButton>
				<BaseButton tabindex="4" class="primary ms-2" @click="save" icon="link">
					Save
				</BaseButton>
			</div>
		</FormWrapper>
	</ModalFrame>
</template>

<script lang="ts">
	import { defineComponent, onBeforeUnmount, onMounted, ref, defineEmits, reactive } from 'vue';

	import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

	import { modalService, ModalSize } from 'udany-toolbox/vue/ui/Modal/modalService';

	import ModalFrame from 'udany-toolbox/vue/ui/Modal/ModalFrame.vue';
	import BaseButton from 'udany-toolbox/vue/ui/Button/BaseButton.vue';
	import FormInput from '../../../form/FormInput.vue';
	import FormField from '../../../form/FormField.vue';
	import FormWrapper from '../../../form/FormWrapper.vue';
	import { LinkData } from './link';

	export default defineComponent({
		name: 'LinkModal',
		components: { FormWrapper, FormField, ModalFrame, BaseButton, FormInput },
		props: {
			text: String,
			href: String,
			title: String
		},
		emits: ['close', 'save', 'remove'],
		setup(props, { emit }) {
			// Focus trap
			let rootRef = ref();
			const trap = useFocusTrap(rootRef, { immediate: true });

			onBeforeUnmount(() => {
				trap.deactivate();
			});

			const data: LinkData = reactive({
				text: props.text,
				href: props.href,
				title: props.title,
			});

			function close() {
				emit('close');
			}

			function save() {
				emit('save', data);

				close();
			}

			async function remove() {
				if (await modalService.confirm({
					message: 'Are you sure?'
				})) {
					emit('remove');

					close();
				}
			}

			return {
				rootRef,
				ModalSize,
				data,
				save,
				remove,
				close
			}
		}
	})
</script>

<style lang="scss" scoped>
	.form {
		> * + * {
			margin-top: var(--spacer-3);
		}
	}
</style>
