<template>
	<MainContent>
		<h1>
			<TextComposer placeholder="Title" />
		</h1>

		<main class="home pt-4">
			<TextComposer multiline focus placeholder="Every story starts with typing a single character..." />
		</main>
	</MainContent>
</template>

<script lang="ts">
	import { defineComponent, reactive, onMounted } from 'vue';
	import BaseButton from 'udany-toolbox/vue/ui/Button/BaseButton.vue';
	import MainContent from '../../components/layout/MainContent.vue';
	import MainLogo from '../../components/MainLogo.vue';
	import TextComposer from '../../components/composer/TextComposer.vue';
	import FormInput from '../../components/form/FormInput.vue';


	export default defineComponent({
		components: { FormInput, TextComposer, MainLogo, MainContent, BaseButton },
		Name: 'Home',
		setup() {

			return {}
		}
	})
</script>

<style lang="scss" scoped></style>
