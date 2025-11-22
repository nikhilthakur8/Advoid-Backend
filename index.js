require("dotenv").config({ quiet: true });
const express = require("express");
const morgan = require("morgan");
const {
	authenticateAdmin,
	authenticate,
} = require("./middlewares/authenticate");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", require("./routes/auth"));
app.use("/user", authenticate, require("./routes/user"));
app.use("/admin", authenticateAdmin, require("./routes/admin"));

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
