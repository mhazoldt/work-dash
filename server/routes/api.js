var express = require('express');
const jwt = require('jsonwebtoken')
var router = express.Router();
let bcrypt = require("bcrypt")
let db = require("../db/db.js")
let config = require('config')
let request = require('request');

router.post("/token", function(req, res, next){
  console.log("got to token")
  const username = req.body.username
  const password = req.body.password

  console.log({username})

  const sql = `
    SELECT password, id FROM users
    WHERE username = $1
  `

  if (!username && !password) {
    res.status(401).json({
      message: 'Invalid Credentials'
    })
  } else {

    db.query(sql, [username], function(err, results, fields){
      console.log({results})
      let hashedPassword = results.rows[0].password
      let user_id = results.rows[0].id
      // console.log({hashedPassword})
      hashedPassword = hashedPassword.toString()
      // console.log({hashedPassword})

      bcrypt.compare(password, hashedPassword).then(function(result){
        if (result) {
          // notice we don't need to store tokens in the database!
          res.json({
            token: jwt.sign({username}, config.get('secret'), { expiresIn: config.get('sessionLengthInSeconds')}),
            username: username,
            user_id: user_id
          })
        } else {
          res.status(401).json({
            message: 'Invalid Credentials'
          })
        }
      }).catch(function(err){
        console.log(err)
      })
    })
  }
})



router.post("/register", function(req, res, next){
    console.log("got to register")
    const username = req.body.username
    const password = req.body.password

    const sql = `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
    `

    bcrypt.hash(password, 10, bcryptResult)
    function bcryptResult(err, hashedPassword) {
        // console.log("hashedPassword")
        // console.log(hashedPassword)
        let sql = "INSERT INTO users (username, password) VALUES($1, $2)"
        db.query(sql, [username, hashedPassword], usersResults)
    }
    function usersResults(err, results, fields) {
      if(err) {
          console.log(err)
          let jsonRes = {"status": "fail", "message": "could not register user"}
          // console.log(jsonRes)
          res.json(jsonRes)
      } else {
          console.log(err)
          // console.log(results)
          // console.log(fields)
          let jsonRes = {"message": "user registered"}
          // console.log(jsonRes)
          res.json(jsonRes)

      }

    }

  })






// endpoint: GET /api/addjob
// request: {detailUrl, jobTitle, company, location, date, username, applied, response_received}
// response: [ {"message": "job added"} ]
//           {"status": "fail", "message": "could not add job"}
//
// add job to task list
router.post("/addjob", function(req, res, next){
  const detailUrl = req.body.detailUrl
  const jobTitle = req.body.jobTitle
  const company = req.body.company
  const location = req.body.location
  const date = req.body.date
  const user_id = req.body.user_id
  const applied = req.body.applied
  const response_received = req.body.response_received
  const followed_up = req.body.followed_up

  // console.log({req})
  // console.log({detailUrl})
  console.log("###### ADD JOB ######")
  console.log({user_id})
  console.log({detailUrl})


  const sql = `INSERT INTO public.job_listings_saved ("detailUrl", "jobTitle", "company", "location", "date", "user_id", applied, response_received, "followed_up") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`

  db.query(sql, [detailUrl, jobTitle, company, location, date, user_id, applied, response_received, followed_up], jobResults)
  function jobResults(err, results, fields) {
    if(err) {
        console.log("#### QUERY HAD ERRORS ####")
        console.log(err)
        let jsonRes = {"status": "fail", "message": "could not add job"}
        // console.log(jsonRes)
        res.json(jsonRes)
    } else {
        console.log(" #### NO ERRORS ON QUERY ####")
        let jsonRes = {"message": "job added"}
        // console.log(jsonRes)
        res.json(jsonRes)
    }

  }

})







// endpoint: GET /api/listjobs/:id
// request: {}
// response: [ {"detailsUrl": "dice.com", "company": "company name", "jobTitle": "job title"} ]
//           {"status": "fails", "message": "could not list jobs"}
//
// list activities
router.get('/listjobs/:id', function(req, res, next) {

  // get request data
  let user_id = req.params.id
  let sql = `
    SELECT * FROM job_listings_saved WHERE "user_id" = $1
  `

  // do database stuff
  db.query(sql, [user_id], jobList)

  // send data to react
  function jobList(err, results, fields) {
    if(err) {
        console.log(err)
        let jsonRes = [{ detailUrl: "", data: {"status": "fail", "message": "could not find jobs"} }]
        // console.log(jsonRes)
        res.json(jsonRes)
    } else {
        let jsonRes = results
       
        res.json(jsonRes.rows)

    }

  }
});


