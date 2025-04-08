const DoctoresController = {};
import DoctoressModel from "../models/Doctores.js";


//select

DoctoresController.getDoctores = async (req, res) => {
    const Doctores = await DoctoressModel.find()
    res.json(Doctores)
};



//delete 

DoctoresController.deleteDoctores = async (req, res) => {
    await DoctoressModel.findByIdAndDelete(req.params.id);
    res.json({message: "Doctores Deleted"})
}; 


//update

DoctoresController.updateDoctores = async (req, res) => {
    const {nombre, especialidad, correo, contraseña} = req.body;
    const updatedEmployees = await DoctoressModel.findByIdAndUpdate(req.params.id, {nombre, especialidad, correo, contraseña} , {new: true} )

    res.json({message: "Updated Doctores"})
};


export default DoctoresController;