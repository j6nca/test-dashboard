require('dotenv').config()
const express = require('express')
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const GITLAB_TOKEN = process.env.GITLAB_TOKEN

app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(logger)


// Endpoints
app.get('/', (req, res)=>{
    console.log("/ GET hit")
    res.render('deployments/create', {message:"You rock!", deploymentName:"replace me :)", defaultVersion:"latest"})
})

// Middleware
function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}

const deploymentRouter = require('./routes/deployments')
app.use('/deployments', deploymentRouter)

app.listen(3000)