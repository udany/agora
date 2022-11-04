<template>
	<div class="layout-default">
			<div class="text-center my-3">
				<router-link to="/">
					<MainLogo white style="width: 50px" />
				</router-link>
			</div>
		<slot></slot>
	</div>
	<ModalContainer :service="modalService" />
</template>

<script>
	import { modalService } from 'udany-toolbox/vue/ui/Modal/modalService';
	import ModalContainer from 'udany-toolbox/vue/ui/Modal/ModalContainer.vue';
	import MainContent from '../components/layout/MainContent.vue';
	import MainLogo from '../components/MainLogo.vue';

	export default {
		name: 'DefaultLayout',
		data: () => ({
			modalService
		}),
		components: {
			MainLogo,
			MainContent,
			ModalContainer
		}
	}
</script>

<style lang="scss" scoped>
	.layout-default {
	}
</style>
