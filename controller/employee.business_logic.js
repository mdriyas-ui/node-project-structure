const mongoose = require("mongoose");
const Employee = mongoose.model('Employee');


exports.create = async (req, res) => {
   
    const employee = new Employee({
        empName: req.body.empName,
        empEmail: req.body.empEmail,
        designation: req.body.designation,
        address: req.body.address,
    });
    let empData = await employee.save();
    console.log(empData);
    res.status(200).send(`the given employess details is successfully created : ${empData}`);

};



exports.read = async (req, res) => {
    let empData = await Employee.find()
    res.status(200).send(`employee data: ${empData}`);
};



exports.update = async (req, res) => {
    let updatedEmpData = await Employee.updateOne({
        _id: req.params._id
    }, {
        empName: req.body.empName,
        empEmail: req.body.empEmail,
        designation: req.body.designation,
        address: req.body.address,
    });
        if (updatedEmpData.acknowledged === true && updatedEmpData.modifiedCount > 1) {
            let updatedData = await Employee.find({
                _id: req.params._id
            });
            res.status(200).send(`this data updated successfully: ${updatedData}`);
            console.log("successfully updated");

        } else {
            res.status(204).send(`the data could not be created or modified with the record`);
            console.log("the data could not be created or modified with the record");
        }
}


exports.delete = async (req, res) => {
    let deletedEmpData = await Employee.deleteOne({_id : req.params._id});

    if(deletedEmpData.deletedCount===0){
        res.status(404).send(`already deleted (or) not found in record`);
        console.log("already deleted or not found in record");
    }else{
        res.status(200).send(`employee data deleted successfully`);
    }

};