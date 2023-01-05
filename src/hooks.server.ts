import { start_mongo } from '$db/db';

start_mongo().then((): void => {
	console.log('...Mongo started');
});


process.on('SIGINT', function () { process.exit(); }); // Ctrl+C  
process.on('SIGTERM', function () { process.exit(); }); // docker stop