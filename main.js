const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
let md5 = require('md5');
const dotenv = require('dotenv');
dotenv.config();

const serveStatic = require('serve-static')
const path = require('path')

const app = express();



app.use(cors());
app.use(bodyParser.json());



//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
})





const ts = new Date().getTime()

//CHARACTERS
/* get all characters */
app.get('/characters', async (req, res) => {
    var result = null;
    await axios.get(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${process.env.publicKey}&hash=${md5(ts + process.env.privateKey + process.env.publicKey)}`,
        {
            params: {
                offset: (req.query.page - 1) * 20
            }
        }).then(res => {
            result = res.data
        }).catch(err => {
            console.log(err)
        })
    res.json(result);
});

/* Get Single Character */
app.get('/character', async (req, res) => {
    let result = null;
    const charId = req.query.charId

    await axios.get(`http://gateway.marvel.com/v1/public/characters/${charId}?ts=${ts}&apikey=${process.env.publicKey}&hash=${md5(ts + process.env.privateKey + process.env.publicKey)}`,
    ).then(res => {
        result = res.data
    }).catch(err => {
        console.log(err)
    })
    res.json(result);
});


//COMICS
//GET ALL Comics
app.get('/comics', async (req, res) => {
    var result = null;
    await axios.get(`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${process.env.publicKey}&hash=${md5(ts + process.env.privateKey + process.env.publicKey)}`,
        {
            params: {
                offset: (req.query.page - 1) * 20
            }
        }).then(res => {
            result = res.data
        }).catch(err => {
            console.log(err)
        })
    res.json(result);
});

/* Get Single Comics details */
app.get('/comic', async (req, res) => {
    let result = null;
    const comicsId = req.query.comicsId

    await axios.get(`http://gateway.marvel.com/v1/public/comics/${comicsId}?ts=${ts}&apikey=${process.env.publicKey}&hash=${md5(ts + process.env.privateKey + process.env.publicKey)}`,
    ).then(res => {
        result = res.data
    }).catch(err => {
        console.log(err)
    })
    res.json(result);
});


//SERIES
//GET ALL Series
app.get('/series', async (req, res) => {
    var result = null;
    await axios.get(`http://gateway.marvel.com/v1/public/series?ts=${ts}&apikey=${process.env.publicKey}&hash=${md5(ts + process.env.privateKey + process.env.publicKey)}`,
        {
            params: {
                offset: (req.query.page - 1) * 20
            }
        }).then(res => {
            result = res.data
        }).catch(err => {
            console.log(err)
        })
    res.json(result);
});

/* Get Single Serie details */
app.get('/serie', async (req, res) => {
    let result = null;
    const SerieId = req.query.SerieId

    await axios.get(`http://gateway.marvel.com/v1/public/series/${SerieId}?ts=${ts}&apikey=${process.env.publicKey}&hash=${md5(ts + process.env.privateKey + process.env.publicKey)}`,
    ).then(res => {
        result = res.data
    }).catch(err => {
        console.log(err)
    })
    res.json(result);
});


//SERIES
//GET ALL Stories
app.get('/stories', async (req, res) => {
    var result = null;
    await axios.get(`http://gateway.marvel.com/v1/public/stories?ts=${ts}&apikey=${process.env.publicKey}&hash=${md5(ts + process.env.privateKey + process.env.publicKey)}`,
        {
            params: {
                offset: (req.query.page - 1) * 20
            }
        }).then(res => {
            result = res.data
        }).catch(err => {
            console.log(err)
        })
    res.json(result);
});
/* Get Single Story details */
app.get('/story', async (req, res) => {
    let result = null;
    const StoryId = req.query.StoryId

    await axios.get(`http://gateway.marvel.com/v1/public/stories/${StoryId}?ts=${ts}&apikey=${process.env.publicKey}&hash=${md5(ts + process.env.privateKey + process.env.publicKey)}`,
    ).then(res => {
        result = res.data
    }).catch(err => {
        console.log(err)
    })
    res.json(result);
});

//SEARCH
//Search for character (namestartsWith)
app.get('/char', async (req, res) => {
    var result = null;
    const searchChar = req.query.searchChar
    await axios.get(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchChar}&ts=${ts}&apikey=${process.env.publicKey}&hash=${md5(ts + process.env.privateKey + process.env.publicKey)}`,
        {
            params: {
                offset: (req.query.searchPage - 1) * 20
            }
        }).then(res => {
            result = res.data
        }).catch(err => {
            console.log(err)
        })
    res.json(result);
});

//Search for comics (titlestartsWith)
app.get('/searchcomics', async (req, res) => {
    var result = null;
    const searchComics = req.query.searchComics
    await axios.get(`http://gateway.marvel.com/v1/public/comics?titleStartsWith=${searchComics}&ts=${ts}&apikey=${process.env.publicKey}&hash=${md5(ts + process.env.privateKey + process.env.publicKey)}`,
        {
            params: {
                offset: (req.query.searchPage - 1) * 20
            }
        }).then(res => {
            result = res.data
        }).catch(err => {
            console.log(err)
        })
    res.json(result);
});


//Search for comics (titlestartsWith)
app.get('/searchseries', async (req, res) => {
    var result = null;
    const searchSeries = req.query.searchSeries
    await axios.get(`http://gateway.marvel.com/v1/public/series?titleStartsWith=${searchSeries}&ts=${ts}&apikey=${process.env.publicKey}&hash=${md5(ts + process.env.privateKey + process.env.publicKey)}`,
        {
            params: {
                offset: (req.query.searchPage - 1) * 20
            }
        }).then(res => {
            result = res.data
        }).catch(err => {
            console.log(err)
        })
    res.json(result);
});



const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});