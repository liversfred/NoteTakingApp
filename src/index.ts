
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import router from './router';
import { corsOptions } from './config/cors-options';
import invalidPathHandler from './middleware/invalid-path-handler';
import errorHandler from './middleware/error-handler';

// Load environment variables
dotenv.config();  

const port = process.env.SERVER_PORT || 3000;

const app = express();

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors(corsOptions));

// Initialize server
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});

// Router
app.use('/', router());

// Handle no path found
app.use(invalidPathHandler);

// Error handler
app.use(errorHandler);  