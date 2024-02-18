<template>
    <div class="container">

        <h1 class="mb-3 mt-3">Контакты</h1>
        <form @submit.prevent="createContact">
            <h2 class="h5 mt-3">Добавить контакт</h2>
            <div class="row">
                <div class="col-4 mb-2 mx-2 px-0">
                    <input v-model.trim="name"
                           type="text"
                           class="form-control"
                           placeholder="Имя"
                           required>
                </div>
                <div class="col-3 mb-2 mx-2 px-0">
                    <input v-model.trim="phone"
                           type="text"
                           class="form-control"
                           placeholder="Телефон"
                           required>
                </div>
                <button type="submit"
                        class="btn btn-primary col-auto mb-2 mx-2">
                    Добавить
                </button>
                <button type="button"
                        @click="clearContacts"
                        class="btn btn-secondary col-auto mb-2 mx-2">
                    Очистить
                </button>
            </div>
        </form>

        <form @submit.prevent="loadContacts">
            <h2 class="h5 mt-3">Найти контакты</h2>
            <div class="row">
                <div class="col-4 mb-2 mx-2 px-0">
                    <input v-model.trim="term"
                           type="text"
                           class="form-control"
                           placeholder="Поиск">
                </div>
                <button type="submit"
                        class="btn btn-primary col-auto mb-2 mx-2">
                    Поиск
                </button>
                <button type="button"
                        @click="clearTerm"
                        class="btn btn-secondary col-auto mb-2 mx-2">
                    Очистить
                </button>
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
                                            <button type="button"
                                                    class="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            Контакт (имя: {{ contact.name }}, телефон: {{ contact.phone }}) будет удален из телефонной книги.
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button"
                                                    class="btn btn-secondary"
                                                    data-bs-dismiss="modal">
                                                Отменить
                                            </button>
                                            <button type="button"
                                                    class="btn btn-primary"
                                                    data-bs-dismiss="modal"
                                                    @click="deleteContact(contact)">
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-else>
                        <td>{{ index + 1 }}</td>
                        <td>
                            <input type="text"
                                   v-model.trim="contact.newName"
                                   class="form-control">
                        </td>
                        <td>
                            <input type="text"
                                   v-model.trim="contact.newPhone"
                                   class="form-control">
                        </td>
                        <td>
                            <i class="bi bi-check-circle button me-3"
                               @click="saveContact(contact)"
                               title="Сохранить">
                            </i>
                            <i class="bi bi-dash-circle button"
                               @click="cancelEditing(contact)"
                               title="Отменить">
                            </i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Диалог для показа сообщений об ошибке -->
        <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modalLabel">Произошла ошибка</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {{ errorText }}
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal">
                            Понятно
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import bootstrap from "../node_modules/bootstrap/dist/js/bootstrap.bundle";

    import PhoneBookService from "./phoneBookService";

    export default {
        name: "App",

        data() {
            return {
                contacts: [],
                name: "",      // name, phone - параметры нового контакта
                phone: "",
                term: "",      // строка поиска
                errorText: "", // текcт ошибки от сервера, если во время выполнения запроса произошла ошибка
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
                }).catch(() => this.showError("Не удалось загрузить контакты"));
            },

            showError(text) {
                this.errorText = text;
                const errorModal = new bootstrap.Modal("#errorModal");
                errorModal.show();
            },

            createContact() {
                const contact = {
                    name: this.name,
                    phone: this.phone
                }

                // В модель передаем только name и phone
                this.service.createContact(contact).then(response => {
                    if (!response.success) {
                        this.showError(response.message);
                        return;
                    }

                    // Добавляем дополнительные поля, которые нужны только во VM
                    contact.isEditing = false;
                    contact.newName = "";
                    contact.newPhone = "";

                    this.name = "";
                    this.phone = "";

                    this.loadContacts();
                }).catch(() => this.showError("Не удалось создать контакт"));
            },

            deleteContact(contact) {
                this.service.deleteContact(contact.id).then(response => {
                    if (!response.success) {
                        showError(response.message);
                        return;
                    }

                    this.loadContacts();
                }).catch(() => this.showError("Не удалось удалить контакт"));
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
                        this.showError(response.message);
                        return;
                    }

                    this.loadContacts();
                }).catch(() => this.showError("Не удалось обновить контакт"));
            },

            clearContacts() {
                this.name = "";
                this.phone = "";
            },

            clearTerm() {
                this.term = "";
                this.loadContacts();
            }
        }
    };
</script>