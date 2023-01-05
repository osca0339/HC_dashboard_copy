import type { PageServerLoad } from "./$types";
import type { Load } from "@sveltejs/kit";
import { mongoData } from "$db/Collections/test";
import { ObjectId } from "mongodb";


export const load: PageServerLoad = async function(){
    const data = await mongoData.find({}, {projection: {message: 1, _id: 1}}).toArray(); //for some reason it will not return objects with new ObjectId("") so we map it out


    const testData = data.map(s => { return { 
        id: s._id.toString(), 
        message: s.message 
    } })
    console.log("back",testData);

    return {
        test: testData
    }
    
}
