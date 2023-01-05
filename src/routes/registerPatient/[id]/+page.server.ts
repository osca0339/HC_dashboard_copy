import { patients } from '$db/Collections/patients';
import { patientCache } from '$db/Collections/patientCache';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { ObjectId } from 'mongodb';
import { healthcareProfessionals } from '$db/Collections/healthcareProfessionals';



let mongoId = ""
let patientEmail = ""
let fireId = ""
let hcPro = ""
let cachedPatient = {}
let hasHCP: Boolean;    //if the patient already are assigned and need another patient


export const load: PageServerLoad = async function ({ params }) {
    mongoId = params.id
    cachedPatient = await patientCache.findOne({_id: new ObjectId(mongoId)})
    if(cachedPatient != null){
        patientEmail = cachedPatient.pendingEmail
        fireId = cachedPatient.	hcPro
        hcPro = await healthcareProfessionals.findOne({firebaseUID: fireId})
        hasHCP = cachedPatient.hasHCP

        return{
            cached: true,
            hasHCP: hasHCP
        }
    }
    return{
        cached: false
    }
    
}





export const actions: Actions = { 
	default: async ({ request }) => {
		const form = await request.formData();
		const name = form.get('name');
		const age = form.get('age');
		const weight = form.get('weight');
		const height = form.get('height');
		const sex = form.get('sex');
		
        let data = {
            name: name,
            email: patientEmail,
            assingedHealthCarePro: [
                hcPro._id
            ],
            age: age,
            sex: sex,
            weight: weight,
            height: height,
            HCProThresholds: [
                {
                    HCPro: hcPro._id,
                    Thresholds: {
                        BreathingRateThreshold: {
                            high: null,
                            low: null
                        },
                        BreathingDepthThreshold: {
                            high: null,
                            low: null
                        },
                        SPO2Threshold: {
                            high: null,
                            low: null
                        },
                        CaughingCountThreshold: {
                            high: null,
                            low: null
                        },
                        HeartRateThreshold: {
                            high: null,
                            low: null
                        },
                        HRVThreshold: {
                            high: null,
                            low: null
                        },
                        ArythmiaCountThreshold: {
                            high: null,
                            low: null
                        },
                        BodyTemperatureThreshold: {
                            high: null,
                            low: null
                        }
                    }
                }
            ]
        }

        if(cachedPatient != null){
            
            if(hasHCP == false){
                patients.insertOne(data)
                patientCache.deleteOne({hcPro: fireId})
                console.log("Patient added!")
            }
            if(hasHCP == true){
                patients.updateOne({email: patientEmail}, {$addToSet: {assingedHealthCarePro: hcPro._id}})
                patientCache.deleteOne({hcPro: fireId})
                console.log("updated assingedHealthCarePro")
            }
        }
        else{
            console.log("The patient is not in cache")
        }

}};