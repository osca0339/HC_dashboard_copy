<script lang="ts">
	import AddPatient from "../Components/addPatient.svelte";
	import type { PageData } from './$types';
	export let data: PageData;
</script>
<AddPatient emailKey={data.emailKey} templateId={data.emailtemplate}>

</AddPatient>