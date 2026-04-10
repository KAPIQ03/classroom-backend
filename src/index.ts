import express from 'express';
import cors from 'cors';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import subjectRouter from './routes/subjects';
import securityMiddleware from './middleware/security';

const app = express();
const PORT = 8000;
const FRONTEND_URL =
	process.env.FRONTEND_URL ||
	(() => {
		throw new Error('FRONTEND_URL is required for CORS configuration');
	});

app.use(
	cors({
		origin: FRONTEND_URL,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	}),
);

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());

app.use(securityMiddleware);

app.use('/api/subjects', subjectRouter);

app.get('/', (req, res) => {
	res.json({ message: 'Classroom Management API is running' });
});

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
