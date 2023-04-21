import * as dotenv from 'dotenv';
dotenv.config();

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const PORT: any = process.env.PORT || 3003;
const RECTORAL_MONGO_URI: string = process.env.RECTORAL_MONGO_URI || '';

export { NODE_ENV, PORT, RECTORAL_MONGO_URI };
