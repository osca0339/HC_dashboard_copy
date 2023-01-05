<script lang="ts">
	import { goto } from '$app/navigation';
	import { storeHCPId } from '$protectedMongoId';
	import { patientStoreArray } from '$protectedPatientArray';
	import Navbar from './navbar.svelte';
	import ProtectedLayout from './ProtectedLayout.svelte';

	export let merged: any[] = [{}];

	$patientStoreArray = merged;

	let sortedPatientData = merged;

	let selectedHeader = 'Name';
	let ascendingOrder = true;

	let searchCriteria = '';
	let foundPatients: any[] = [];
	function search() {
		if (searchCriteria != '') {
			foundPatients = sortedPatientData.filter((p) =>
				p.Name.toLowerCase().includes(searchCriteria.toLowerCase())
			);
		} else if (searchCriteria == '' || !sortedPatientData.includes(searchCriteria)) {
			foundPatients = [];
		}
	}

	//SORTING VIDEO https://www.youtube.com/watch?v=TKIALJcTJDU&ab_channel=SixStringsCoder
	const tableHeaders = Object.keys(merged[0]);

	const sortByNumber = (tableHeader: any) => {
		if (foundPatients.length > 0) {
			foundPatients = foundPatients.sort((obj1, obj2) => {
				return ascendingOrder
					? obj1[tableHeader] - obj2[tableHeader]
					: obj2[tableHeader] - obj1[tableHeader];
			});
		} else {
			sortedPatientData = sortedPatientData.sort((obj1, obj2) => {
				return ascendingOrder
					? obj1[tableHeader] - obj2[tableHeader]
					: obj2[tableHeader] - obj1[tableHeader];
			});
		}

		selectedHeader = tableHeader;
	};

	const sortByString = (tableHeader: any) => {
		if (foundPatients.length > 0) {
			foundPatients = foundPatients.sort((obj1, obj2) => {
				if (obj1[tableHeader] < obj2[tableHeader]) {
					return -1;
				} else if (obj1[tableHeader] > obj2[tableHeader]) {
					return 1;
				}
				return 0;
			});
			if (!ascendingOrder) {
				sortedPatientData = foundPatients.reverse();
			}
		} else {
			sortedPatientData = sortedPatientData.sort((obj1, obj2) => {
				if (obj1[tableHeader] < obj2[tableHeader]) {
					return -1;
				} else if (obj1[tableHeader] > obj2[tableHeader]) {
					return 1;
				}
				return 0;
			});
			if (!ascendingOrder) {
				sortedPatientData = sortedPatientData.reverse();
			}
		}
		selectedHeader = tableHeader;
	};
</script>

