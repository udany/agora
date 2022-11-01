<template>
	<div class="layout-default">
		<slot></slot>
	</div>
	<ModalContainer :service="modalService" />
</template>

<script>
	import { modalService } from 'udany-toolbox/vue/ui/Modal/modalService';
	import ModalContainer from 'udany-toolbox/vue/ui/Modal/ModalContainer.vue';

	export default {
		name: 'DefaultLayout',
		data: () => ({
			modalService
		}),
		components: {
			ModalContainer
		}
	}
</script>

<style lang="scss" scoped>
	.layout-default {
	}
</style>
