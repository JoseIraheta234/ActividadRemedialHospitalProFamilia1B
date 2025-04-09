import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

import Pacientes from "../models/Pacientes.js";
import {config} from "../config.js";

const registerPacienteController = {};

registerPacienteController.registerPacientes = async (req, res) => {
    const { nombre,edad,correo,contraseña,telefono,isVerified } = req.body;

    try {
        // Check if the email already exists
        const existsPacientes =  await Pacientes.findOne({ correo });
        if (existsPacientes) {
            return res.json({ message: "Pacientes already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        // Create a new client
        const newPaciente = new Pacientes({
            nombre,
            edad,
            correo,
            contraseña: hashedPassword,
            telefono,
            isVerified: isVerified || false,
        });+
        // Save the client to the database
        await newPaciente.save();
        // Generamos un code aleatorio
        const verificationCode = crypto.randomBytes(3).toString('hex');
        // Generamos un token
        const token = jsonwebtoken.sign({ correo, verificationCode }, config.JWT.secret, { expiresIn: "2h" });

        res.cookie("verificationToken", token, {maxAge: 2*60*60*1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.email_user,
                pass: config.email.email_pass,
            },
        });

        const mailOptions = {
            from: config.email.email_user,
            to: correo,
            subject: "Verificacion de correo",
            text: `Para verificar tu correo, ingresa el siguiente codigo: ${verificationCode}\n El codigo es valido por 2 horas`,
        };

        
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error)  return res.json({ message: "Error sending verification email" });
        console.log("Correo Enviado:", info.response);
    });
    res.json({ message: "Paciente registered successfully. Verification email sent." });



    } catch (error) {
        res.json({ message: "Error registering paciente" + error });
        
    }

    
};

registerPacienteController.verifyCodeEmail = async (req, res) => {
    const { verificationCode } = req.body;
    const token = req.cookies.verificationToken;

    try {
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const { email, verificationCode: storedCode } = decoded;

        if (verificationCode !== storedCode) {
            return res.json({ message: "Invalid verification code" });
        }
        // Update the client's isVerified field
        const paciente = await Pacientes.findOne({ email });
        paciente.isVerified = true;
        await paciente.save();
        res.json({ message: "Email verified successfully" });
        res.clearCookie("verificationToken");
    } catch (error) {
        res.json({ message: "Error verifying Paciente" + error });
    }
}

export default registerPacienteController;
