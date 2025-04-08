const CitasController = {};
import citasModel from "../models/Citas.js";


//select

CitasController.getCitas = async (req, res) => {
    const Citas = await citasModel.find()
    res.json(Citas)
};


//insert

CitasController.insertCitas = async (req, res) => {
    const {fecha, hora, motivo, doctorAsignado,pacienteAsignado} = req.body;
    const newCitas = new citasModel({fecha, hora, motivo, doctorAsignado,pacienteAsignado})

    await newCitas.save()
    res.json({message: "Citas saved"});
};


//delete 

CitasController.deleteCitas = async (req, res) => {
    await citasModel.findByIdAndDelete(req.params.id);
    res.json({message: "Citas Deleted"})
}; 


//update

CitasController.updateCitas = async (req, res) => {
    const {fecha, hora, motivo, doctorAsignado,pacienteAsignado} = req.body;
    const updatedCitas = await citasModel.findByIdAndUpdate(req.params.id, {fecha, hora, motivo, doctorAsignado,pacienteAsignado} , {new: true} )

    res.json({message: "Updated Citas"})
};


export default CitasController;