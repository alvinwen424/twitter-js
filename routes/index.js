const router = require('express').Router();
const tweetBank = require('../tweetBank');
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })



module.exports = (io) => {
    
    router.get('/', function (req, res) {
        let tweets = tweetBank.list();
        res.render('index', { tweets: tweets, showForm: true });
    });

    router.post('/tweets', urlencodedParser, function (req, res) {
        var name = req.body.name;
        var text = req.body.text;
        // io.sockets.emit('newTweet', {name: name, text: text});
        tweetBank.add(name, text);
        res.redirect('/');
    });

    router.get('/users/:name', function (req, res) {
        var name = req.params.name;
        var list = tweetBank.find({ name: name });

        res.render('index', { tweets: list, showForm: true, name: list[0].name });
    });

    router.get('/tweets/:id', function (req, res) {
        let id = req.params.id;
        var tweet = tweetBank.find({ id: +id });
        res.render('index', { tweets: tweet });
    });

    return router;
}