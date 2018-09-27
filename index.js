const express = require('express')
const request = require('request')
const parseString = require('xml2js').parseString
const app = express()
const port = process.env.PORT || 3000

var cors = require('cors')
app.use(cors())

app.use(express.static('public'))
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

function getRoute(id) {
	return 'http://ws.petango.com/webservices/wsAdoption.asmx/HappyTailList?pAuthKey=qi4df18b115g38b4w4lk9a85s38oa8n5oudp2hi1u127mz60dn&Location=Canine&pSpeciesID=' + id + '&pSiteID=0&pOrderBy=AdoptionDateLast&pCount=99&pFeaturedPet=Include'
}

function getPets(id, req, res) {
	var route = getRoute(id);
	
	request(route, (err, response, body) => {
        if (err) { return console.log(err); }
        parseString(body, (error, result) => {
            if (error) { return console.log(error); }
            res.status(200).send(result)
        })
    });
}

app.get('/getpets', function (req, res) {
    getPets(0, req, res);
})

app.get('/getpets/dogs', function (req, res) {
	getPets(1, req, res);
})

app.get('/getpets/cats', function (req, res) {
	getPets(2, req, res);
})

app.get('/*', function (req, res) {

    res.render('index', { title: 'Hey', message: 'Hello there!' })

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))