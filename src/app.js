const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const pathForViewsFolder = path.join(__dirname, '../templates/views')
const pathForPartialsFolder = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', pathForViewsFolder) // no need if the folder used is named "views" but just for the record
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(pathForPartialsFolder)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather value',
        name: 'Panagiotis'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Panagiotis'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is some help for you.',
        name: 'Panagiotis'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error: error })
        }
        console.log(location)
        //seconde callback chaining
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error:error })
            } else {
                return res.send({
                    forecast: data,
                    location: location,
                    address: req.query.address
                })
            }
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('*', (req, res) => {
    res.send('My 404 page')
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})