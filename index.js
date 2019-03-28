//Modules
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const helmet = require('helmet')
const config = require('./app/config')

//App configuration
const app = express()
const routers = require('./app/routers')
const PORT = process.env.PORT || 3801

const conn = new Promise((resolve, reject) => {
	mongoose.connect(config.database, { useNewUrlParser: true }, (err, res) => {
		if (err) {
			reject(err)
		} else {
			resolve('Connection success')
		}
	})
})

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/v1', routers)
app.use(helmet())
app.use((req, res, next) => {
	res.status(404)
	if(req.accepts('json')) {
		res.send({ error: 'Not Found' })
		return;
	}
	res.type('txt').send('Not Found')
})
conn
.then( response => console.log(response) )
.catch( error => console.log(error) )

app.listen(PORT, () => console.log(`listening on port ${PORT}`))