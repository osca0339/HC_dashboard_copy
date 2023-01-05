<script lang="ts">
	import { storeUser } from '$protectedUser';
	import { json } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import Navbar from './navbar.svelte';
	import ProtectedLayout from './ProtectedLayout.svelte';
	let uid = '';

	onMount(async () => {
		let userData = $storeUser;
		uid = JSON.parse(userData).uid;
	});
</script>

<Navbar />
<ProtectedLayout>
	<div class="container-fluid" style="margin-top: 80px">
		<h1>Add a patient</h1>
		<h5>Send an e-mail invite</h5>
		<form method="POST">
			<input type="string" name="email" />
			<input type="hidden" name="uid" bind:value={uid} />

			<button class="btn btn-outline-primary">Send verification email</button>
		</form>
	</div>
</ProtectedLayout>
