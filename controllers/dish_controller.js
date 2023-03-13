const express = require('express')
const router = express.Router()
const ensureLoggedIn = require('./../middlewares/ensure_logged_in')
const pool = require('./../db')

// const { Pool } = require('pg')
// const pool = new Pool({
//     database: 'goodfoodhunting'
// })


    router.get('/', (req,res) => {
    const sql = "select * from dishes;"
    console.log(req.user)
        pool.query(sql, (err,dbres) => {
            const records = dbres.rows
            //console.log(records)
            //client.end()
            res.render("home", {records: records, email: req.session.email})
        })
    })

    router.get('/dishes/new', ensureLoggedIn, (req, res) => {
        res.render("new_dish")
    })
        

    router.get('/dishes/:dish_id', ensureLoggedIn, (req, res) => {
        let dish_id = req.params.dish_id
        const sql = `select * from dishes where id= $1;`
        pool.query(sql, [dish_id], (err, dbres) => {
            const record = dbres.rows[0]
            res.render("dish_details", {dish: record})
        })
    })
    
    //routes is http method + path
    router.post('/dishes', ensureLoggedIn, (req,res) => {
        // console.log(req.body)
        // res.send("i am at the right place")
        const title = req.body.title
        const image_url = req.body.image_url
        const sql = `insert into dishes (title, image_url, user_id) values ($1, $2, $3)`
    
        pool.query(sql, [title, image_url, req.session.userId], (err, dbres) => {
            res.redirect('/')
        })
    })
    
    router.get('/dishes/:dish_id/edit', (req, res) => {
        const sql = `Select * from dishes where id = $1`
        pool.query(sql, [req.params.dish_id], (err, dbres) => {
            let record = dbres.rows[0]
            res.render('edit_dish', {dish: record})
    })
    })
    
    router.put('/dishes/:dish_id', (req,res) => {
        const sql = `update dishes set title = $1, image_url = $2 where id = $3`
        console.log(sql)
        pool.query(sql, [req.body.title, req.body.image_url, req.body.dish_id], (err, dbres) => {
            res.redirect(`/dishes/${req.body.dish_id}`)
        })
    
    })

    router.delete("/dishes/:dish_id", (req,res) => {
        const sql = `Delete from dishes where id = $1`
    
        pool.query(sql, [req.body.dish_id], (err, dbres) => {
            res.redirect('/')
        })
    })    

    module.exports = router