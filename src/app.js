require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRouter = require('./routes');
const ApiProxy = require("./utils/apiProxy");
const app = express();
const port = process.env.PORT;
const uri = process.env.MONGO_URI;

app.use(cors()); 
app.use(bodyParser.json());
ApiProxy(uri);

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json({ extended: true }));
app.use("/api/v1", apiRouter);

app.listen(port, function () {
  console.log(`Server launched on port ${port}`);
})