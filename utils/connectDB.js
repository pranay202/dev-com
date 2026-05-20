import mongoose from 'mongoose';

const connectDB = async () => {
	if (mongoose.connections[0].readyState) {
		console.log('[DB] Already connected.');
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URL, { autoCreate: true });
		console.log('[DB] Connected to MongoDB successfully.');
	} catch (err) {
		console.error('[DB Error] Failed to connect to MongoDB:', err.message);
		throw err;
	}
};

export default connectDB;
