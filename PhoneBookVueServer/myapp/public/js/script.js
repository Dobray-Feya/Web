/* Функции-обертки над axios, чтобы отправлять запросы на сервер */
/* delete - служебное слово, поэтому пришлось сделать executeDelete */

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
class PhoneBookService {
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

Vue.createApp({
    data() {
        return {
            contacts: [],
            id: 1,      // id, name, phone - параметры нового контакта
            name: "",
            phone: "",
            term: "",   // строка поиска
            service: new PhoneBookService()
        };
    },

    created() {
        this.loadContacts();
    },

    methods: {
        loadContacts() {
            this.service.getContacts(this.term).then(contacts => {
                this.contacts = contacts;
            }).catch(() => alert("Не удалось загрузить контакты"));
        },

        createContact() {
            const contact = {
                id: this.id,  //в модель передаются только id, name, phone
                name: this.name,
                phone: this.phone,
                isEditing: false, //isEditing, newName, newPhone используются только во VM
                newName: "",
                newPhone: ""
            }

            this.service.createContact(contact).then(response => {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                this.id++;
                this.name = "";
                this.phone = "";

                this.loadContacts();
            }).catch(() => alert("Не удалось создать контакт"));
        },

        deleteContact(contact) {
            this.service.deleteContact(contact.id).then(response => {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                this.loadContacts();
            }).catch(() => alert("Не удалось удалить контакт"));
        },

        editContact(contact) {
            contact.newName = contact.name;
            contact.newPhone = contact.phone;
            contact.isEditing = true;
        },

        cancelEditing(contact) {
            contact.newName = "";
            contact.newPhone = "";
            contact.isEditing = false;
        },

        saveContact(contact) {
            const newName = contact.newName;
            const newPhone = contact.newPhone;

            const updatedContact = {
                id: contact.id,
                name: newName,
                phone: newPhone
            };

            this.service.updateContact(updatedContact).then(response => {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                contact.name = newName;
                contact.phone = newPhone;
                contact.newName = "";
                contact.newPhone = "";
                contact.isEditing = false;
            }).catch(() => alert("Не удалось обновить контакт"));
        },

        clear() {
            this.name = "";
            this.phone = "";
        }
    }
}).mount("#app");