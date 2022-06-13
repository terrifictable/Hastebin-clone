
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("node:fs");

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.listen(5000, () => {
    console.log("App started on http://localhost:5000/!");
});


app.post("/add", (req, res) => {
    console.log(req["body"]);
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 1; i <= 20; i++) {
        const char = Math.floor(Math.random() * chars.length + 1);
        id += chars.charAt(char);
    }

const website = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${id}</title>
</head>
<body>
${req["body"]["code"]}
</body>
</html>`;

    fs.mkdir(`src/public/posts/${id}`, err => { if (err != null) console.log(err); } );
    fs.writeFileSync(`src/public/posts/${id}/index.html`, website);
    res.send(JSON.parse(`{ \"message\": \"Success\", \"id\": \"${id}\" }`));
});
