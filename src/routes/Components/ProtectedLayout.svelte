<script lang="ts">
	import { goto } from '$app/navigation';
	import { storeUser } from '$protectedUser';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($storeUser == '') {
			goto('/');
		}
	});
</script>

{#if $storeUser}
	<slot />
{:else}
	<div class="max-w-xl mx-auto">Loading...</div>
{/if}
