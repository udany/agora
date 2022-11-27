<template>
	<MainContent>
		<div class="login">
			<h1 class="text-center">Login</h1>

			<FormWrapper class="login-form" @submit="login">
				<FormField for="email" label="Email">
					<FormInput id="email" v-model="user.email" />
				</FormField>

				<FormField for="password" label="Password">
					<FormInput id="password" type="password" v-model="user.password" />
				</FormField>

				<div style="display: flex; justify-content: space-between; align-items: center;">
					<BaseButton
						type="submit" icon="angle-right" class="primary large"
						@click.prevent="login"
						:disabled="loading"
					>
						Login
					</BaseButton>

					<div class="text-xs">or</div>

					<BaseButton
						type="submit" icon="pencil-alt" class="secondary large"
						@click.prevent="register"
						:disabled="loading"
					>
						Register
					</BaseButton>
				</div>
			</FormWrapper>
		</div>
	</MainContent>
</template>

<script lang="ts">
	import { defineComponent, reactive, ref } from 'vue';
	import { useRouter } from 'vue-router'

	import BaseButton from 'udany-toolbox/vue/ui/Button/BaseButton.vue';
	import MainContent from '../../components/layout/MainContent.vue';
	import FormField from '../../components/form/FormField.vue';
	import FormInput from '../../components/form/FormInput.vue';

	import { User } from '../../../shared/models/User';
	import { apiService } from '../../services/api';
	import { sessionService } from '../../services/session';
	import { modalService } from 'udany-toolbox/vue/ui/Modal/modalService';
	import FormWrapper from '../../components/form/FormWrapper.vue';

	export default defineComponent({
		components: { FormWrapper, FormInput, FormField, MainContent, BaseButton },
		Name: 'Home',
		setup() {
			const router = useRouter();
			let user = reactive(new User());
			let loading = ref(false);

			function register() {
				router.push('register');
			}

			async function login() {
				if (await apiService.auth.login(user)) {
					await sessionService.load();
					router.push('home');
				} else {
					modalService.alert({ icon: 'times', title: 'Error', message: 'Invalid credentials' });
				}
			}

			return {
				user,
				loading,
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


		.field {
			display: flex;
			flex-direction: column;
		}
	}
</style>
