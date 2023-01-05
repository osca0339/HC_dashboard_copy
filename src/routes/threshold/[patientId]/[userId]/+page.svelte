<script lang="ts">
	import type { PageData } from './$types';
	import EditThreshold from '../../../Components/editThreshold.svelte';

	export let data;
</script>

<EditThreshold patientData={data.patientData} />
