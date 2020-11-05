const path = require('path');
const fs = require('fs');
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// db.json file path
const DB_PATH = path.join(__dirname, "../db/db.json");

module.exports = function (app) {

    // response with the list of notes
    app.get('/api/notes', async (req, res) => {

        let notes = await readFileAsync(DB_PATH, "utf-8");

        if (notes) {
            notes = JSON.parse(notes);
            res.json(notes);
        } else {
            res.send(false);
        }

        res.end();

    });

    // adds new notes
    app.post('/api/notes', async (req, res) => { 
    
        const { title , text } = req.body;
        const data = {
            title: title,
            text: text,
            id: Date.now()
        };
        
        let notes = await readFileAsync(DB_PATH, "utf-8");
    
        if(notes) {
            notes = JSON.parse(notes);
            notes.push(data);
        } else {
            notes = [data];
        }
    
        await writeFileAsync(DB_PATH, JSON.stringify(notes), "utf-8");
        
        res.json(notes);
        res.end()
        
    })
    


};