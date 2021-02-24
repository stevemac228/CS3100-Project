const express = require("express")
const router = require("./routes/router")
const port = 3000
const app = express()

app.use(express.json())

app.use("/", router)

server = app.listen(port, () => {
	console.log('Example app listening at http://localhost:%d', port);
});
  