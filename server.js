const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const User = require('./model/user')
const bodyParser = require('body-parser')
const app = express()
/*app.use(express.urlencoded({extended : true}))*/

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('connected to mongodb')
}).catch((error) => {
    console.log('error', error)
})


app.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/', async (req, res) => {
    const user = new User(req.body)
    try {
        const result = await user.save()
        res.send(result)
        console.log(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        if (!user) {
            return res.status(400).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(400).send('user not found')
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }

})

app.listen(3000, () => {
    console.log('server running on port 3000')
})