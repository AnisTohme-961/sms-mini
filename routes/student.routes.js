import express from 'express' ;

import getStudents from '../controllers/student.controllers';

const router = express.Router();

router.get('/', getStudents);

export default router;