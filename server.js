import express from 'express';
import homeRouter from './routes/homeRouter.js';
import { productsRouter } from './routes/productRouter.js';
import { getErrorStatus } from './controllers/404ErrorController.js';
import userRouter from './routes/userRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';
import logger from 'morgan';
import { createWriteStream } from 'fs';

const app = express();
const port = 8000;

app.use(express.json());

const accessLogStream = createWriteStream('./access.log', {flags:'a'});

app.use(logger('combined', { stream: accessLogStream }))

const options = {
    origin: ['http://localhost:3000', 'https://localhost:8080'],
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE"
}

app.use(cors(options))

// Route definitions
app.use('/', homeRouter);
app.use('/products', productsRouter);
app.use('/user', userRouter);

// Error handling
app.use('*', getErrorStatus);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening at port number ${port}`));


export default app;




