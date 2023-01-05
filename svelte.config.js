import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$db: './src/db',
			$protectedUser: 'src/Stores/LoginStore',
			$protectedMongoId: 'src/Stores/MongoId',
			$protectedPatientArray: 'src/Stores/patientArrayStore',
			$comps: 'src/Comps/editThreshold.svelte'
		}
	}
};

export default config;
