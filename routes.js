
const functionMajor = (date) => {
    return new Promise((resolve,reject) => {
        let dateParts = date.split('/')
        let today = Date.now();
        let birthDate = new Date(+dateParts[2], dateParts[1]-1,+dateParts[0]).getTime()
        let major = 18 * 31557600000
        if(today-birthDate>=major){
            resolve('yes')
        }else{
            reject('no')
        }
    })
}

var handlers = require('./handlers/users')
module.exports = function(app){
//*EXO1
app.get('/hello-world',(req,res) => {
    res.set('content-type','application/json')
    res.send(JSON.stringify({message: 'wow'}))
})

//*EXO2
app.get('/message/:id',(req,res) => {
    // console.log(req)
    // let message = req.params.id
    if (req.params.id.length>20) {
        res.status(400).send({message: "Bad Request"})
    }else{
        res.send(req.params.id)
    }
    
})

//*EXO 3
app.post('/infos/headers',(req,res) => {
    // console.log(req)
    res.set('content-type','application/json')
    res.send(JSON.stringify(req.headers))
})
//*EXO 4
app.post('/exo4',async (req,res) => {
    // console.log(req.body)
    if(await functionMajor(req.body.birthdate)=='yes'){
        res.status(200).send({message: `Welcome ${req.body.firstname}`})
    }else{
        res.status(403).send({message: "Forbidden"})
    }
})

//*EXO5
app.get('/rick-roll',(req,res) => {
    // console.log(req)
    // let message = req.params.id
    res.redirect('https://youtu.be/dQw4w9WgXcQ')
    
})

//*EXO6
app.delete('/custom-header',(req,res) => {
    // console.log(req)
    // let message = req.params.id
    res.set({Message: "Hello world !"})
    res.send()
})


//*EXO8
app.get('/params/:id/:key/:slug',(req,res) => {
    res.set('content-type','application/json')
    res.send(req.params)
})

//*EXO9
app.get('/users',handlers.getUsers)
app.get('/users/:id',handlers.getUser)
app.post('/users',handlers.createUser)
app.delete('/users/:id',handlers.deleteUser)

}
