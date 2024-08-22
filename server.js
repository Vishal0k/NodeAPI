import express from 'express';
import homeRouter from './routes/homeRouter.js';
import { productsRouter } from './routes/productRouter.js';
import { getErrorStatus } from './controllers/404ErrorController.js';

const app = express();
const port = 8000;

app.use(express.json());

// app.get('/', (req, res) => res.send("<h1>Hello World!</h1>"));

// app.get('/aboutUs', (req, res) => res.send("<h1>About Us</h1>"));

app.use('/', homeRouter);
app.use('/products', productsRouter);
app.get('*', getErrorStatus)

app.listen(port, () => console.log(`Listening at port number ${port}`))