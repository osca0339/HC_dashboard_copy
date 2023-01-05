<script lang="ts">
	import PatientDataTable from '../../../Components/PatientDataTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	
</script>

<PatientDataTable
	thresholds={data.patient[0].HCProThresholds.Thresholds}
	patientData={data.patientData}
	patientId={data.id}
/>
