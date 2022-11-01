<template>
	<div class="home">
		{{users.map(u => u.name)}}
		Hello world!
	</div>
</template>

<script lang="ts">
	import { User } from '../../../shared/models/User';
	import { apiService } from '../../services/api';
	import { defineComponent, reactive, onMounted } from 'vue';
	import { modalService } from 'udany-toolbox/vue/ui/Modal/modalService';

	export default defineComponent({
		Name: 'Home',
		setup() {
			let users = reactive<User[]>([]);

			onMounted(async () => {
				let userList = await apiService.test.test();
				users.push(...userList);

				await modalService.confirm({ message: 'Teste' });
			})

			return {
				users
			}
		}
	})
</script>

<style lang="scss" scoped></style>
