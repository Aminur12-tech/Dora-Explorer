const express = require("express");
const mongoose =  require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() =>  console.log("MongoDB connected successfully"))
    .catch(err => console.log(err));



app.use("/api/experience", require("./src/routes/experience.routes"));
app.use("/api/booking", require("./src/routes/booking.routes"));
app.use("/api/merchant", require("./src/routes/merchant.routes"));

app.listen(5000, () => console.log("Server is running on port 5000"));    