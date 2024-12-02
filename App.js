const express = require("express")
const app = express()
const PORT = 3000
const fs = require("fs")
app.set('view engine', 'ejs');

async function getDataBook () {
    try {
        const databooks = await fs.promises.readFile("./DataBooks.json", "utf-8")
        const results = JSON.parse(databooks)
        //console.log(results);
        
        return results
        
    } catch (error) {
      return error  
    }
    
}

app.get ("/books", async(req,res) => {
    try {
        const databooks = await getDataBook ()
        //const results = JSON.parse(databooks)
        res.status (200).json (databooks)
        //console.log(result, "==> INI DATA JSON");
         
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get ("/books/:id", async(req,res) =>{
    try {
        const bookId = req.params.id
        let data = await getDataBook ()
        let result = data.find (el => {
            return el.id == bookId

        })
        if (!result) {
          res.status (404).json("DATA NOT FOUND")  
        }else {
              
        res.status (200).json (result)
        }
        
    } catch (err) {
        res.status(500).json(err)
    }

})

app.get("/tabel-Buku", async (req, res) => {
    try {
        const dataBook = await getDataBook ()
// console.log(dataBook);

//         //const manipulateData = JSON.parse(dataBook)
//         //console.log(manipulateData);
//         console.log(manipulateData);
        
       
        res.render ("tablebook", {manipulateData: dataBook})

    } catch (err) {
        res.status(500).json(err)
    }
})

app.listen(PORT, (req, res) => {
    console.log("RUNNING ON ", PORT);
})
