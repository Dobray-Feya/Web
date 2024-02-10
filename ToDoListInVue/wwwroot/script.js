// Проверка текстовых полей. Пока здесть проверка на пустую строку и тестовая проверка на ":)"
// По идее здесь можно добавить другие проверки. Например, на отсутствие дубликата.
function isValid(input) {
    return input.length > 0 && input !== ":)";
};

Vue.createApp({})
    .component("TodoList", {
        data() {
            return {
                items: [],
                newItemId: 1,
                newItemText: "",
                isInvalidInput: false
            };
        },

        template: "#todo-list-template",

        methods: {
            addNewItem() {
                if (!isValid(this.newItemText)) {
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
                isInvalidInput: false
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
                if (!isValid(this.item.text)) {
                    this.isInvalidInput = true;
                    return;
                }

                this.isEditing = false;
                this.isInvalidInput = false;
            },

            cancelEditing() {
                this.item.text = this.initialText;
                this.isEditing = false;
            }
        }
    }).mount("#app");