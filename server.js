var express    = require('express');
var app        = express();
var port       = 3000;
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sample-restapi');

var Contact = require('./app/models/contact');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.use(function (req, res, next) {
    console.log('main router');
    next();
});

// router contacts
router.route('/contacts')
    .post(function (req, res) {
        var contact = new Contact(req.body);

        contact.save(function (err) {
            if (err) {
                res.send(err);
            }

            res.status(201).send(contact);
        });
    })
    .get(function (req, res) {
        Contact.find(function (err, contacts) {
            if (err) {
                res.send(err);
            }

            res.json(contacts);
        });
    })
;
router.route('/contacts/:contact_id')
    .get(function (req, res) {
        Contact.findById(req.params.contact_id, function (err, contact) {
            if (err) {
                res.send(err);
            }

            res.json(contact);
        });
    })
    .put(function (req, res) {
        Contact.findById(req.params.contact_id, function (err, contact) {
            if (err) {
                res.send(err);
            }

            for (field in req.body) {
                contact[field] = req.body[field];
            }

            contact.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.json(contact);
            })
        });
    })
    .delete(function (req, res) {
        Contact.remove({
            _id: req.params.contact_id
        }, function (err, contact) {
            if (err) {
                res.send(err);
            }

            res.json({message:'Contact deleted'});
        });
    })
;


app.use('/api', router);

var server = app.listen(port);
console.log('Server started on port %s', server.address().port);
