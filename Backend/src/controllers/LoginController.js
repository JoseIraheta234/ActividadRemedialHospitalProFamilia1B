import DoctoresModel from "../models/Doctores.js"
import PacientesModel from "../models/Pacientes.js"
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { config} from "../config.js"

const loginController = {};

loginController.login = async (req,res) => {

    const{correo, contraseña} = req.body;
    try{
        let userFound;
        let userType;
        if(correo === config.emailAdmin.email && contraseña === config.emailAdmin.password){
            userType = "Admin"; 
            userFound = {_id: "Admin"}
        } else {

            userFound = await PacientesModel.findOne({correo});
            userType = "Paciente";

            if(!userFound){
                userFound = await DoctoresModel.findOne({correo});
                userType = "Doctor";
            }
        }

        if(!userFound){
            return res.json({message: "User not found"})
        }

        if(userType !== "Admin"){
            const isMatch = bcryptjs.compare(contraseña, userFound.contraseña);
            if(!isMatch){
                return res.json({message: "Invalid password"})
            }
        }

        jsonwebtoken.sign(

            {id: userFound._id, userType},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
            (error, token) => {
                if(error)console.log(error);
                res.cookie("authToken", token);
                res.json({message: "Login Successful"})
            }
        )

    }
    catch(error) {
        console.log(error)
    }
}

export default loginController;
