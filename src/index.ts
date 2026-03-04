import express from 'express';
import cors from 'cors';
import subjectRouter from './routes/subjects';

const app = express();
const PORT = 8000;

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
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
