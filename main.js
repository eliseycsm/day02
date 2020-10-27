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
    resp.render('index');
})


app.get("/roll" , (req, resp) => {

    const imgList = [];
    resp.status(200)
    resp.type('text/html')
    // resp.render('roll', { 
    //     dice-img: imgList  })

    // })
})

// capture err
app.use((req, resp) => {
    resp.status(400)
    resp.type('text/html')
    resp.redirect('/');
})


//start server

app.listen(PORT, () => {
    console.info(`Application started on port ${PORT}.`)
})