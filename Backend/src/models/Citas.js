import {Schema, model} from "mongoose";
 
const CitasShema = new Schema({
 
    fecha: {
        type: String,
        require: true
    },
    hora: {
        type: String,
        require: true,
        maxLength: 100
    },
    motivo: {
        type: String
    },
    doctorAsignado: {
        type: String,
        ref: "doctores"
    },
    pacienteAsignado: {
        type: String,
        ref: "Pacientes"
    }
},{
    timestamps: true,
    strict: false
})
 
 
export default model("citas", CitasShema)