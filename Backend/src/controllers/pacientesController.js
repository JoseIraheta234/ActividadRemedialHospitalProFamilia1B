const pacienteController = {};

import Pacientes from "../models/Pacientes.js";

//Select

pacienteController.getPacientes = async (req,res) => {
  const pacientes = await Pacientes.find()
  res.json(pacientes)


};

//Delete

pacienteController.deletePacientes = async(req,res) =>{
    await Pacientes.findByIdAndDelete(req.params.id);
    res.json({message: "Paciente deleted"})
};

//Update

pacienteController.updatePacientes = async(req,res) =>{
    const {nombre,edad,correo,contraseña,telefono,isVerified} = req.body;
    const updatePaciente= await Pacientes.findByIdAndUpdate(req.params.id,{nombre,edad,correo,contraseña,telefono,isVerified},{new: true})
    res.json({message: "Paciente updated"})

}

export default pacienteController;