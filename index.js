const express = require('express')
const app = express()
// create an instance of layouts
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs') // will use to read json files
const methodOverride = require('method-override')

// tell express we're using ejs
app.set('view engine', 'ejs')
app.use(ejsLayouts) // tell express to let us use a layout template
app.use(express.urlencoded({extended: false})) // body-parser middleware

app.use(methodOverride('_method'));

// home route
app.get('/', (req, res)=>{
    res.render('home')
})

// index route
app.get('/dinosaurs', (req, res)=>{
    // get the json from dinosaurs.json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    // convert the json to javascript
    let dinoData = JSON.parse(dinosaurs)



    // keep in dinoData any dinos whose name matches the
    // nameFilter the user searched for
    let nameFilter = req.query.nameFilter
    if(nameFilter){
        dinoData = dinoData.filter((dino)=>{
            return dino.name.toLowerCase()===nameFilter.toLowerCase()
        })
    }
    // render our dino index page and pass it the
    // dinoData as "myDinos"
    res.render('dinosaurs/index', {myDinos: dinoData})
})


app.get('/dinosaurs/new', (req, res)=>{
    res.render('dinosaurs/new')
})


app.get('/dinosaurs/:id', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let dinoIndex = parseInt(req.params.id)
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]});
})

// post a new dino!
app.post ('/dinosaurs', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // push new dino to the array
    dinoData.push(req.body)
    // convert dinoData back to JSON and write to dinosaurs.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs');
  });


/////////////////////////

// index route
app.get('/prehistoric_creatures', (req, res)=>{
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


app.get('/prehistoric_creatures/new', (req, res)=>{
    res.render('prehistoric_creatures/new')
})


app.get('/prehistoric_creatures/:id', (req, res)=>{
    let prehistoric_creates = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(prehistoric_creatures)
    let creatureIndex = parseInt(req.params.id)
    res.render('prehistoric_creatures/show', {myCreature: creatureData[creatureIndex]});
})

// post a new creature!
app.post ('/prehistoric_creatures', (req, res)=>{
    let prehistoric_creates = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(prehistoric_creatures)
    // push new creature to the array
    creatureData.push(req.body)
    // convert creatureData back to JSON and write to creature.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures');
  });







app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.listen(8000)