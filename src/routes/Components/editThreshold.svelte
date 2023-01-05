<script lang="ts">
	export let thresholds;
	export let chosenValue;
</script>

<h3>Edit thresholds</h3>
<form method="POST">
	{#if chosenValue == 'BreathingRate'}
		<p>BreathingRate-UP 🔼</p>
		<input
			bind:value={thresholds.BreathingRateThreshold.high}
			type="number"
			name="BreathingRate-UP"
		/>
		<p>BreathingRate-LO 🔽</p>
		<input
			bind:value={thresholds.BreathingRateThreshold.low}
			type="number"
			name="BreathingRate-LO"
		/>

	{:else if chosenValue == 'BreathingDepth'}
		<p>BreathingDepth-UP 🔼</p>
		<input
			bind:value={thresholds.BreathingDepthThreshold.high}
			type="number"
			name="BreathingDepth-UP"
		/>
		<p>BreathingDepth-LO 🔽</p>
		<input
			bind:value={thresholds.BreathingDepthThreshold.low}
			type="number"
			name="BreathingDepth-LO"
		/>

	{:else if chosenValue == 'SPO2'}
		<p>SPO2-UP 🔼</p>
		<input 
			bind:value={thresholds.SPO2Threshold.high} 
			type="number" 
			name="SPO2-UP" 
	/>
		<p>SPO2-LO 🔽</p>
		<input 
			bind:value={thresholds.SPO2Threshold.low} 
			type="number" 
			name="SPO2-LO" 
	/>

	{:else if chosenValue == 'CoughingCount'}
		<p>CoughingCount-UP 🔼</p>
		<input
			bind:value={thresholds.CaughingCountThreshold.high}
			type="number"
			name="CaughingCount-UP"
		/>
		<p>CoughingCount-LO 🔽</p>
		<input
			bind:value={thresholds.CaughingCountThreshold.low}
			type="number"
			name="CaughingCount-LO"
		/>
	{:else if chosenValue == 'HeartRate'}
		<p>HeartRate-UP 🔼</p>
		<input bind:value={thresholds.HeartRateThreshold.high} type="number" name="HeartRate-UP" />
		<p>HeartRate-LO 🔽</p>
		<input bind:value={thresholds.HeartRateThreshold.low} type="number" name="HeartRate-LO" />
	{:else if chosenValue == 'HRV'}
		<p>HRV-UP 🔼</p>
		<input bind:value={thresholds.HRVThreshold.high} type="number" name="HRV-UP" />
		<p>HRV-LO 🔽</p>
		<input bind:value={thresholds.HRVThreshold.low} type="number" name="HRV-LO" />
	{:else if chosenValue == 'ArythmiaCount'}
		<p>ArythmiaCount-UP 🔼</p>
		<input
			bind:value={thresholds.ArythmiaCountThreshold.high}
			type="number"
			name="ArythmiaCount-UP"
		/>
		<p>ArythmiaCount-LO 🔽</p>
		<input
			bind:value={thresholds.ArythmiaCountThreshold.low}
			type="number"
			name="ArythmiaCount-LO"
		/>
	{:else if chosenValue == 'BodyTemperature'}
		<p>BodyTemperature-UP 🔼</p>
		<input
			bind:value={thresholds.BodyTemperatureThreshold.high}
			type="number"
			name="BodyTemperature-UP"
		/>
		<p>BodyTemperature-LO 🔽</p>
		<input
			bind:value={thresholds.BodyTemperatureThreshold.low}
			type="number"
			name="BodyTemperature-LO"
		/>
	{/if}

	<button class="btn btn-outline-primary">Update</button>
</form>
