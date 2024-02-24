function validateInput(input) {
    if (input.length === 0) {
        return "Не введено значение";
    }

    return "";
}

function normalize(input) {
    return input.replace(/\n/g, ' ').replace(/\s+/g, ' ');
}

Vue.createApp({})
    .component("TodoList", {
        data() {
            return {
                items: [],
                newItemId: 1,
                newItemText: "",
                isInvalidInput: false,
                invalidInputMessage: ""
            };
        },

        template: "#todo-list-template",

        methods: {
            addNewItem() {
                this.invalidInputMessage = validateInput(this.newItemText);

                if (this.invalidInputMessage.length > 0) {
                    this.isInvalidInput = true;
                    return;
                }

                const newItem = {
                    id: this.newItemId,
                    text: normalize(this.newItemText)
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
                isInvalidInput: false,
                invalidInputMessage: ""
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
                this.invalidInputMessage = validateInput(this.item.text);

                if (this.invalidInputMessage.length > 0) {
                    this.isInvalidInput = true;
                    return;
                }

                this.item.text = normalize(this.item.text)
                this.isEditing = false;
                this.isInvalidInput = false;
            },

            cancelEditing() {
                this.item.text = this.initialText;
                this.isEditing = false;
            }
        }
    }).mount("#app");