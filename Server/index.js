const app =require('./app');
const config =require("./config/config")
const port = config.app.port ;



// Import User Model
const usersRegisterModal = require("./Models/userRegister");

const app = express();
app.use(express.json());
app.use(cors());


app.listen(port,(req,res)=>{
  console.log(`server is running at http://localhost:${port}`);
})