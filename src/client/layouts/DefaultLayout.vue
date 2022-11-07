<template>
	<div class="layout-default">
		<header :class="{ logged: session.user }">
			<UserAvatar class="avatar" :user="session.user" interactive />

			<router-link to="/">
				<MainLogo class="logo" white style="width: 50px" />
			</router-link>
		</header>

		<slot></slot>

		<ModalContainer :service="modalService" />
	</div>
</template>

<script>
	import { modalService } from 'udany-toolbox/vue/ui/Modal/modalService';
	import ModalContainer from 'udany-toolbox/vue/ui/Modal/ModalContainer.vue';
	import MainContent from '../components/layout/MainContent.vue';
	import MainLogo from '../components/MainLogo.vue';
	import { sessionService } from '../services/session';
	import UserAvatar from '../components/UserAvatar.vue';

	export default {
		name: 'DefaultLayout',
		data: () => ({
			modalService,
			session: sessionService.session
		}),
		components: {
			UserAvatar,
			MainLogo,
			MainContent,
			ModalContainer
		}
	}
</script>

<style lang="scss" scoped>
	header {
		--bezier: cubic-bezier(.63,-0.05,.44,1.41);
		max-width: 768px;
		text-align: left;
		margin: var(--spacer-3) auto 0;
		position: relative;

		height: 50px;

		&.logged {
			.logo {
				left: 0;
				transform: translateX(0);
			}
			.avatar {
				left: 100%;
				transform: translateX(-100%);

				opacity: 1;
				pointer-events: all;
			}
		}
	}

	.logo {
		position: absolute;
		left: 50%;

		transition: left .6s var(--bezier), transform .6s;
		transform: translateX(-50%);
	}

	.avatar {
		position: absolute;
		left: 50%;

		opacity: 0;
		pointer-events: none;

		transition: left .6s var(--bezier), transform .6s, opacity .6s;
		transform: translateX(-50%);
	}

	.layout-default {
	}
</style>
