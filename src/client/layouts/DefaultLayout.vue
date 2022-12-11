<template>
	<div class="layout-default">
		<header :class="{ logged: session.user }">
			<UserAvatar class="avatar" :user="session.user" interactive @mouseenter="onMouseEnterAvatar" @mouseleave="onMouseLeaveAvatar">
				<div v-if="session.user" class="user-menu" :class="{ visible: showUserMenu }">
					<router-link :to="{...ProfileRoutes.profile, params: {id: session.user.id} }">
						<FaIcon>user</FaIcon>
						My profile
					</router-link>

					<a href="/api/auth/logout" @click.prevent.stop="logout">
						<FaIcon>sign-out-alt</FaIcon>
						Logout
					</a>
				</div>
			</UserAvatar>

			<router-link to="/">
				<MainLogo class="logo" white style="width: 50px" />
			</router-link>
		</header>

		<slot></slot>

		<ModalContainer :service="modalService" />
	</div>
</template>

<script>
	import { ref } from 'vue';

	import { sessionService } from '../services/session';
	import { modalService } from 'udany-toolbox/vue/ui/Modal/modalService';
	import { ProfileRoutes } from '../modules/profile/routes';

	import FaIcon from 'udany-toolbox/vue/ui/FontAwesome/FaIcon.vue';
	import ModalContainer from 'udany-toolbox/vue/ui/Modal/ModalContainer.vue';
	import MainContent from '../components/layout/MainContent.vue';
	import MainLogo from '../components/MainLogo.vue';
	import UserAvatar from '../components/UserAvatar.vue';

	import { useTimer } from 'udany-toolbox/vue/util/useTimer.js';
	import { useRoute, useRouter } from 'vue-router';

	export default {
		name: 'DefaultLayout',
		components: {
			FaIcon,
			UserAvatar,
			MainLogo,
			MainContent,
			ModalContainer
		},
		setup() {
			const route = useRoute();
			const router = useRouter();
			let showUserMenu = ref(false);

			let hideUserMenuTimer = useTimer(() => {
				showUserMenu.value = false;
			}, 300);

			return {
				ProfileRoutes,
				modalService,
				session: sessionService.session,
				showUserMenu,
				onMouseEnterAvatar() {
					hideUserMenuTimer.stop();
					showUserMenu.value = true;
				},
				onMouseLeaveAvatar() {
					hideUserMenuTimer.start();
				},
				async logout() {
					showUserMenu.value = false;
					await sessionService.logout();
					if (!route.meta.public) {
						await router.push({
							name: 'index'
						});
					}
				}
			}
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
		z-index: 10;

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

	.user-menu {
		position: absolute;
		top: 100%;
		right: 0;
		background: hsla(var(--neutral-lightest-hsl), .08);

		margin-top: var(--spacer-2);
		padding: var(--spacer-3) var(--spacer-3);

		cursor: default;

		a {
			white-space: nowrap;
			display: block;
		}

		a + a {
			margin-top: var(--spacer-3);
		}

		opacity: 0;
		transform: translateY(-10px);
		transition: transform .3s cubic-bezier(.53,-0.28,.55,1.9), opacity .3s ease;
		pointer-events: none;

		&.visible {
			transform: translateY(0);
			opacity: 1;
			pointer-events: all;
		}
	}

	.layout-default {
	}
</style>
