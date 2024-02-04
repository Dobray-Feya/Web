/* Функции-обертки над axios, чтобы отправлять запросы на сервер */
/* delete - служебное слово, поэтому пришлось сделать executeDelete */

import axios from "axios";

function executeGet(url, data) {
    return axios.get(url, {
        params: data
    }).then(response => response.data);
}

function executePost(url, data) {
    return axios.post(url, data).then(response => response.data);
}

function executeDelete(url) {
    return axios.delete(url).then(response => response.data);
}

/* Класс, инкапсулирующий работу с сервером */
export default class PhoneBookService {
    constructor() {
        this.baseUrl = "/api/";
    }

    getContacts(term) {
        return executeGet(this.baseUrl + "getContacts", { term }); /* { term } - Это краткий синтаксис для { term: term } */
    }

    createContact(contact) {
        return executePost(this.baseUrl + "createContact", contact);
    }

    deleteContact(id) {
        return executeDelete(`${this.baseUrl}deleteContact/${id}`);
    }

    updateContact(contact) {
        return executePost(this.baseUrl + "updateContact", contact);
    }
}