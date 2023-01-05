<script lang="ts">
	import { storeHCPId } from '$protectedMongoId';
	import { onMount } from 'svelte';
	import { dataset_dev } from 'svelte/internal';
	import { fade } from 'svelte/transition';
	import { LayerCake, Svg, Html } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';
	import { timeParse, timeFormat } from 'd3-time-format';
	import { format, precisionFixed } from 'd3-format';
	import Modal from 'svelte-simple-modal';
	import MultiLine from './Graph/MultiLine.svelte';
	import AxisX from './Graph/AxisX.svelte';
	import AxisY from './Graph/AxisY.svelte';
	import Labels from './Graph/GroupLables.svelte';
	import SharedTooltip from './Graph/SharedTooltip.percent-range.svelte';
	import ThresholdLine from './Graph/ThresholdLine.svelte';
	import ModalContent from './modalContent.svelte';
	import ProtectedLayout from './ProtectedLayout.svelte';
	import Navbar from './navbar.svelte';
	export let patientData: any[] = [];
	export var patientId: string;
	export let thresholds: any;
	const patientName = patientData[0].name;
	let startDate: Date = new Date('2000-11-10');
	let endDate: Date = new Date('3000-11-10');
	$: formatedStart = new Date(startDate);
	$: formatedEnd = new Date(endDate);
	let compareStartDate: Date = new Date('2000-11-10');
	let compareEndDate: Date = new Date(Date.now());
	$: formatedCompareStart = new Date(compareStartDate);
	$: formatedCompareEnd = new Date(compareEndDate);
	let showCompare = false;
	let compareArray: [] = [];
	let chosenThresholdValue = '';

	let showInputFields = false;

	const baseThreshold = [
		[
			{
				value: 15,
				Date: new Date('2022-09-30T09:21:19.418Z')
			},
			{
				value: 15,
				Date: new Date('2022-11-01T09:21:19.418Z')
			}
		],
		[
			{
				value: 60,
				Date: new Date('2022-09-30T09:21:19.418Z')
			},
			{
				value: 60,
				Date: new Date('2022-11-01T09:21:19.418Z')
			}
		]
	];

	var formatedThredsholds = [];
	Object.entries(thresholds).forEach(([key, value], index) => {
		formatedThredsholds.push([
			[
				{ value: value.high, Date: compareStartDate },
				{ value: value.high, Date: new Date(compareEndDate) }
			]
		]);
		formatedThredsholds[index].push([
			{ value: value.low, Date: compareStartDate },
			{ value: value.low, Date: new Date(compareEndDate) }
		]);
	});
	function compareData() {
		compareArray = [];
		patientData.forEach((p) => {
			if (
				p.Date.getTime() >= formatedCompareStart.getTime() &&
				p.Date.getTime() <= formatedCompareEnd.getTime()
			) {
				compareArray.push(p);
				compareArray = compareArray;
			}
		});
	}

	let showGraph = false;
	function toggleGraph() {
		showGraph = !showGraph;
	}
	var filteredPatient: any[] = [];
	function getDataByDates() {
		filteredPatient = [];
		patientData.forEach((p) => {
			if (p.Date.getTime() <= formatedEnd.getTime() && p.Date.getTime() >= formatedStart.getTime())
				filteredPatient.push(p);
		});
	}
	filteredPatient = patientData;
	$: test = filteredPatient.map((p) => {
		return {
			BreathingRate: p.BreathingRate,
			BreathingDepth: p.BreathingDepth,
			SPO2: p.SPO2,
			CaughingCount: p.CoughingCount,
			HeartRate: p.HeartRate,
			HRV: p.HRV,
			ArythmiaCount: p.ArythmiaCount,
			BodyTemperature: p.BodyTemperature,
			Date: p.Date
		};
	});
	//graph start here
	var data = filteredPatient.map((p) => {
		return {
			BreathingRate: p.BreathingRate,
			BreathingDepth: p.BreathingDepth,
			SPO2: p.SPO2,
			CaughingCount: p.CaughingCount,
			HeartRate: p.HeartRate,
			HRV: p.HRV,
			ArythmiaCount: p.ArythmiaCount,
			BodyTemperature: p.BodyTemperature,
			Date: p.Date
		};
	});
	$: data = test;
	const xKey = 'Date';
	const yKey = 'value';
	const zKey = 'Data';
	const seriesNames = Object.keys(data[0]).filter((d) => d !== xKey);
	const seriesColors = ['#ffe4b8', '#ffb3c0', '#ff7ac7', '#ff00cc'];
	const parseDate = timeParse('%Y-%m-%d');
	var titles = [
		'Breathing Rate (avg/min)',
		'BreathingDepth (avg%/min)',
		'Oxygen (SPO2) (avg/min)',
		'Coughing count (session)',
		'HeartRate (avg/min)',
		'HRV (avg)',
		'Arythmia count (during session)',
		'BodyTemperature (avg/session)'
	];
	/* --------------------------------------------
	 * Create a "long" format that is a grouped series of data points
	 * Layer Cake uses this data structure and the key names
	 * set in xKey, yKey and zKey to map your data into each scale.
	 */
	$: dataLong = seriesNames.map((key) => {
		return {
			[zKey]: key,
			values: data.map((d) => {
				d[xKey] = typeof d[xKey] === 'string' ? parseDate(d[xKey]) : d[xKey]; // Conditional required for sapper
				return {
					[yKey]: +d[key],
					[xKey]: d[xKey],
					[zKey]: key
				};
			})
		};
	});
	/* --------------------------------------------
	 * Make a flat array of the `values` of our nested series
	 * we can pluck the field set from `yKey` from each item
	 * in the array to measure the full extents
	 */
	const flatten = (data: any[]) =>
		data.reduce((memo, group) => {
			return memo.concat(group.values);
		}, []);
	const formatTickX = timeFormat('%b. %e');
	const formatTickY = (d) => format(`.${precisionFixed(d)}s`)(d);
