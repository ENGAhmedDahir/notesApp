import dotenv from 'dotenv'

dotenv.config();
export const port = process.env.port 

export const dbURI = process.env.mongoDbUrl;

export const jwt_Secret = process.env.jwt_Secret;
