// const pool = require('./../db')

// function setCurrentUser((req, res, next) => {
//     //req.session.userId 

//     const { userId } = req.session

//     if(userId){
//         //user is logged in - setup currentUser object
//         const sql = `select * from users where id = ${userId}`

//         pool.query(sql, (err, dbRes) => {
//             if(err){
//                 console.log(err)
//             } else{
//                 res.locals.currentUser = dbRes.rows[0]
//                 next()
//             }
//         })
//     }
//     else{
//         next()
//     }
// })


