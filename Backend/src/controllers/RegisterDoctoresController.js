const registerDoctoresController = {};

import Doctores from "../models/Doctores.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

registerDoctoresController.register = async (req,res) => {
    const {nombre, especialidad, correo, contraseña} = req.body;

    try {
        const existDoctores = await Doctores.findOne({correo});
        if(existDoctores){
            return res.json({message: "Doctor already exist"});
        }

        //hashear o encriptar la contraseña 
        const passwordHash = await bcryptjs.hash(contraseña, 10);

        const newDoctores = new Doctores({nombre, especialidad, correo, contraseña: passwordHash})
        await newDoctores.save();

        //generar un token que valide que ya esta registrado
        //y se puede acceder a todas las paginas

        jsonwebtoken.sign(
            {id: newDoctores._id},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},

            (error, token) => {
                if(error)console.log(error);
                res.cookie("authToken", token);
                res.json({message:"Doctor Registrado"})
            }
        );
    } 
    catch (error) {
        console.log(error);
        res.json({message: "Error al registrar al Doctor"})
    }
}

export default registerDoctoresController;
