<script lang="ts">
	import { storeUser } from '$protectedUser';
	import { storeHCPId } from '$protectedMongoId';
	import { goto } from '$app/navigation';

	function logout() {
		storeUser.set('');
		storeHCPId.set('');
		goto('/');
	}
</script>

<nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background-color: grey;">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">HC Dashboard</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNavAltMarkup"
			aria-controls="navbarNavAltMarkup"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
			<div class="navbar-nav">
				<a class="nav-link" href="/patientsOverview/{$storeHCPId}">Patients</a>
				<a class="nav-link" href="/addPatient">Add patient</a>
			</div>
			{#if $storeUser != ''}
				<ul class="navbar-nav ms-auto">
					<button class="btn btn-outline-primary" style="width: 100px" on:click={() => logout()}
						>Log out</button
					>
				</ul>
			{/if}
		</div>
	</div>
</nav>
