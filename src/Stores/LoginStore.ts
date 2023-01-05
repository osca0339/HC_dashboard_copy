import { browser } from '$app/environment';
import { writable } from 'svelte/store';



//we use the browser to avoid erros if this is run before the server side render
if (browser) {
	var localUser = localStorage.getItem('storeUser');
}

export const storeUser = writable(localUser);

if (browser) {
	storeUser.subscribe((value) => {
		localStorage.setItem('storeUser', value);
	});
}
