import { healthCheck } from './src/controllers/health.controller';

const express = require('express');
export const app = express();

app.use(express.json());
app.get('/', (req, res) => res.send('Hello World'));
app.listen(3000, () => console.log('Server running'));
console.log("The backend has started succesfully...🥀");

healthCheck(); // health controller létrehozása