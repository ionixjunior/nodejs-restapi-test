var express = require('express');
var router  = express.Router();
var Contact = require('../models/contact');

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

module.exports = router;
