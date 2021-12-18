const versionOfOS = 'win11';
const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})

const lengthEmojis = 3533;
let i = 0;
let filesI = 0;

app.post('/save', (req, res) => {
    const image = req.body.image.replace(/^data:image\/png;base64,/, "")

    if (!fs.existsSync(`emojis/${versionOfOS}/${filesI}/`)) fs.mkdirSync(`emojis/${versionOfOS}/${filesI}`);
    if (fs.readdirSync(`emojis/${versionOfOS}/${filesI}/`).length >= 1000) filesI++;
    if (!fs.existsSync(`emojis/${versionOfOS}/${filesI}/`)) fs.mkdirSync(`emojis/${versionOfOS}/${filesI}`);
    fs.writeFileSync(`emojis/${versionOfOS}/${filesI}/${req.body.emoji}.png`, image, 'base64');

    i++;
    console.log(`Saved ${i} emojis from ${lengthEmojis}; ${lengthEmojis - i}`);
    res.status(204).json();
})

app.listen(3000, () => {
    console.log(`Express server started on port 3000\nhttp://localhost:3000`);
});