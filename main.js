const express = require('express');

const handlebars = require('express-handlebars')

const PORT = parseInt(process.argv[2]) || parsetInt(process.env.APP_PORT) || 3000;

const app = express()

app.engine('hbs', handlebars({defaultLayout: 'default.hbs'}))

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

app.get("/", (req, resp) => {
    resp.status(200)
    resp.type('text/html')
    resp.render('index'); //note: no need .hbs
})

//serve static files from static dir so that it can load
// this needs to be after get /root else it blocks root req
app.use(express.static(__dirname + "/static"))


//mount express static to render images
//else images wont render because hbs is only a template
app.get("/roll" , (req, resp) => {

    function generateRandomImg() {
        let val =  Math.floor(Math.random() * 6) + 1
        const fileName = "/dice_images/" + val.toString() + ".png"
        return fileName
    }

    const fileName1 = generateRandomImg()
    const fileName2 = generateRandomImg()
    resp.status(200)
    resp.type('text/html')
    resp.render('roll', 
        { 
            image1: fileName1, 
            image2: fileName2 })
    
})

// capture err

app.use((req, resp) => {
    resp.status(400)
    resp.type('text/html')
    resp.redirect('/');
})


//start server

app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}.`)
})