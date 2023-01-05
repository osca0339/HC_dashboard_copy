import type { Actions, PageServerLoad } from './$types';
import { patientData } from '$db/Collections/patientData';
import { patients } from '$db/Collections/patients';
import { ObjectId } from 'mongodb';

let paramPatient: string;
let paramUser: string;

export const load: PageServerLoad = async function ({ params }) {
	const data = await patientData.find({ patientId: params.patientId }).sort({ Date: 1 }).toArray();
	const patient = await patients.find({ _id: ObjectId(params.patientId) }).toArray();

	let defaultThresholds = [
		{
			BreathingRateThreshold: {
				high: 30,
				low: 1
			},
			BreathingDepthThreshold: {
				high: 30,
				low: 1
			},
			SPO2Threshold: {
				high: 30,
				low: 1
			},
			CoughingCountThreshold: {
				high: 30,
				low: 1
			},
			HeartRateThreshold: {
				high: 30,
				low: 1
			},
			HRVThreshold: {
				high: 30,
				low: 1
			},
			ArythmiaCountThreshold: {
				high: 30,
				low: 1
			},
			BodyTemperatureThreshold: {
				high: 30,
				low: 1
			}
		}
	];

	const patientArray = patient.map((p) => {
		let thresholds;
		let exist = p.HCProThresholds.find((value) => {
			thresholds = value;
			return value.HCPro == params.HCPId;
		});

		if (exist) {
			return {
				id: p._id.toString(),
				name: p.name,
				age: p.age,
				sex: p.sex,
				weight: p.weight,
				height: p.height,
				HCProThresholds: thresholds
			};
		}
	});

	const newObject = {
		name: ''
	};

	patientArray.forEach((p) => {
		if (p.id == params.patientId) {
			newObject.name = p.name;
		}
	});

	paramPatient = params.patientId;
	paramUser = params.HCPId;

	const patientDataArray = data.map((p) => {
		return {
			id: p.patientId,
			name: newObject.name,
			BreathingRate: p.BreathingRate,
			BreathingDepth: p.BreathingDepth,
			SPO2: p.SPO2,
			CoughingCount: p.CaughingCount,
			HeartRate: p.HeartRate,
			HRV: p.HRV,
			ArythmiaCount: p.ArythmiaCount,
			BodyTemperature: p.BodyTemperature,
			Date: new Date(p.Date)
		};
	});

	function setToDefaultThreshold() {
		patientArray.forEach((p) => {
			if (
				p.HCProThresholds.Thresholds.BreathingRateThreshold.high == null ||
				p.HCProThresholds.Thresholds.BreathingRateThreshold.high == ''
			) {
				p.HCProThresholds.Thresholds.BreathingRateThreshold.high =
					defaultThresholds[0].BreathingRateThreshold.high;
			}
			if (
				p.HCProThresholds.Thresholds.BreathingRateThreshold.low == null ||
				p.HCProThresholds.Thresholds.BreathingRateThreshold.low == ''
			) {
				p.HCProThresholds.Thresholds.BreathingRateThreshold.low =
					defaultThresholds[0].BreathingRateThreshold.low;
			}
			if (
				p.HCProThresholds.Thresholds.BreathingDepthThreshold.high == null ||
				p.HCProThresholds.Thresholds.BreathingDepthThreshold.high == ''
			) {
				p.HCProThresholds.Thresholds.BreathingDepthThreshold.high =
					defaultThresholds[0].BreathingDepthThreshold.high;
			}
			if (
				p.HCProThresholds.Thresholds.BreathingDepthThreshold.low == null ||
				p.HCProThresholds.Thresholds.BreathingDepthThreshold.low == ''
			) {
				p.HCProThresholds.Thresholds.BreathingDepthThreshold.low =
					defaultThresholds[0].BreathingDepthThreshold.low;
			}
			if (
				p.HCProThresholds.Thresholds.SPO2Threshold.high == null ||
				p.HCProThresholds.Thresholds.SPO2Threshold.high == ''
			) {
				p.HCProThresholds.Thresholds.SPO2Threshold.high = defaultThresholds[0].SPO2Threshold.high;
			}
			if (
				p.HCProThresholds.Thresholds.SPO2Threshold.low == null ||
				p.HCProThresholds.Thresholds.SPO2Threshold.low == ''
			) {
				p.HCProThresholds.Thresholds.SPO2Threshold.low = defaultThresholds[0].SPO2Threshold.low;
			}
			if (
				p.HCProThresholds.Thresholds.CaughingCountThreshold.high == null ||
				p.HCProThresholds.Thresholds.CaughingCountThreshold.high == ''
			) {
				p.HCProThresholds.Thresholds.CaughingCountThreshold.high =
					defaultThresholds[0].CoughingCountThreshold.high;
			}
			if (
				p.HCProThresholds.Thresholds.CaughingCountThreshold.low == null ||
				p.HCProThresholds.Thresholds.CaughingCountThreshold.low == ''
			) {
				p.HCProThresholds.Thresholds.CaughingCountThreshold.low =
					defaultThresholds[0].CoughingCountThreshold.low;
			}
			if (
				p.HCProThresholds.Thresholds.HeartRateThreshold.high == null ||
				p.HCProThresholds.Thresholds.HeartRateThreshold.high == ''
			) {
				p.HCProThresholds.Thresholds.HeartRateThreshold.high =
					defaultThresholds[0].HeartRateThreshold.high;
			}
			if (
				p.HCProThresholds.Thresholds.HeartRateThreshold.low == null ||
				p.HCProThresholds.Thresholds.HeartRateThreshold.low == ''
			) {
				p.HCProThresholds.Thresholds.HeartRateThreshold.low =
					defaultThresholds[0].HeartRateThreshold.low;
			}
			if (
				p.HCProThresholds.Thresholds.HRVThreshold.high == null ||
				p.HCProThresholds.Thresholds.HRVThreshold.high == ''
			) {
				p.HCProThresholds.Thresholds.HRVThreshold.high = defaultThresholds[0].HRVThreshold.high;
			}
			if (
				p.HCProThresholds.Thresholds.HRVThreshold.low == null ||
				p.HCProThresholds.Thresholds.HRVThreshold.low == ''
			) {
				p.HCProThresholds.Thresholds.HRVThreshold.low = defaultThresholds[0].HRVThreshold.low;
			}
			if (
				p.HCProThresholds.Thresholds.ArythmiaCountThreshold.high == null ||
				p.HCProThresholds.Thresholds.ArythmiaCountThreshold.high == ''
			) {
				p.HCProThresholds.Thresholds.ArythmiaCountThreshold.high =
					defaultThresholds[0].ArythmiaCountThreshold.high;
			}
			if (
				p.HCProThresholds.Thresholds.ArythmiaCountThreshold.low == null ||
				p.HCProThresholds.Thresholds.ArythmiaCountThreshold.low == ''
			) {
				p.HCProThresholds.Thresholds.ArythmiaCountThreshold.low =
					defaultThresholds[0].ArythmiaCountThreshold.low;
			}
			if (
				p.HCProThresholds.Thresholds.BodyTemperatureThreshold.high == null ||
				p.HCProThresholds.Thresholds.BodyTemperatureThreshold.high == ''
			) {
				p.HCProThresholds.Thresholds.BodyTemperatureThreshold.high =
					defaultThresholds[0].BodyTemperatureThreshold.high;
			}
			if (
				p.HCProThresholds.Thresholds.BodyTemperatureThreshold.low == null ||
				p.HCProThresholds.Thresholds.BodyTemperatureThreshold.low == ''
			) {
				p.HCProThresholds.Thresholds.BodyTemperatureThreshold.low =
					defaultThresholds[0].BodyTemperatureThreshold.low;
			}
		});
	}
	setToDefaultThreshold();

	return {
		patient: patientArray,
		patientData: patientDataArray,
		id: params.patientId
	};
};

