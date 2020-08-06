const express = require('express')
const router = express()
// create an instance of layouts
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs') // will use to read json files

// tell express we're using ejs
router.use(express.urlencoded({extended: false})) // body-parser middleware

// home route
router.get('/', (req, res)=>{
    res.render('home')
})

// index route
router.get('/dinosaurs', (req, res)=>{
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

// get the update form
router.get('/edit/:id', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
    res.render('dinosaurs/edit', {dino: dinoData[req.params.id], dinoId: req.params.id})
})

// put route for update dino information
router.put('/:id', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    dinosaurs = JSON.parse(dinosaurs);
    // update the info
    // re-assigning the name and type fields od the dinsaur 
    dinosaurs[req.params.id].name = req.body.name;
    dinosaurs[req.params.id].type = req.body.type;

    // save the edited dinosaurs information
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));
    res.redirect('/dinosaurs');

})



router.get('/dinosaurs/new', (req, res)=>{
    res.render('dinosaurs/new')
})


router.get('/dinosaurs/:id', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let dinoIndex = parseInt(req.params.id)
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]});
})

// post a new dino!
router.post ('/dinosaurs', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // push new dino to the array
    dinoData.push(req.body)
    // convert dinoData back to JSON and write to dinosaurs.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs');
  });

  router.delete('/:id', (req, res)=>{
      let dinosaurs = fs.readFileSync('./dinosaurs.json');
      dinosaurs = JSON.parse(dinosaurs);

      // delete the dinosaur from the dinosaur json file
      // use splice() method to delete it from the array that's saved in the variable dinosaurs
      dinosaurs.splice(req.params.id, 1)

      // save the dinosaurs back into the JSON file
      fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));

      res.redirect('/dinosaurs');
  })


 module.exports = router