// endpoint: GET /api/editjob/:id
// request: {detailUrl, jobTitle, company, location, date, applied, response_recieved, followed_up, deleted}
// The id that must be passed is the idjob_listings identifier on the database
// response: [ {"status": "success"}, {"id": 1, "name": "laps"}, {"id": 2, "name": "intervals"} ]
//           {"status": "fails", "message": "could not get activities"}
//
// list activities
router.post('/editjob/:id', function(req, res, next) {
    console.log("##### edit jobs ####")
    // console.log(req)

    // get request data
    const idjob_listings = req.params.id
    const detailUrl = req.body.detailUrl
    const jobTitle = req.body.jobTitle
    const company = req.body.company
    const location = req.body.location
    const date = req.body.date
    const user_id = req.body.user_id
    const applied = req.body.applied
    const response_received = req.body.response_received
    const followed_up = req.body.followed_up
    const deleted = req.body.deleted

    const sql = `
      UPDATE job_listings_saved
       SET "detailUrl" = $1,
           "jobTitle" = $2,
           "company" = $3,
           "location" = $4,
           "date" = $5,
           applied = $6,
           response_received = $7,
           "followed_up" = $8,
           deleted = $9
       WHERE idjob_listings = $10
    `

    // do database stuff
    db.query(sql, [detailUrl, jobTitle, company, location, date, applied, response_received, followed_up, deleted, idjob_listings], jobUpdate)

    function jobUpdate(err, results, fields) {
      if(err) {
          console.log("errors on edit")
          console.log(err)
          let jsonRes = {"status": "fail", "message": "could not update job"}
          // console.log(jsonRes)
          res.json(jsonRes)
      } else {
          console.log("no erros on edit")
          let jsonRes = {"message": "job update success"}
          // console.log(jsonRes)
          res.json(jsonRes)
      }

    }
})


// endpoint: GET /api/removejob/:id
// request: {}
// response: [ {"message": "job delete success"} ]
//           {"status": "fail", "message": "could not delete job"}
//
// list activities
router.post('/removejob/:id', function(req, res, next) {

    // get request data
    const idjob_listings = req.params.id

    const sql = `
      DELETE FROM job_listings_saved
       WHERE idjob_listings = $1
    `

    // do database stuff
    db.query(sql, [idjob_listings], jobDelete)

    function jobDelete(err, results, fields) {
      if(err) {
          console.log(err)
          let jsonRes = {"status": "fail", "message": "could not delete job"}
          // console.log(jsonRes)
          res.json(jsonRes)
      } else {
          let jsonRes = {"message": "job delete success"}
          // console.log(jsonRes)
          res.json(jsonRes)
      }

    }
})




/////////////////////////
//
// AppData Endpoints
//
////////////////////////


// endpoint: POST /api/addappdata/:id
// request: {}
// response: [ {"message": "app data added"} ]
//           {"status": "fail", "message": "could not add app data"}
//
// add app data
router.post("/addappdata/:id", function(req, res, next){
  let user_id = req.params.id
  let label = ""
  let data = ""

  const sql = `
    INSERT INTO app_data (label, data, user_id)
    VALUES ($1, $2, $3)
  `
  db.query(sql, [label, data, user_id], appDataResults)
  function appDataResults(err, results, fields) {
    if(err) {
        console.log(err)
        let jsonRes = {"status": "fail", "message": "could not add app data"}
        // console.log(jsonRes)
        res.json(jsonRes)
    } else {
        let jsonRes = {"message": "app data added"}
        // console.log(jsonRes)
        res.json(jsonRes)
    }

  }

})



// endpoint: GET /api/listappdata/:id
// request: {}
// response: [ {"label": "label", "data": "data"} ]
//           {"status": "fails", "message": "could not list app data"}
//
// list app data
router.get('/listappdata/:id', function(req, res, next) {
  
    // get request data
    let user_id = req.params.id
    let sql = `
      SELECT * FROM app_data WHERE user_id = $1
    `
  
    // do database stuff
    db.query(sql, [user_id], appDataList)
  
    // send data to react
    function appDataList(err, results, fields) {
      if(err) {
          console.log(err)
          let jsonRes = {"status": "fail", "message": "could not list app data"}
          // console.log(jsonRes)
          res.json(jsonRes)
      } else {
          let jsonRes = results
          res.json(jsonRes)
  
      }
  
    }
  });


