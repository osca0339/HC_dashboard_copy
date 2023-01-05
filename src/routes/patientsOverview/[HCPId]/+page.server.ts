import type { PageServerLoad } from './$types';
import type { Load } from '@sveltejs/kit';
import { patients } from '$db/Collections/patients';
import { patientData } from '$db/Collections/patientData';
import { storeHCPId } from '$protectedMongoId';

export const load: PageServerLoad = async function ({ params }) {
	const patientList = await patients.find({ assingedHealthCarePro: params.HCPId }).toArray();
	const patientDataList = await patientData.find({}).sort({ Date: 1 }).toArray();
	const formatPatients = patientList.map((p) => {
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

	function setToDefaultThreshold() {
		formatPatients.forEach((p) => {
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

	const formatPatientData = patientDataList.map((p) => {
		return {
			id: p._id.toString(),
			patientId: p.patientId,
			BreathingRate: p.BreathingRate,
			BreathingDepth: p.BreathingDepth,
			SPO2: p.SPO2,
			CoughingCount: p.CaughingCount, //change name on mongo
			HeartRate: p.HeartRate,
			HRV: p.HRV,
			ArythmiaCount: p.ArythmiaCount,
			BodyTemperature: p.BodyTemperature,
			Date: p.Date
		};
	});

	let mergedDataList: any[] = [{}];

	function mergedData() {
		const newArray: any[] = [];
		formatPatients.forEach((p) => {
			let Last14DayAvg = 0;
			formatPatientData.forEach((pd) => {
				if (p.id == pd.patientId) {
					const newObject = {
						id: pd.patientId,
						Name: p.name,
						Last_14Days: 0,
						Risk_Score: 0,
						Last_Reading: new Date(pd.Date),
						Breathing_Rate: pd.BreathingRate,
						Breathing_Depth: pd.BreathingDepth,
						SPO2: pd.SPO2,
						Coughing_Count: pd.CoughingCount,
						Heart_Rate: pd.HeartRate,
						HRV: pd.HRV,
						Arythmia_Count: pd.ArythmiaCount,
						Body_Temperature: pd.BodyTemperature,
						Thresholds: p.HCProThresholds.Thresholds
					};
					//Below is the method that increments the Risk Score
					Object.keys(newObject.Thresholds).forEach(function (key) {
						switch (key) {
							case 'BreathingRateThreshold':
								if (
									newObject.Breathing_Rate >= newObject.Thresholds[key].high ||
									newObject.Breathing_Rate <= newObject.Thresholds[key].low
								) {
									newObject.Risk_Score = newObject.Risk_Score + 1;
								}
								break;
							case 'BreathingDepthThreshold':
								if (
									newObject.Breathing_Depth >= newObject.Thresholds[key].high ||
									newObject.Breathing_Depth <= newObject.Thresholds[key].low
								) {
									newObject.Risk_Score = newObject.Risk_Score + 1;
								}
								break;
							case 'SPO2Threshold':
								if (
									newObject.SPO2 >= newObject.Thresholds[key].high ||
									newObject.SPO2 <= newObject.Thresholds[key].low
								) {
									newObject.Risk_Score = newObject.Risk_Score + 1;
								}
								break;
							case 'CaughingCountThreshold':
								if (
									newObject.Coughing_Count >= newObject.Thresholds[key].high ||
									newObject.Coughing_Count <= newObject.Thresholds[key].low
								) {
									newObject.Risk_Score = newObject.Risk_Score + 1;
								}
								break;
							case 'HeartRateThreshold':
								if (
									newObject.Heart_Rate >= newObject.Thresholds[key].high ||
									newObject.Heart_Rate <= newObject.Thresholds[key].low
								) {
									newObject.Risk_Score = newObject.Risk_Score + 1;
								}
								break;
							case 'HRVThreshold':
								if (
									newObject.HRV >= newObject.Thresholds[key].high ||
									newObject.HRV <= newObject.Thresholds[key].low
								) {
									newObject.Risk_Score = newObject.Risk_Score + 1;
								}
								break;
							case 'ArythmiaCountThreshold':
								if (
									newObject.Arythmia_Count >= newObject.Thresholds[key].high ||
									newObject.Arythmia_Count <= newObject.Thresholds[key].low
								) {
									newObject.Risk_Score = newObject.Risk_Score + 1;
								}
								break;
							case 'BodyTemperatureThreshold':
								if (
									newObject.Body_Temperature >= newObject.Thresholds[key].high ||
									newObject.Body_Temperature <= newObject.Thresholds[key].low
								) {
									newObject.Risk_Score = newObject.Risk_Score + 1;
								}
								break;
							default:
								break;
						}
					});
					//Below checks if the reading occured in the last two weeks.
					//If it did, we calculate the 14 day average
					const now = new Date();
					const twoWeeksAgo = new Date(Date.now() - 12096e5);

					if (newObject.Last_Reading <= now && newObject.Last_Reading >= twoWeeksAgo) {
						Last14DayAvg = (Last14DayAvg + newObject.Risk_Score) / 14;
					}

					newObject.Last_14Days = Math.round((Last14DayAvg + Number.EPSILON) * 100) / 100;
					//Checks if an object with the same patientName exists.
					//If it doesn't push the new object to the list
					//If it does but the date is more recent: remove the old and push the new
					//Else do nothing with the object
					const foundObject = newArray.find((obj) => obj.Name == newObject.Name);
					if (foundObject == null) {
						newArray.push(newObject);
					} else if (foundObject.Last_Reading < newObject.Last_Reading) {
						const index = newArray.indexOf(foundObject);
						newArray.splice(index);
						newArray.push(newObject);
					}
				}
			});
		});
		mergedDataList = newArray;
	}

	mergedData();

	return {
		patients: formatPatients,
		patientData: formatPatientData,
		merged: mergedDataList
	};
};
