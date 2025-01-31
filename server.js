const express= require('express');
const app = express();
const api = require("./routes/que");
const bodyParser = require('body-parser');
const admin = require("./routes/admin")


app.use(bodyParser.json());

app.use('/api',api)
app.use('/admin',admin)

app.listen(3000,()=>{
    console.log("Server on");
})


