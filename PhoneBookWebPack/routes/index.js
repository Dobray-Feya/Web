const express = require("express");
const router = express.Router();

let contacts = []; // { name, phone }
let currentId = 1;

/* GET home page. */
router.get("/", function (req, res) {
    res.render("index", { title: "PhoneBook Vue Server" });
});

/* api/getContacts?term=search-text */
router.get("/api/getContacts", function (req, res) {
    const term = (req.query.term || "").toUpperCase();

    const result = term.length === 0
        ? contacts
        : contacts.filter(c => c.name.toUpperCase().includes(term) || c.phone.toUpperCase().includes(term));

    res.send(result);
});

/* id:4 */
router.delete("/api/deleteContact/:id", function (req, res) {
    const id = Number(req.params.id);

    const contactCountBeforeDeleting = contacts.length;

    contacts = contacts.filter(c => c.id !== id);

    if (contactCountBeforeDeleting === contacts.length) {
        res.send({
            success: false,
            message: `Контакт с id ${id} не найден`
        });
    } else {
        res.send({
            success: true,
            message: `Контакт удален (id: ${id})`
        });
    }
});

// { name, phone }
router.post("/api/createContact", function (req, res) {
    const contact = {
        id: currentId,
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

    if (!contact.phone) {
        res.send({
            success: false,
            message: "Не задан номер телефона"
        });

        return;
    }

    const upperCasePhone = contact.phone.toUpperCase();

    if (contacts.some(c => c.phone.toUpperCase() === upperCasePhone)) {
        res.send({
            success: false,
            message: `Контакт с номером телефона ${upperCasePhone} уже существует`
        });

        return;
    }

    contacts.push(contact);
    currentId++;

    res.send({
        success: true,
        message: `Контакт создан (id: ${contact.id}, name: ${contact.name}, phone: ${contact.phone})`
    });
});

router.post("/api/updateContact", function (req, res) {
    const id = req.body.id;
    const newName = req.body.name;
    const newPhone = req.body.phone;

    if (!newName) {
        res.send({
            success: false,
            message: "Не задано имя"
        });

        return;
    }

    if (!newPhone) {
        res.send({
            success: false,
            message: "Не задан номер телефона"
        });

        return;
    }

    const newPhoneInUpperCase = newPhone.toUpperCase();

    if (contacts.some(c => c.id !== id && c.phone.toUpperCase() === newPhoneInUpperCase)) {
        res.send({
            success: false,
            message: `Контакт с номером телефона ${newPhone} уже существует`
        });

        return;
    }

    const updatedContact = contacts.find(c => c.id === id);

    if (!updatedContact) {
        res.send({
            success: false,
            message: `Контакта с id ${id} не существует`
        });

        return;
    }

    updatedContact.name = newName;
    updatedContact.phone = newPhone;

    res.send({
        success: true,
        message: `Контакт обновлен (id: ${id}, name: ${newName}, phone: ${newPhone})`
    });
});

module.exports = router;