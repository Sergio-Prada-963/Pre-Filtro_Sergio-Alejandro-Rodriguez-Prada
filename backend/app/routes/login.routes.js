import { Router } from "express";
import { check } from "express-validator";
import login from "../controller/login.controllers.js";
import validateDocuments from "../middlewares/validateDocuments.js";

const router = Router();

router.post('/login',[
    check('Email','El Email es obligatorio').isEmail(),
    check('NumeroId','El NumeroId es obligatorio').not().isEmpty(),
validateDocuments], login);

export default router