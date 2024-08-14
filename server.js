import express from "express"
import bodyParser from "body-parser"
import fs from "fs"
import Swal from "sweetalert2"



const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(express.static("public"))



app.get("/", (req, res)=>{
    res.render("index.ejs")
})

app.post("/", (req,res)=>{
    let name = req.body["name"];
    let message = req.body["message"];
    if(name && message){
       
    let data = fs.readFileSync('public/recommendations.json');
    const recommendations = JSON.parse(data);


    const duplicate = recommendations.recommendations.find(
            rec => rec.message === message
        );

    if (duplicate) {
        console.log("duplicates")
      
    }


    const newRecommendation = {
        id: recommendations.recommendations.length + 1,
        name: name || 'Anonymous',
        message: message
    };

    recommendations.recommendations.push(newRecommendation);

    
    fs.writeFileSync('public/recommendations.json', JSON.stringify(recommendations, null, 2));
 
    }

    res.render("index.ejs")


})

app.listen(port)