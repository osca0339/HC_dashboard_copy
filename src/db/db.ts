import { MongoClient } from 'mongodb';
import { MONGO_URL } from '$env/static/private';
const client = new MongoClient(MONGO_URL); //needs to be in a .env file to be more secure

export function start_mongo(): Promise<MongoClient> {
	console.log('Starting mongo...');
	return client.connect();
}

export default client.db('HC_dashboard');
