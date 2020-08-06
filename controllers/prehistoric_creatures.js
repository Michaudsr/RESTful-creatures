const express = require('express')
const router = express()
// create an instance of layouts
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs') // will use to read json files

// tell express we're using ejs
router.set('view engine', 'ejs')
router.use(ejsLayouts) // tell express to let us use a layout template
router.use(express.urlencoded({extended: false})) // body-parser middleware

// home route
router.get('/', (req, res)=>{
    res.render('home')
})



// index route
router.get('/prehistoric_creatures', (req, res)=>{
    // get the json from prehistoric_creates.json
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    // convert the json to javascript
    let creatureData = JSON.parse(prehistoric_creatures)



    // keep in creatureData any creatures whose name matches the
    // nameFilter the user searched for
    let nameFilter = req.query.nameFilter
    if(nameFilter){
        creatureData = creatureData.filter((creature)=>{
            return creature.name.toLowerCase()===nameFilter.toLowerCase()
        })
    }
    // render our creature index page and pass it the
    // creatureData as "myCreatures"
    res.render('prehistoric_creatures/index', {myCreatures: creatureData})
})


router.get('/prehistoric_creatures/new', (req, res)=>{
    res.render('prehistoric_creatures/new')
})


router.get('/prehistoric_creatures/:id', (req, res)=>{
    let prehistoric_creates = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(prehistoric_creatures)
    let creatureIndex = parseInt(req.params.id)
    res.render('prehistoric_creatures/show', {myCreature: creatureData[creatureIndex]});
})

// post a new creature!
router.post ('/prehistoric_creatures', (req, res)=>{
    let prehistoric_creates = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(prehistoric_creatures)
    // push new creature to the array
    creatureData.push(req.body)
    // convert creatureData back to JSON and write to creature.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures');
  });








module.exports = router