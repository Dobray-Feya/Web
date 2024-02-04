<template>
    <div class="container">
        <h1 class="mb-3 mt-3">Контакты</h1>

        <form @submit.prevent="createContact">
            <h2 class="h5 mt-3">Добавить контакт</h2>

            <div class="row">
                <div class="col-4">
                    <input v-model.trim="name" type="text" name="name" class="form-control" placeholder="Имя">
                </div>
                <div class="col-4">
                    <input v-model.trim="phone" type="text" name="phone" class="form-control ms-2" placeholder="Телефон">
                </div>
                <button type="submit" class="btn btn-primary col-auto ms-2">Добавить</button>
                <button @click="clear" type="button" class="btn btn-secondary col-auto ms-2">Очистить</button>
            </div>
        </form>

        <form @submit.prevent="loadContacts">
            <h2 class="h5 mt-5">Найти контакты</h2>

            <div class="row">
                <div class="col-4">
                    <input v-model.trim="term" type="text" name="term" class="form-control" placeholder="Поиск">
                </div>
                <button type="submit" class="btn btn-primary col-auto ms-2">Поиск</button>
            </div>
        </form>

        <div class="table-responsive mt-3">
            <table class="table align-middle">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Имя</th>
                        <th>Телефон</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-cloak v-for="(contact, index) in contacts" :key="contact.id">
                    <tr v-if="!contact.isEditing">
                        <td>{{ index + 1 }}</td>
                        <td>{{ contact.name }}</td>
                        <td>{{ contact.phone }}</td>
                        <td>
                            <i class="bi bi-pencil button me-3" @click="editContact(contact)" title="Редактировать"></i>

                            <i class="bi bi-trash3 button" title="Удалить" data-bs-toggle="modal" :data-bs-target="'#deletingModal' + contact.id"></i>

                            <div class="modal fade" :id="'deletingModal' + contact.id" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="modalLabel">Подтвердите удаление</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            Контакт (имя: {{ contact.name }}, телефон: {{ contact.phone }}) будет удален из телефонной книги.
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="deleteContact(contact)">Удалить</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-else>
                        <td>{{ index + 1 }}</td>
                        <td><input v-model.trim="contact.newName"></td>
                        <td><input v-model.trim="contact.newPhone"></td>
                        <td>
                            <i class="bi bi-check-circle button me-3" @click="saveContact(contact)" title="Сохранить"></i>
                            <i class="bi bi-dash-circle button" @click="cancelEditing(contact)" title="Отменить"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

    import PhoneBookService from "./phoneBookService";

    export default {
        name: "App",

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
};
</script>