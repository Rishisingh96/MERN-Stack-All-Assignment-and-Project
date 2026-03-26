const Configuration = require('../model/Configuration');

exports.getConfiguration = async (req, res) =>{
    try{
        const config = await Configuration.findOne({
            configId: req.params.id
        });

        if(!config){
            return res.status(404).json({ message: "Not found"});
        }
        res.json(config.matrix);
    } catch (err){
        res.status(500).json({message: err.message});
    }
};

exports.updateRemark = async (req, res) =>{
    try{
        const config = await Configuration.findOneAndUpdate(
            {configId: req.params.id},
            { remark: req.body.remark},
            { returnDocument:'after'}
        );

        if(!config){
            return res.status(404).json({message:"Not found"});
        }
        res.json({message:"success"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
};