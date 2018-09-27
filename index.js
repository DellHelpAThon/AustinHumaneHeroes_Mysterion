const express = require('express')
const request = require('request')
const parseString = require('xml2js').parseString
const app = express()
const port = process.env.PORT || 3000

app.get('/getPets', function (req, res) {
    request('http://ws.petango.com/webservices/wsAdoption.asmx/HappyTailList?pAuthKey=qi4df18b115g38b4w4lk9a85s38oa8n5oudp2hi1u127mz60dn&Location=Canine&pSpeciesID=1&pSiteID=0&pOrderBy=AdoptionDateLast&pCount=99&pFeaturedPet=Include', (err, response, body) => {
        if (err) { return console.log(err); }
        //console.log(body.url);
        //console.log(body.explanation);
        parseString(body, (error, result) => {
            if (error) { return console.log(error); }
            res.status(200).send(result)
        })
    });
    //res.send(xml)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))