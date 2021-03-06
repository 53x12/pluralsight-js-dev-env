import express from "express";
import path from "path";
import open from "open";
import webpack from "webpack";
import config from "../webpack.config.dev";

const port = 3000;
const app = express();
const compiler = webpack(config);

(function() {
	app.use(require("webpack-dev-middleware")(compiler, {
		noInfo: true, //config.noInfo,
		publicPath: config.output.publicPath
	}));
})();

// website
app.get("/", function(request, response) {
	response.sendFile(path.join(__dirname, "../src/index.html"));
});

// api: Pretend this hits a real database
app.get("/users", function (request, response) {
	response.json([
		{ "id": 1, "firstName": "Bob", "lastName": "Smith", "email": "bob@gmail.com" },
		{ "id": 2, "firstName": "Tammy", "lastName": "Norton", "email": "tnorton@yahoo.com" },
		{ "id": 3, "firstName": "Tina", "lastName": "Lee", "email": "lee.tina@hotmail.com" }
	]);
});

app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else {
		open("http://localhost:" + port);
	}
});
