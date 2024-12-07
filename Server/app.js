const express =require ('express');
const app =express();
const cors =require("cors");
require("./config/db");


const userRouter =require('./Routers/user.route');

const adsSliderSchemaModel = require('./Models/AdsSliderImage')


app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use("/",userRouter); 





// app.get("/upload", async (req, res) => {
//   try {
//     const adsSliderImages = await adsSliderSchemaModel.findOne().sort({ timestamp: -1 }); 
//     res.status(200).json(adsSliderImages);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching images.", error });
//   }
// });







app.use( (req,res,next)=>{
    res.status(404).json ({
        message:'router not found',
    })
})

//server error 
app.use( (err,req,res,next)=>{
    res.status(500).json ({
        message:'something is broken',
    })
})

module.exports =app;