</script>

<Navbar />
<ProtectedLayout>
	<div class="container-fluid" transition:fade>
		<div class="bg-dark text-light" style="margin-top: 80px">
			{#if showInputFields}
				<div class="row">
					<div class="col-sm">
						<div class="row">
							<div class="col-sm-3">
								<div class="form-group">
									<label>Start date</label>
									<input
										class="form-control"
										type="date"
										style="width: 200px"
										bind:value={startDate}
									/><br />
									<label>End date</label>
									<input
										class="form-control"
										type="date"
										style="width: 200px"
										bind:value={endDate}
									/><br />
									<button class="btn btn-outline-primary" on:click={getDataByDates}
										>Show data for dates</button
									>
								</div>
							</div>
							{#if !showGraph}
								<div class="col-sm-3">
									<div class="form-group">
										<input type="checkbox" class="form-check-input" bind:checked={showCompare} />
										<label class="form-check-label">Toggle comparison</label>
									</div>
								</div>
							{/if}
							<div class="col-sm-6">
								{#if showCompare && !showGraph}
									<div class="form-group" transition:fade>
										<label>Start date</label>
										<input
											class="form-control"
											type="date"
											style="width: 200px"
											bind:value={compareStartDate}
										/><br />
										<label>End date</label>
										<input
											class="form-control"
											type="date"
											style="width: 200px"
											bind:value={compareEndDate}
										/>
										<br />
										<button class="btn btn-outline-primary" on:click={compareData}>Compare</button>
									</div>
								{/if}
							</div>
						</div>
						<br />
						<button class="btn btn-outline-primary" on:click={toggleGraph}>Toggle Graph-view</button
						>
						<br />
						<br />
					</div>
				</div>
			{/if}
			<span
				id="arrow"
				class="order-icon"
				style="cursor: pointer"
				on:click={() => (showInputFields = !showInputFields)}
				>{@html showInputFields ? '&#9651' : '&#9661;'} Date select/Compare/Graph view
			</span>

			{#if !showGraph}
				<div class="row" transition:fade>
					<div class="col-sm">
						<table class="table table-bordered table-dark">
							<thead>
								<tr>
									<th style="white-space: pre">{patientName}</th>
									{#each filteredPatient as patient}
										<th><p class="vertical">{patient.Date.toLocaleString().split(' ')[0]}</p></th>
										<!-- Getting the date for the session -->
									{/each}
								</tr>
							</thead>
							<tbody>
								<tr>
									<th
										>Breathing Rate <br />(avg/min) <Modal
											><ModalContent
												{thresholds}
												chosenValue={(chosenThresholdValue = 'BreathingRate')}
											/></Modal
										></th
									>
									{#each filteredPatient as patient}
										<th
											class:aboveThreshold={patient.BreathingRate >=
												thresholds.BreathingRateThreshold.high ||
												patient.BreathingRate <= thresholds.BreathingRateThreshold.low}
											><div style="height: 55px">{patient.BreathingRate}</div></th
										>
									{/each}
								</tr>
								<tr>
									<th
										>Breathing Depth <br />(avg%/min) <Modal
											><ModalContent
												{thresholds}
												chosenValue={(chosenThresholdValue = 'BreathingDepth')}
											/></Modal
										></th
									>
									{#each filteredPatient as patient}
										<th
											class:aboveThreshold={patient.BreathingDepth >=
												thresholds.BreathingDepthThreshold.high ||
												patient.BreathingDepth <= thresholds.BreathingDepthThreshold.low}
											><div style="height: 55px">{patient.BreathingDepth}</div></th
										>
									{/each}
								</tr>
								<tr>
									<th
										>Oxygen (SPO2) <br />(avg/min) <Modal
											><ModalContent
												{thresholds}
												chosenValue={(chosenThresholdValue = 'SPO2')}
											/></Modal
										></th
									>
									{#each filteredPatient as patient}
										<th
											class:aboveThreshold={patient.SPO2 >= thresholds.SPO2Threshold.high ||
												patient.SPO2 <= thresholds.SPO2Threshold.low}
											><div style="height: 55px">{patient.SPO2}</div></th
										>
									{/each}
								</tr>
								<tr>
									<th
										>Coughing count <br />(session) <Modal
											><ModalContent
												{thresholds}
												chosenValue={(chosenThresholdValue = 'CoughingCount')}
											/></Modal
										></th
									>
									{#each filteredPatient as patient}
										<th
											class:aboveThreshold={patient.CoughingCount >=
												thresholds.CaughingCountThreshold.high ||
												patient.CoughingCount <= thresholds.CaughingCountThreshold.low}
											><div style="height: 55px">{patient.CoughingCount}</div></th
										>
									{/each}
								</tr>
								<tr>
									<th
										>Heart Rate <br />(avg/min) <Modal
											><ModalContent
												{thresholds}
												chosenValue={(chosenThresholdValue = 'HeartRate')}
											/></Modal
										></th
									>
									{#each filteredPatient as patient}
										<th
											class:aboveThreshold={patient.HeartRate >=
												thresholds.HeartRateThreshold.high ||
												patient.HeartRate <= thresholds.HeartRateThreshold.low}
											><div style="height: 55px">{patient.HeartRate}</div></th
										>
									{/each}
								</tr>
								<tr>
									<th
										>HRV <br />(avg) <Modal
											><ModalContent
												{thresholds}
												chosenValue={(chosenThresholdValue = 'HRV')}
											/></Modal
										></th
									>
									{#each filteredPatient as patient}
										<th
											class:aboveThreshold={patient.HRV >= thresholds.HRVThreshold.high ||
												patient.HRV <= thresholds.HRVThreshold.low}
											><div style="height: 55px">{patient.HRV}</div></th
										>
									{/each}
								</tr>
								<tr>
									<th
										>Arythmia count <br />(during session) <Modal
											><ModalContent
												{thresholds}
												chosenValue={(chosenThresholdValue = 'ArythmiaCount')}
											/></Modal
										></th
									>
									{#each filteredPatient as patient}
										<th
											class:aboveThreshold={patient.ArythmiaCount >=
												thresholds.ArythmiaCountThreshold.high ||
												patient.ArythmiaCount <= thresholds.ArythmiaCountThreshold.low}
											><div style="height: 55px">{patient.ArythmiaCount}</div></th
										>
									{/each}
								</tr>
								<tr>
									<th
										>BodyTemperature <br />(avg/session) <Modal
											><ModalContent
												{thresholds}
												chosenValue={(chosenThresholdValue = 'BodyTemperature')}
											/></Modal
										></th
									>
									{#each filteredPatient as patient}
										<th
											class:aboveThreshold={patient.BodyTemperature >=
												thresholds.BodyTemperatureThreshold.high ||
												patient.BodyTemperature <= thresholds.BodyTemperatureThreshold.low}
											><div style="height: 55px">{patient.BodyTemperature}</div></th
										>
									{/each}
								</tr>
							</tbody>
						</table>
					</div>
					{#if showCompare == true && compareArray.length != 0}
						<div class="col-sm">
							<table class="table table-bordered table-dark">
								<thead>
									<tr>
										{#each compareArray as patient}
											<th><p class="vertical">{patient.Date.toLocaleString().split(' ')[0]}</p></th>
										{/each}
									</tr>
								</thead>
								<tbody>
									<tr>
										{#each compareArray as patient}
											<th
												class:aboveThreshold={patient.BreathingRate >=
													thresholds.BreathingRateThreshold.high ||
													patient.BreathingRate <= thresholds.BreathingRateThreshold.low}
												><div style="height: 55px">
													{patient.BreathingRate}
												</div></th
											>
										{/each}
									</tr>
									<tr>
										{#each compareArray as patient}
											<th
												class:aboveThreshold={patient.BreathingDepth >=
													thresholds.BreathingDepthThreshold.high ||
													patient.BreathingDepth <= thresholds.BreathingDepthThreshold.low}
												><div style="height: 55px">{patient.BreathingDepth}</div></th
											>
										{/each}
									</tr>
									<tr>
										{#each compareArray as patient}
											<th
												class:aboveThreshold={patient.SPO2 >= thresholds.SPO2Threshold.high ||
													patient.SPO2 <= thresholds.SPO2Threshold.low}
												><div style="height: 55px">{patient.SPO2}</div></th
											>
										{/each}
									</tr>
									<tr>
										{#each compareArray as patient}
											<th
												class:aboveThreshold={patient.CoughingCount >=
													thresholds.CaughingCountThreshold.high ||
													patient.CoughingCount <= thresholds.CaughingCountThreshold.low}
												><div style="height: 55px">{patient.CoughingCount}</div></th
											>
										{/each}
									</tr>
									<tr>
										{#each compareArray as patient}
											<th
												class:aboveThreshold={patient.HeartRate >=
													thresholds.HeartRateThreshold.high ||
													patient.HeartRate <= thresholds.HeartRateThreshold.low}
												><div style="height: 55px">{patient.HeartRate}</div></th
											>
										{/each}
									</tr>
									<tr>
										{#each compareArray as patient}
											<th
												class:aboveThreshold={patient.HRV >= thresholds.HRVThreshold.high ||
													patient.HRV <= thresholds.HRVThreshold.low}
												><div style="height: 55px">{patient.HRV}</div></th
											>
										{/each}
									</tr>
									<tr>
										{#each compareArray as patient}
											<th
												class:aboveThreshold={patient.ArythmiaCount >=
													thresholds.ArythmiaCountThreshold.high ||
													patient.ArythmiaCount <= thresholds.ArythmiaCountThreshold.low}
												><div style="height: 55px">{patient.ArythmiaCount}</div></th
											>
										{/each}
									</tr>
									<tr>
										{#each compareArray as patient}
											<th
												class:aboveThreshold={patient.BodyTemperature >=
													thresholds.BodyTemperatureThreshold.high ||
													patient.BodyTemperature <= thresholds.BodyTemperatureThreshold.low}
												><div style="height: 55px">{patient.BodyTemperature}</div></th
											>
										{/each}
									</tr>
								</tbody>
							</table>
						</div>
					{/if}
				</div>
			{/if}

			{#if showGraph}
				<div class="graphCanvas" transition:fade>
					<LayerCake
						padding={{ top: 7, right: 10, bottom: 20, left: 25 }}
						x={xKey}
						y={yKey}
						z={zKey}
						yDomain={[0, null]}
						zScale={scaleOrdinal()}
						zRange={seriesColors}
						flatData={flatten(dataLong)}
						data={dataLong}
					>
						{#each dataLong as graph, i}
							<div class="chart-container">
								<h1 style="color: white;">{titles[i]}</h1>

								<LayerCake
									padding={{ top: 7, right: 10, bottom: 20, left: 25 }}
									x={xKey}
									y={yKey}
									z={zKey}
									yDomain={[0, null]}
									zScale={scaleOrdinal()}
									zRange={seriesColors}
									flatData={flatten([dataLong[i]])}
									data={[dataLong[i]]}
								>
									<Svg>
										<ThresholdLine thresholds={formatedThredsholds[i]} />
										<MultiLine />
										<AxisY ticks={4} formatTick={formatTickY} />
									</Svg>
								</LayerCake>
							</div>
						{/each}

						<Svg>
							<AxisX
								gridlines={false}
								ticks={data.map((d) => d[xKey]).sort((a, b) => a - b)}
								formatTick={formatTickX}
								snapTicks={true}
								tickMarks={true}
							/>
						</Svg>
						<Html>
							<SharedTooltip formatTitle={formatTickX} dataset={data} />
						</Html>
					</LayerCake>
				</div>
			{/if}
		</div>
	</div>
</ProtectedLayout>

<style>
	/*
	  The wrapper div needs to have an explicit width and height in CSS.
	  It can also be a flexbox child or CSS grid element.
	  The point being it needs dimensions since the <LayerCake> element will
	  expand to fill it.
	*/
	.aboveThreshold {
		background-color: rgba(255, 0, 0, 0.6);
	}

	.graphCanvas {
		width: 100%;
		height: 1210px;
		margin-bottom: 50px;
	}
	.chart-container {
		width: 100%;
		height: 100px;
		margin-bottom: 50px;
	}
	.title {
		color: rgb(223, 223, 223);
		font-size: 100%;
	}
	.column {
		float: left;
		width: 50%;
	}
	/* Clear floats after the columns */
	.row:after {
		content: '';
		display: table;
		clear: both;
	}

	.vertical {
		writing-mode: vertical-rl;
		transform: rotate(180deg);
	}
</style>