async function updateBreathingRateThreshold(BreathingRateUP: number, BreathingRateLO: number) {
	patients.updateOne(
		{
			_id: new ObjectId(paramPatient),
			HCProThresholds: { $elemMatch: { HCPro: paramUser } }
		},
		{
			$set: {
				'HCProThresholds.$.Thresholds.BreathingRateThreshold.high': BreathingRateUP,
				'HCProThresholds.$.Thresholds.BreathingRateThreshold.low': BreathingRateLO
			}
		}
	);
}

async function updateBreathingDepthThreshold(BreathingDepthUP: number, BreathingDepthLO: number) {
	patients.updateOne(
		{
			_id: new ObjectId(paramPatient),
			HCProThresholds: { $elemMatch: { HCPro: paramUser } }
		},
		{
			$set: {
				'HCProThresholds.$.Thresholds.BreathingDepthThreshold.high': BreathingDepthUP,
				'HCProThresholds.$.Thresholds.BreathingDepthThreshold.low': BreathingDepthLO
			}
		}
	);
}

async function updateSPO2Threshold(SPO2UP: number, SPO2LO: number) {
	patients.updateOne(
		{
			_id: new ObjectId(paramPatient),
			HCProThresholds: { $elemMatch: { HCPro: paramUser } }
		},
		{
			$set: {
				'HCProThresholds.$.Thresholds.SPO2Threshold.high': SPO2UP,
				'HCProThresholds.$.Thresholds.SPO2Threshold.low': SPO2LO
			}
		}
	);
}
async function updateCaughingCountThreshold(CaughingCountUP: number, CaughingCountLO: number) {
	patients.updateOne(
		{
			_id: new ObjectId(paramPatient),
			HCProThresholds: { $elemMatch: { HCPro: paramUser } }
		},
		{
			$set: {
				'HCProThresholds.$.Thresholds.CaughingCountThreshold.high': CaughingCountUP,
				'HCProThresholds.$.Thresholds.CaughingCountThreshold.low': CaughingCountLO
			}
		}
	);
}
async function updateHeartRateThreshold(HeartRateUP: number, HeartRateLO: number) {
	patients.updateOne(
		{
			_id: new ObjectId(paramPatient),
			HCProThresholds: { $elemMatch: { HCPro: paramUser } }
		},
		{
			$set: {
				'HCProThresholds.$.Thresholds.HeartRateThreshold.high': HeartRateUP,
				'HCProThresholds.$.Thresholds.HeartRateThreshold.low': HeartRateLO
			}
		}
	);
}
async function updateHRVThreshold(HRVUP: number, HRVLO: number) {
	patients.updateOne(
		{
			_id: new ObjectId(paramPatient),
			HCProThresholds: { $elemMatch: { HCPro: paramUser } }
		},
		{
			$set: {
				'HCProThresholds.$.Thresholds.HRVThreshold.high': HRVUP,
				'HCProThresholds.$.Thresholds.HRVThreshold.low': HRVLO
			}
		}
	);
}
async function updateArythmiaCountThreshold(ArythmiaCountUP: number, ArythmiaCountLO: number) {
	patients.updateOne(
		{
			_id: new ObjectId(paramPatient),
			HCProThresholds: { $elemMatch: { HCPro: paramUser } }
		},
		{
			$set: {
				'HCProThresholds.$.Thresholds.ArythmiaCountThreshold.high': ArythmiaCountUP,
				'HCProThresholds.$.Thresholds.ArythmiaCountThreshold.low': ArythmiaCountLO
			}
		}
	);
}
async function updateBodyTemperatureThreshold(
	BodyTemperatureUP: number,
	BodyTemperatureLO: number
) {
	patients.updateOne(
		{
			_id: new ObjectId(paramPatient),
			HCProThresholds: { $elemMatch: { HCPro: paramUser } }
		},
		{
			$set: {
				'HCProThresholds.$.Thresholds.BodyTemperatureThreshold.high': BodyTemperatureUP,
				'HCProThresholds.$.Thresholds.BodyTemperatureThreshold.low': BodyTemperatureLO
			}
		}
	);
}

