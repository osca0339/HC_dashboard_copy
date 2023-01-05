import { browser } from '$app/environment';
import { writable } from 'svelte/store';

//we use the browser to avoid erros if this is run before the server side render
if (browser) {
	var selectedPatient = localStorage.getItem('patient');
}

export const storePatient = writable(selectedPatient);

if (browser) {
	storePatient.subscribe((value) => {
		localStorage.setItem('patient', value);
	});
}
