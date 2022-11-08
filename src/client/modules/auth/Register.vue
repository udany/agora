<template>
	<MainContent>
		<div class="login">
			<h1 class="text-center">Register</h1>

			<div class="login-form">
				<FormField for="name" label="Name">
					<FormInput id="name" v-model="user.name" />
				</FormField>

				<FormField for="email" label="Email">
					<FormInput id="email" v-model="user.email" />
				</FormField>

				<FormField for="password" label="Password">
					<FormInput id="password" type="password" v-model="user.password" />
				</FormField>

				<div style="display: flex; justify-content: space-between; align-items: center;">
					<BaseButton
						type="submit" icon="angle-right" class="primary large"
						@click.prevent="register"
					>
						Register!
					</BaseButton>

					<div class="text-xs">or</div>

					<BaseButton
						type="submit" icon="key" class="secondary large"
						@click.prevent="login"
					>
						Login
					</BaseButton>
				</div>
			</div>
		</div>
	</MainContent>
</template>

<script lang="ts">
	import { defineComponent, reactive, onMounted } from 'vue';
	import { useRouter } from 'vue-router';

	import BaseButton from 'udany-toolbox/vue/ui/Button/BaseButton.vue';
	import MainContent from '../../components/layout/MainContent.vue';
	import FormField from '../../components/form/FormField.vue';
	import FormInput from '../../components/form/FormInput.vue';

	import { User } from '../../../shared/models/User';
	import { apiService } from '../../services/api';
	import { modalService } from 'udany-toolbox/vue/ui/Modal/modalService';
	import emailRegex from 'udany-toolbox/modules/util/helpers/emailRegex';

	export default defineComponent({
		name: 'Home',
		components: { FormInput, FormField, MainContent, BaseButton },
		setup() {
			const router = useRouter();
			let user = reactive(new User());

			async function register() {
				if (!user.name) {
					modalService.alert({ message: 'Name is a required field' })
					return;
				}

				if (!user.email) {
					modalService.alert({ message: 'Email is a required field' })
					return;
				}

				if (!emailRegex.exec(user.email)) {
					modalService.alert({ message: 'Email is invalid' })
					return;
				}

				if (!user.password) {
					modalService.alert({ message: 'Password is a required field' })
					return;
				}
				if (user.password.length < 12) {
					modalService.alert({
						icon: 'key',
						title: 'Password too short',
						message: `Password is to be at least 12 characters, if that's too much, try a pass phrase instead of a pass word :D`
					})
					return;
				}

				try {
					await apiService.auth.register(user);

					await login();
				} catch ({ response }) {
					switch (response.status) {
						case 409:
							modalService.alert({ icon: 'times', title: 'Error', message: 'Email is already registered' });
							break;
						default:
							modalService.alert({ icon: 'times', title: 'Error', message: 'Invalid data' });
							break;
					}
				}
			}

			async function login() {
				return router.push({ name: 'login' });
			}

			return {
				user,
				register,
				login
			}
		}
	})
</script>

<style lang="scss" scoped>
	.login-form {
		max-width: 300px;
		margin: var(--spacer-3) auto;

		> * + * {
			margin-top: var(--spacer-3);
		}
	}
</style>
