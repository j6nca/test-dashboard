require('dotenv').config({ path: `${__dirname}/../config.env` }) 
const express = require('express')
const router = express.Router()
const request = require('request')

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const GITLAB_TOKEN = process.env.GITLAB_TOKEN
const GITLAB_HOST = process.env.GITLAB_HOST

router.get('/', (req, res)=>{
    console.log("/deployments GET hit...")
    res.status(500).send('yup')
})
router.post('/create', (req, res)=>{
    console.log("/deployments/create POST hit...")
    console.log(`GITLAB_TOKEN ${GITLAB_TOKEN}`)
    console.log(`DEPLOYMENT_NAME ${req.body.deploymentName}`)
    console.log(`ROADMAPPING_VERSION ${req.body.roadmappingVersion}`)
    console.log(`FIM_VERSION ${req.body.fimVersion}`)
    console.log(`FEEDBACK_PORTAL_VERSION ${req.body.feedbackPortalVersion}`)
    console.log(`AUTH_API_VERSION ${req.body.authApiVersion}`)
    console.log(`AUTH_UI_VERSION ${req.body.authUiVersion}`)
    request(
        {
          method: 'post',
          body: {
            token: GITLAB_TOKEN,
            ref: "test-dashboard",
            variables: {
              PULL_REQUEST_NAME: `${req.body.deploymentName}`
            }
          },
          json: true,
          url: "https://gitlab.com/api/v4/projects/34321118/trigger/pipeline"
        },
        error => {
          if (error) {
            console.error(error)
            return
          }
        }
      )
    res.send('Creating deployment')
})
router
.get('/:id', (req, res)=>{
    console.log("/deployments/:id GET hit...")
    res.send(`Retrieving deployment ${req.params.id}`)
})
.delete('/:id', (req, res)=>{
    console.log("/deployments/:id DELETE hit...")
    res.send(`Deleting deployment ${req.params.id}`)
})



module.exports = router