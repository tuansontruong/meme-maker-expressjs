const fs = require('fs');
const path = require("path");

const pathData = path.join(__dirname, '../data.json')

const loadOriginals = () => {
    try {
        const buffer = fs.readFileSync(pathData)
        const string = buffer.toString();
        return JSON.parse(string);

    } catch (error) {
        return [];
    }
}