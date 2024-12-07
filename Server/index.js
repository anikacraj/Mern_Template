const app =require('./app');
const config =require("./config/config")
const port = config.app.port ;








app.listen(port,(req,res)=>{
  console.log(`server is running at http://localhost:${port}`);
})