<template>
	<MainContent>
		<div class="login">
			<h1 class="text-center">Login</h1>

			<div class="login-form">
				<FormField for="email" label="Email">
					<FormInput id="email" v-model="user.email" />
				</FormField>

				<FormField for="password" label="Password">
					<FormInput id="password" type="password" v-model="user.password" />
				</FormField>

				<div style="display: flex; justify-content: space-between; align-items: center;">
					<BaseButton
						type="submit" icon="angle-right" class="primary"
						@click.prevent="login"
					>
						Login
					</BaseButton>

					<div class="text-xs">or</div>

					<BaseButton
						type="submit" icon="pencil-alt" class="secondary"
						@click.prevent="register"
					>
						Register
					</BaseButton>
				</div>
			</div>
		</div>
	</MainContent>
</template>

<script lang="ts">
	import { defineComponent, reactive, onMounted } from 'vue';
	import { useRouter } from 'vue-router'

	import BaseButton from 'udany-toolbox/vue/ui/Button/BaseButton.vue';
	import MainContent from '../../components/layout/MainContent.vue';
	import FormField from '../../components/form/FormField.vue';
	import FormInput from '../../components/form/FormInput.vue';

	import { User } from '../../../shared/models/User';
	import { apiService } from '../../services/api';
	import { modalService } from 'udany-toolbox/vue/ui/Modal/modalService';

	export default defineComponent({
		components: { FormInput, FormField, MainContent, BaseButton },
		Name: 'Home',
		setup() {
			const router = useRouter();

			let user = reactive(new User());

			function register() {
				router.push('register');
			}

			function login() {

			}

			return {
				user,
				register
			}
		}
	})
</script>

<style lang="scss" scoped>
	.login-form {
		max-width: 250px;
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
