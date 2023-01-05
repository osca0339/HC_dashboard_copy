import type { PageServerLoad } from './$types';
import { patients } from '$db/Collections/patients';
import { patientData } from '$db/Collections/patientData';
import { ObjectId } from 'mongodb';

export const load: PageServerLoad = async function ({ params }) {
	const patientsArray = await patients.find({ _id: new ObjectId(params.patientId) }).toArray();
	const patientDataArray = await patientData.find({ patientId: params.patientId }).toArray();

	const formatPatients = patientsArray.map((p) => {
		return {
			id: p._id.toString(),
			name: p.name,
			age: p.age,
			sex: p.sex,
			weight: p.weight,
			height: p.height
		};
	});

	const formatPatientData = patientDataArray.map((p) => {
		return {
			id: p._id.toString(),
			patientId: p.patientId,
			Date: p.Date,
			Breathing_Rate: p.BreathingRate,
			Breathing_Depth: p.BreathingDepth,
			SPO2: p.SPO2,
			Coughing_Count: p.CaughingCount, //change name on mongo
			Heart_Rate: p.HeartRate,
			HRV: p.HRV,
			Arythmia_Count: p.ArythmiaCount,
			Body_Temperature: p.BodyTemperature
		};
	});

	return {
		patients: formatPatients,
		patientData: formatPatientData,
		patientId: params.patientId,
		HCPId: params.HCPId
	};
};
