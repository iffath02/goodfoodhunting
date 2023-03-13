const { Client } = require('pg') //need to save to database

const bcrypt = require('bcrypt')

const client = new Client({
    database: "goodfoodhunting"
})


const email = 'iffathfatima02@gmail.com'
const plainTextPassword = 'pudding'

client.connect()

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(plainTextPassword, salt, (err, digestedPassword) => {
        // the digested password is what we want to save in db

        const sql = `Insert into users (email, password_digest) values ('${email}', '${digestedPassword}')`

        client.query(sql, (err, dbres) => {
            console.log(err)
            client.end()
        })
        //console.log(digestedPassword)
    })
})