// endpoint: POST /api/removeappdata/:id
// request: {}
// response: [ {"message": "app data delete success"} ]
//           {"status": "fail", "message": "could not delete app data"}
//
// remove app data
router.post('/removeappdata/:id', function(req, res, next) {
  
      // get request data
      const idapp_data = req.params.id
  
      const sql = `
        DELETE FROM app_data
         WHERE idapp_data = $1
      `
  
      // do database stuff
      db.query(sql, [idapp_data], appDataDelete)
      function appDataDelete(err, results, fields) {
        if(err) {
            console.log(err)
            let jsonRes = {"status": "fail", "message": "could not delete app data"}
            // console.log(jsonRes)
            res.json(jsonRes)
        } else {
            let jsonRes = {"message": "app data delete success"}
            // console.log(jsonRes)
            res.json(jsonRes)
        }
  
      }
  })


// endpoint: POST /api/editjob/:id
// request: {"label": "label", "data": "data"}
// The id that must be passed is the idapp_data identifier on the database
// response: [ {"status": "app data update success"} ]
//           {"status": "fails", "message": "could not update app data"}
//
// edit app data
router.post('/editappdata/:id', function(req, res, next) {
  
      // console.log(req)
  
      // get request data
      const idapp_data = req.params.id
      const label = req.body.label
      const data = req.body.data
  
      const sql = `
        UPDATE app_data
         SET label = $1,
             data = $2
         WHERE idapp_data = $3
      `
  
      // do database stuff
      db.query(sql, [label, data, idapp_data], appDataUpdate)
  
      function appDataUpdate(err, results, fields) {
        if(err) {
            console.log(err)
            let jsonRes = {"status": "fail", "message": "could not update app data"}
            // console.log(jsonRes)
            res.json(jsonRes)
        } else {
            let jsonRes = {"message": "app data update success"}
            // console.log(jsonRes)
            res.json(jsonRes)
        }
  
      }
  })



///////////////////////
//
// github to dice converstion
//
//////////////////////



function queryUrlBuilder(search, location, full_time) {
  console.log("got to queryUrlBuilder()")

  let url = 'https://jobs.github.com/positions.json?'
  let searchQuery
  let locationQuery


  if(search) { 
    search = search.replace(/ /g, "+") 
    searchQuery = `search=${search}`
    url = url + searchQuery

  }

  if(location) { 
    location = location.replace(/ /g, "+") 
    locationQuery = `&location=${location}`
    url = url + locationQuery

  }

  if(full_time) {
    let fulll_time = `&full_time=true`
    url = url + full_time
  
  }


  console.log({url})

  return url

}



// endpoint: GET /api/jobsearch
// request: {}
// response: [ {"label": "label", "data": "data"} ]
//           {"status": "fails", "message": "could not list app data"}
//
// job search
router.get('/jobsearch?', function(req, res, next) {
  let search = req.query.search
  let location = req.query.location
  let full_time = req.query.full_time


  console.log("/api/jobsearch? endpoint")
  console.log({search})
  console.log({location})
  console.log({full_time})

  let url = queryUrlBuilder(search, location, full_time)


  console.log("/api/jobsearch? - before request")
  request(url, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage. 
    // console.log(typeof body)
    let bodyJson = JSON.parse(body)
    console.log(bodyJson.length)
    console.log(bodyJson[0])

    let jsonRes = []

    jsonRes = bodyJson.map((jobPost) => {
      let formatJobPost = {}
      let created_at

      formatJobPost.detailUrl = jobPost.url
      formatJobPost.jobTitle = jobPost.title
      formatJobPost.company = jobPost.company
      formatJobPost.location = jobPost.location
      created_at = jobPost.created_at.split(" ")
      console.log("-- created_at --")
      console.log({created_at})
      console.log("")
      console.log("")
      console.log("")
      formatJobPost.date = `${created_at[0]} ${created_at[1]} ${created_at[2]}`

      return formatJobPost

    })

    console.log("")
    console.log("")
    console.log({jsonRes})

    let data = {}

    data.resultItemList = jsonRes

    res.json(data)

  })

});



module.exports = router;
