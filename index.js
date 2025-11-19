require("dotenv").config({ quiet: true });
const express = require("express");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
