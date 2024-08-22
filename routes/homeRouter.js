// import {Router} from 'express';
// import { getHomePage } from '../controllers/homeController';

// const router = Router();

// router.route('/page').get(getHomePage);

// export {router};



import express from 'express';
import { getHomePage } from '../controllers/homeController.js';

const homeRouter = express.Router();
homeRouter.get('/', getHomePage)

export default homeRouter;