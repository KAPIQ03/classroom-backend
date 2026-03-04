import express from 'express';
import cors from 'cors';
import subjectRouter from './routes/subjects';

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

app.use(express.json());

app.use('/api/subjects', subjectRouter);

app.get('/', (req, res) => {
	res.json({ message: 'Classroom Management API is running' });
});

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
