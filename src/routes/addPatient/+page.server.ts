import type { PageServerLoad } from '.svelte-kit/types/src/routes/$types';
import type { Actions } from '@sveltejs/kit';
import { emailtemplate } from '$env/static/private';
import { emailKey } from '$env/static/private';
import { emailPrivateKey } from '$env/static/private';
import { patientCache } from '$db/Collections/patientCache';
import { storeUser } from '$protectedUser';
import { patients } from '$db/Collections/patients';
import emailjs from '@emailjs/nodejs';
import { healthcareProfessionals } from '$db/Collections/healthcareProfessionals';

function sendEmail(data: Record<string, unknown> | undefined) {
	emailjs
		.send('nextcloud_email', emailtemplate, data, {
			publicKey: emailKey,
			privateKey: emailPrivateKey // optional, highly recommended for security reasons
		})
		.then(
			(response) => {
				console.log('SUCCESS!', response.status, response.text);
			},
			(err) => {
				console.log('FAILED...', err);
			}
		);
}

async function emailExist(email: string, mongoId: string) {
	let arrayCacheEmail = await patientCache.find({ pendingEmail: email }).toArray();
	let arrayPatientEmail = await patients
		.find({ email: email, assingedHealthCarePro: mongoId })
		.toArray();
	if (arrayCacheEmail.length == 0 && arrayPatientEmail.length == 0) {
		return true;
	}
	console.log('Email already in cache or already assigned');
	return false;
}

async function hasAssingedHCP(email, mongoId) {
	let array = await patients.findOne({ email: email });
	console.log('mongo', mongoId);
	console.log('array', array);
	if (array == null) {
		return false;
	}
	return true;
}

export const actions: Actions = {
	//we use mongo as a cache for pending email confirmations
	default: async ({ request }) => {
		const form = await request.formData();
		const email = form.get('email');
		const uid = form.get('uid');
		const hcPro = await healthcareProfessionals.findOne({ firebaseUID: uid });
		let hasHCP = await hasAssingedHCP(email, hcPro._id);
		const emailexist = await emailExist(email, hcPro._id);
		if (emailexist) {
			let returnId = await patientCache.insertOne({
				pendingEmail: email,
				hcPro: uid,
				hasHCP: hasHCP
			});
			let Id = returnId.insertedId.toString();

			var data = {
				link: 'http://dashboard.stepuphealth.dk/registerPatient/' + Id, //change link, because it is different in production
				user_email: email
			};
			sendEmail(data);
		}
	}
};