<Navbar />
<ProtectedLayout>
	<div class="container-fluid">
		<div style="margin-top: 80px">
			<div class="input-group mb-3">
				<input
					class="form-control"
					type="text"
					placeholder="Patient name"
					bind:value={searchCriteria}
					on:input={() => search()}
				/>
			</div>
		</div>
		<div class="d-flex">
			{#if foundPatients.length <= 0}
				<table class="table table-bordered table-dark">
					<thead>
						<tr style="white-space: pre-line;word-wrap: break-word;vertical-align: top;">
							{#each tableHeaders as header}
								{#if header != 'id' && header != 'Thresholds'}
									<th
										class:highlighted={selectedHeader === header}
										on:click={() =>
											header === 'Name' ? sortByString(header) : sortByNumber(header)}
									>
										{#if header != 'Name' && header != 'Risk_Score' && header != 'Last_Reading'}
											<p>
												{header.replace('_', ' ')} (avg)
											</p>
										{:else}
											{header.replace('_', ' ')}
										{/if}
										{#if header === selectedHeader}
											<span
												id="arrow"
												class="order-icon"
												on:click={() => (ascendingOrder = !ascendingOrder)}
												>{@html ascendingOrder ? '&#9661;' : '&#9651'}
											</span>
										{:else}
											<br />
										{/if}
									</th>
								{/if}
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each sortedPatientData as p}
							<tr>
								<td
									on:click={() => goto($storeHCPId + '/' + p.id)}
									style="cursor: pointer; font-weight: bold">{p.Name}</td
								>
								<td>{p.Last_14Days}</td>
								<td>{p.Risk_Score}</td>
								<td>{p.Last_Reading.toLocaleString()}</td>
								<td
									class:aboveThreshold={p.Breathing_Rate >=
										p.Thresholds.BreathingRateThreshold.high ||
										p.Breathing_Rate <= p.Thresholds.BreathingRateThreshold.low}
									>{p.Breathing_Rate}</td
								>
								<td
									class:aboveThreshold={p.Breathing_Depth >=
										p.Thresholds.BreathingDepthThreshold.high ||
										p.Breathing_Depth <= p.Thresholds.BreathingDepthThreshold.low}
									>{p.Breathing_Depth}</td
								>
								<td
									class:aboveThreshold={p.SPO2 >= p.Thresholds.SPO2Threshold.high ||
										p.SPO2 <= p.Thresholds.SPO2Threshold.low}>{p.SPO2}</td
								>
								<td
									class:aboveThreshold={p.Coughing_Count >=
										p.Thresholds.CaughingCountThreshold.high ||
										p.Coughing_Count <= p.Thresholds.CaughingCountThreshold.low}
									>{p.Coughing_Count}</td
								>
								<td
									class:aboveThreshold={p.Heart_Rate >= p.Thresholds.HeartRateThreshold.high ||
										p.Heart_Rate <= p.Thresholds.HeartRateThreshold.low}>{p.Heart_Rate}</td
								>
								<td
									class:aboveThreshold={p.HRV >= p.Thresholds.HRVThreshold.high ||
										p.HRV <= p.Thresholds.HRVThreshold.low}>{p.HRV}</td
								>
								<td
									class:aboveThreshold={p.Arythmia_Count >=
										p.Thresholds.ArythmiaCountThreshold.high ||
										p.Arythmia_Count <= p.Thresholds.ArythmiaCountThreshold.low}
									>{p.Arythmia_Count}</td
								>
								<td
									class:aboveThreshold={p.Body_Temperature >=
										p.Thresholds.BodyTemperatureThreshold.high ||
										p.Body_Temperature <= p.Thresholds.BodyTemperatureThreshold.low}
									>{p.Body_Temperature}</td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<table class="table table-bordered table-dark">
					<thead>
						<tr>
							{#each tableHeaders as header}
								{#if header != 'id' && header != 'Thresholds'}
									<th
										class:highlighted={selectedHeader === header}
										on:click={() =>
											header === 'Name' ? sortByString(header) : sortByNumber(header)}
										>{header.replace('_', ' ')}
										{#if header === selectedHeader}
											<span
												id="arrow"
												class="order-icon"
												on:click={() => (ascendingOrder = !ascendingOrder)}
												>{@html ascendingOrder ? '&#9661;' : '&#9651'}
											</span>
										{/if}
									</th>
								{/if}
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each foundPatients as p}
							<tr>
								<td
									on:click={() => goto('patientsOverview/' + p.id)}
									style="cursor: pointer; font-weight: bold">{p.Name}</td
								>
								<td />
								<td>{p.Risk_Score}</td>
								<td>{p.Last_Reading.toLocaleString()}</td>
								<td
									class:aboveThreshold={p.Breathing_Rate >=
										p.Thresholds.BreathingRateThreshold.high ||
										p.Breathing_Rate <= p.Thresholds.BreathingRateThreshold.low}
									>{p.Breathing_Rate}</td
								>
								<td
									class:aboveThreshold={p.Breathing_Depth >=
										p.Thresholds.BreathingDepthThreshold.high ||
										p.Breathing_Depth <= p.Thresholds.BreathingDepthThreshold.low}
									>{p.Breathing_Depth}</td
								>
								<td
									class:aboveThreshold={p.SPO2 >= p.Thresholds.SPO2Threshold.high ||
										p.SPO2 <= p.Thresholds.SPO2Threshold.low}>{p.SPO2}</td
								>
								<td
									class:aboveThreshold={p.Coughing_Count >=
										p.Thresholds.CaughingCountThreshold.high ||
										p.Coughing_Count <= p.Thresholds.CaughingCountThreshold.low}
									>{p.Coughing_Count}</td
								>
								<td
									class:aboveThreshold={p.Heart_Rate >= p.Thresholds.HeartRateThreshold.high ||
										p.Heart_Rate <= p.Thresholds.HeartRateThreshold.low}>{p.Heart_Rate}</td
								>
								<td
									class:aboveThreshold={p.HRV >= p.Thresholds.HRVThreshold.high ||
										p.HRV <= p.Thresholds.HRVThreshold.low}>{p.HRV}</td
								>
								<td
									class:aboveThreshold={p.Arythmia_Count >=
										p.Thresholds.ArythmiaCountThreshold.high ||
										p.Arythmia_Count <= p.Thresholds.ArythmiaCountThreshold.low}
									>{p.Arythmia_Count}</td
								>
								<td
									class:aboveThreshold={p.Body_Temperature >=
										p.Thresholds.BodyTemperatureThreshold.high ||
										p.Body_Temperature <= p.Thresholds.BodyTemperatureThreshold.low}
									>{p.Body_Temperature}</td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>
	</div>
</ProtectedLayout>

<style>
	th {
		cursor: pointer;
	}

	.highlighted {
		color: orangered;
	}

	#oneLine {
		white-space: nowrap;
		overflow: hidden;
	}

	.aboveThreshold {
		background-color: rgba(255, 0, 0, 0.6);
	}
</style>