async function UpdateThreshold(
	BreathingRateUP: any,
	BreathingRateLO: any,
	BreathingDepthUP: any,
	BreathingDepthLO: any,
	SPO2UP: any,
	SPO2LO: any,
	CaughingCountUP: any,
	CaughingCountLO: any,
	HeartRateUP: any,
	HeartRateLO: any,
	HRVUP: any,
	HRVLO: any,
	ArythmiaCountUP: any,
	ArythmiaCountLO: any,
	BodyTemperatureUP: any,
	BodyTemperatureLO: any
) {
	patients.updateOne(
		{
			_id: new ObjectId(paramPatient),
			HCProThresholds: { $elemMatch: { HCPro: paramUser } }
		},
		{
			$set: {
				'HCProThresholds.$.Thresholds.BreathingRateThreshold.high': BreathingRateUP,
				'HCProThresholds.$.Thresholds.BreathingRateThreshold.low': BreathingRateLO,

				'HCProThresholds.$.Thresholds.BreathingDepthThreshold.high': BreathingDepthUP,
				'HCProThresholds.$.Thresholds.BreathingDepthThreshold.low': BreathingDepthLO,

				'HCProThresholds.$.Thresholds.SPO2Threshold.high': SPO2UP,
				'HCProThresholds.$.Thresholds.SPO2Threshold.low': SPO2LO,

				'HCProThresholds.$.Thresholds.CaughingCountThreshold.high': CaughingCountUP,
				'HCProThresholds.$.Thresholds.CaughingCountThreshold.low': CaughingCountLO,

				'HCProThresholds.$.Thresholds.HeartRateThreshold.high': HeartRateUP,
				'HCProThresholds.$.Thresholds.HeartRateThreshold.low': HeartRateLO,

				'HCProThresholds.$.Thresholds.HRVThreshold.high': HRVUP,
				'HCProThresholds.$.Thresholds.HRVThreshold.low': HRVLO,

				'HCProThresholds.$.Thresholds.ArythmiaCountThreshold.high': ArythmiaCountUP,
				'HCProThresholds.$.Thresholds.ArythmiaCountThreshold.low': ArythmiaCountLO,

				'HCProThresholds.$.Thresholds.BodyTemperatureThreshold.high': BodyTemperatureUP,
				'HCProThresholds.$.Thresholds.BodyTemperatureThreshold.low': BodyTemperatureLO
			}
		}
	);
}

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const BreathingRateUP = form.get('BreathingRate-UP');
		const BreathingRateLO = form.get('BreathingRate-LO');

		const BreathingDepthUP = form.get('BreathingDepth-UP');
		const BreathingDepthLO = form.get('BreathingDepth-LO');

		const SPO2UP = form.get('SPO2-UP');
		const SPO2LO = form.get('SPO2-LO');

		const CaughingCountUP = form.get('CaughingCount-UP');
		const CaughingCountLO = form.get('CaughingCount-LO');

		const HeartRateUP = form.get('HeartRate-UP');
		const HeartRateLO = form.get('HeartRate-LO');

		const HRVUP = form.get('HRV-UP');
		const HRVLO = form.get('HRV-LO');

		const ArythmiaCountUP = form.get('ArythmiaCount-UP');
		const ArythmiaCountLO = form.get('ArythmiaCount-LO');

		const BodyTemperatureUP = form.get('BodyTemperature-UP');
		const BodyTemperatureLO = form.get('BodyTemperature-LO');

		if (BreathingRateUP != null && BreathingRateLO != null) {
			updateBreathingRateThreshold(BreathingRateUP, BreathingRateLO);
		}
		if (BreathingDepthUP != null && BreathingDepthLO != null) {
			updateBreathingDepthThreshold(BreathingDepthUP, BreathingDepthLO);
		}
		if (SPO2UP != null && SPO2LO != null) {
			updateSPO2Threshold(SPO2UP, SPO2LO);
		}
		if (CaughingCountUP != null && CaughingCountLO != null) {
			updateCaughingCountThreshold(CaughingCountUP, CaughingCountLO);
		}
		if (HeartRateUP != null && HeartRateLO != null) {
			updateHeartRateThreshold(HeartRateUP, HeartRateLO);
		}
		if (HRVUP != null && HRVLO != null) {
			updateHRVThreshold(HRVUP, HRVLO);
		}
		if (ArythmiaCountUP != null && ArythmiaCountLO != null) {
			updateArythmiaCountThreshold(ArythmiaCountUP, ArythmiaCountLO);
		}
		if (BodyTemperatureUP != null && BodyTemperatureLO != null) {
			updateBodyTemperatureThreshold(BodyTemperatureUP, BodyTemperatureLO);
		}
	}
};
