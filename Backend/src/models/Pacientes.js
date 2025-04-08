import {Schema, model} from "mongoose";

const PacientesShema = new Schema({

    nombre: {
        type: String,
        require: true,
        maxLength: 100
    },
    edad: {
        type: Number,
        require: true,
        max : 100,
        min : 0
    },
    correo: {
        type: String
    },
    contraseña: {
        type: String
    },
    teléfono: {
        type: String
    },
    isVerified: {
        type: Boolean
    }
},{
    timestamps: true,
    strict: false
})


export default model("pacientes", PacientesShema)