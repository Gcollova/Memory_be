import express, { Express } from 'express';
import resultRoute from './resultPostRoute';
import scoreboardRoute from './scoreboardRoute';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

mongoose
  .connect(`mongodb+srv://giorgiocollova:${process.env.PASSWORD}@cluster0.v5rhlyd.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
app.use(cors());
app.use(resultRoute);
app.use(scoreboardRoute);

app.listen(port, () => {
  // console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;

// ENDPOINT BACKEND http://34.253.235.114:8080/
