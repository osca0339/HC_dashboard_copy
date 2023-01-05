<script lang="ts">
	import CompareData from '../../../Components/compareData.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<CompareData
	patients={data.patients}
	patientData={data.patientData}
	patientId={data.patientId}
	HCPId={data.HCPId}
/>
