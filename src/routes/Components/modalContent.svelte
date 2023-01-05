<script lang="ts">
	import { getContext } from 'svelte';
	import EditThreshold from './editThreshold.svelte';
	export let patientData;
	export let thresholds;
	export let chosenValue;
	const { open } = getContext('simple-modal');
	const openModal = () => open(EditThreshold, { thresholds: thresholds, chosenValue: chosenValue });
</script>

<button class="btn btn-outline-primary btn-sm" on:click={openModal}>Threshold &#8594</button>
