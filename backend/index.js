const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
require('dotenv').config()

const app = express();
app.use(cors());

const urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json(), urlencodedParser);

const dbURI = process.env.MONGO_URL
const port = 8001;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then((res) => {

    console.log("mongoDB connected");
}).catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send("Server is live!")
})

const userRoute = require('./routes/user.route')
app.use('/users', userRoute);

const script = require('./routes/script')
app.use('/script', script)

app.listen(port, () => console.log(`listening on localhost: ${port}`));
