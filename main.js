const express = require('express');
const handlebars = require('express-handlebars')

//to get list of files in dir, we need to import fs & path
const fs = require('fs')
const path = require('path')

const PORT = parseInt(process.argv[2]) || parsetInt(process.env.APP_PORT) || 3000;
//create instance of express
const app = express()

//serve static files from static dir so that it can load
// this needs to be after get /root else it blocks root req
//express does not load any files from dir automatically hence below code
//everything that happens in express must go thru a middleware, hence we need to 
//load or mount static resources dir. to render images
app.use(express.static(__dirname + "/static"))
/* app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/html')) 
multiple directories can be mounted
images and html dirs. usually separated so need to mount separately
*/
//also dir. that u mount is the root, u cannot go above it to access other files outside that dir.


//configure HBS
app.engine('hbs', handlebars({defaultLayout: 'default.hbs'}))

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

app.get(["/","/index.html"], (req, resp) => {  
    //use arr to get both reqs to render same view
    resp.status(200) // always return status and type
    resp.type('text/html')
    resp.render('index'); //note: no need .hbs
})



// app.get("/image", (req, resp) => {
//     const dirPath = path.join(__dirname, '/static/dice_images')
//     let filenames =  fs.readdirSync(dirPath)

//     resp.status(200).type('text/html')
//     //resp.send(filenames) -returns arr

//     function generateRandomImg(arr) {
//         let val =  Math.floor(Math.random() * arr.length)
//         const fileName = "/dice_images/" + arr[val]
//         return fileName
//     }

//     const fileName1 = generateRandomImg(filenames)
//     const fileName2 = generateRandomImg(filenames)
//     resp.render('images', 
//         { 
//             image1: fileName1, 
//             image2: fileName2 })
// })


/* WAY TO ADD IMAGES INTO CODE - USE ARR LOL*/
// const ICE-IMGS = [ "", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png" ]
// and get filenames from the arr
// add empty str to push index forward so that we dun have to change formula of val below

app.get("/roll" , (req, resp) => {

    function generateRandomImg() { // function can be moved out app.get 
        let val =  Math.floor(Math.random() * 6) + 1
        const fileName = val.toString() + ".png"
        return fileName
    }

    const fileName1 = generateRandomImg()
    const fileName2 = generateRandomImg()
    resp.status(200)
    resp.type('text/html')
    resp.render('roll', 
        { 
            image1: fileName1, 
            image2: fileName2 })// if ur key and value names ar the same, can just do {fileName1, fileName2} instead
    
})

// capture err
app.use((req, resp) => {
    resp.status(400)
    resp.type('text/html')
    resp.redirect('/'); // redirect is a status so no need to put status and type
})


//start express and server
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}.`)
})
//debug statement to ensure that u know when u are debugging and what port u are at

//app.use -> use matches anything so if u put error capturing function before express.static
//it will not load and will return html even though req is asking for, say css, to load the page