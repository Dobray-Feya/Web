// Проверка текстовых полей. Пока здесть проверка на пустую строку и тестовая проверка на ":)"
// По идее здесь можно добавить другие проверки. Например, на отсутствие дубликата.
function validateInput(input) {
    if (input.length === 0) {
        return "Не введено значение";
    }

    if (input === ":)") {
        return "Недопустимое значение";
    }

    return "OK";
};

Vue.createApp({})
    .component("TodoList", {
        data() {
            return {
                items: [],
                newItemId: 1,
                newItemText: "",
                isInvalidInput: false,
                validateInputMessage:""
            };
        },

        template: "#todo-list-template",

        methods: {
            addNewItem() {
                this.validateInputMessage = validateInput(this.newItemText);

                if (this.validateInputMessage !== "OK") {
                    this.isInvalidInput = true;
                    return;
                }

                const newItem = {
                    id: this.newItemId,
                    text: this.newItemText
                };

                this.items.push(newItem);

                this.newItemId++;
                this.newItemText = "";
                this.isInvalidInput = false;
                this.validateInputMessage = "";
            },

            removeItem(item) {
                this.items = this.items.filter(e => e !== item);
            }
        }
    })
    .component("TodoListItem", {
        props: {
            item: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                isEditing: false,
                initialText: this.item.text,
                isInvalidInput: false,
                validateInputMessage: ""
        };
        },

        template: "#todo-item-template",

        methods: {
            edit() {
                this.isEditing = true;
                this.initialText = this.item.text;
            },

            remove() {
                this.$emit("remove-item", this.item);
            },

            save() {
                this.validateInputMessage = validateInput(this.item.text);

                if (this.validateInputMessage !== "OK") {
                    this.isInvalidInput = true;
                    return;
                }

                this.isEditing = false;
                this.isInvalidInput = false;
                this.validateInputMessage = "";
            },

            cancelEditing() {
                this.item.text = this.initialText;
                this.isEditing = false;
            }
        }
    }).mount("#app");