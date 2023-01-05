import type { PageServerLoad } from './$types';
import { Fireapi } from '$env/static/private';
import { healthcareProfessionals } from '$db/Collections/healthcareProfessionals';

export const load: PageServerLoad = async function () {
	const healthcareProfessionalsList = await healthcareProfessionals.find({}).toArray();

	const formatHealthcareProfessionals = healthcareProfessionalsList.map((hp) => {
		return {
			id: hp._id.toString(),
			firebaseUID: hp.firebaseUID
		};
	});

	return {
		healthcareProfessionals: formatHealthcareProfessionals,
		api: Fireapi
	};
};
