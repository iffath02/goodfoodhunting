const express = require('express')
const app = express()
const port = process.env.PORT || 3000
// const methodOverride = require('method-override')
const logger= require('./middlewares/logger')
const methodOverride = require('./middlewares/method_override')
const session = require('express-session')
const pool = require('./db')
const viewHelpers = require('./middlewares/view_helpers')

// const { Pool } = require('pg')
// const pool = new Pool({
//     database: 'goodfoodhunting'
// })

//http methods - get post put patch delete

//Crud App
//database
//create  insert  post
//read    select  get
//update  update  put/patch
//destroy delete  delete
//client.connect()
/*
*mvc - model view controllers - separation of concerns
*/

app.set("view engine", "ejs")

//middleware callback function has a signature
//now in logger.js file
// function logger(req, res, next) {
//     // console.log(req.url)
//     // console.log(req.method)
//     console.log(`${req.method} ${req.url} ${new Date().toLocaleTimeString()}`)
//     next()
// }

app.use(logger)

app.use(express.static("public"))


//parses the raw request body and turn it into an object accessible at req.body
app.use(express.urlencoded({ extended: true })) // middleware

// app.use(methodOverride(function (req, res) {
//     if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//       // look in urlencoded POST bodies and delete it
//       var method = req.body._method
//       delete req.body._method
//       return method
//     }
//   }))
app.use(methodOverride)

// adds a session object to the request
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
})
)
//app.use(setCurrentUser)
app.use((req, res, next) => {
    //req.session.userId 

    const { userId } = req.session

    if(userId){
        //user is logged in - setup currentUser object
        const sql = `select id, email from users where id = ${userId}`

        pool.query(sql, (err, dbRes) => {
            if(err){
                console.log(err)
            } else{
                res.locals.currentUser = dbRes.rows[0]
                next()
            }
        })
    }else{
        next()
    }
})

// function viewHelpers(req, res, next){
//     res.locals.isLoggedIn = () => {
//         if (req.session.userId){
//             return true
//         } else{
//             return false
//         }
//     }
//     next()
// }

app.use(viewHelpers)


app.use("/", require('./controllers/session_controller'))
//app.use(ensureLoggedIn)
app.use("/", require('./controllers/dish_controller'))

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})