import { browser } from '$app/environment';
import { writable } from 'svelte/store';

//we use the browser to avoid erros if this is run before the server side render
if (browser) {
	var selectedHCPId = localStorage.getItem('mongoId');
}

export const storeHCPId = writable(selectedHCPId);

if (browser) {
	storeHCPId.subscribe((value) => {
		localStorage.setItem('mongoId', value);
	});
}
