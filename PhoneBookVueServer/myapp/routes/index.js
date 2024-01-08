var express = require('express');
var router = express.Router();

let contacs = []; // { id, name, phone }
let currentContactId = 1;

/* /getContacs?term=search-text */
router.get('/api/getContacs', function(req, res) {
    const term = (req.query.term || "").toUpperCase();

    const result = term.length === 0
        ? contacts
        : contacts.filter(c => c.name.toUpperCase().includes(term) || c.phone.toUpperCase().includes(term));

    res.send(result);
});

router.delete('/api/deleteContact/:id', function (req, res) {
    const id = req.params.id;

    contacts = contacs.filter(c => c.id !== id);

    res.send({
        success: true,
        message: null
    });
});

// { name, phone }
router.post('/api/createContact', function (req, res) {
    const contact = {
        id: currentContactId,
        name: req.body.name,
        phone: req.body.phone
    };

    if (!contact.name) {
        res.send({
            success: false,
            message: "Не задано имя"
        });

        return;
    }

    const upperCasePhone = contact.phone.toUpperCase();

    if (contacts.some(c => c.phone.toUpperCase() === upperCasePhone) {
        res.send({
            success: false,
            message: "Контакт с таким номером телефона уже существует"
        });

        return;
    }

    if (!contact.phone) {
        res.send({
            success: false,
            message: "Не задан номер телефона"
        });

        return;
    }

    contacs.push(contact);

    currentContactId++;

    res.send({
        success: true,
        message: null
    });
});

// TODO: updateContact

module.exports = router;
