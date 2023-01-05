<script lang="ts">
	import { storeHCPId } from '$protectedMongoId';
	export let patients: [];
	export let patientData: [];
	export let patientId: string;
	export let HCPId: string;

	let patientName = patients.find((p) => p.id == patientId).name;

	let startDateOne: Date = new Date('2000-11-10');
	let startDateTwo: Date = new Date('2000-11-10');

	$: formatedStartOne = new Date(startDateOne);
	$: formatedStartTwo = new Date(startDateTwo);

	const tableHeaders = Object.keys(patientData[0]);

	let firstArray: [] = [];
	let secondArray: [] = [];

	const compareData = () => {
		patientData.forEach((p) => {
			if (
				p.Date.getTime() >= formatedStartOne.getTime() &&
				p.Date.getTime() <= formatedStartOne.getTime() + 604800000
			) {
				firstArray.push(p);
				firstArray = firstArray;
			} else if (
				p.Date.getTime() >= formatedStartTwo.getTime() &&
				p.Date.getTime() <= formatedStartTwo.getTime() + 604800000
			) {
				secondArray.push(p);
				secondArray = secondArray;
			}
		});
	};
</script>

{#if HCPId == $storeHCPId}
	<p>Start of first week</p>
	<label>
		<input type="date" bind:value={startDateOne} />
	</label>
	<p>Start of second week</p>
	<label>
		<input type="date" bind:value={startDateTwo} />
	</label>
	<button on:click={() => compareData()}>Boom</button>
	<table width="500" border="10">
		<tr><th align="left" colspan="9">{patientName}</th></tr>
		<tr>
			{#each tableHeaders as header}
				{#if header != 'id' && header != 'patientId'}
					<th>
						{header.replace('_', ' ')}
					</th>
				{/if}
			{/each}
		</tr>
		{#each firstArray as p}
			<tr>
				<td>{p.Date.toLocaleString()}</td>
				<td>{p.Breathing_Rate}</td>
				<td>{p.Breathing_Depth}</td>
				<td>{p.SPO2}</td>
				<td>{p.Coughing_Count}</td>
				<td>{p.Heart_Rate}</td>
				<td>{p.HRV}</td>
				<td>{p.Arythmia_Count}</td>
				<td>{p.Body_Temperature}</td>
			</tr>
		{/each}
		{#if secondArray.length != 0}
			<tr>
				<th align="left" colspan="9">Second dataset</th>
			</tr>
		{/if}
		{#each secondArray as p}
			<tr>
				<td>{p.Date.toLocaleString()}</td>
				<td>{p.Breathing_Rate}</td>
				<td>{p.Breathing_Depth}</td>
				<td>{p.SPO2}</td>
				<td>{p.Coughing_Count}</td>
				<td>{p.Heart_Rate}</td>
				<td>{p.HRV}</td>
				<td>{p.Arythmia_Count}</td>
				<td>{p.Body_Temperature}</td>
			</tr>
		{/each}
	</table>
{:else}
	<h3>Wrong user!</h3>
{/if}
