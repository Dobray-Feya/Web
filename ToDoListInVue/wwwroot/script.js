Vue.createApp({})
    .component("TodoList", {
        data() {
            return {
                items: [],
                newItemId: 1,
                newItemText: ""
            }
        },

        template: "#todo-list-template",

        methods: {
            addNewItem() {
                this.newItemText = this.newItemText.trim();

                if (this.newItemText.length !== 0) {
                    const newItem = {
                        id: this.newItemId,
                        text: this.newItemText
                    };

                    this.items.push(newItem);

                    this.newItemId++;
                    this.newItemText = "";
                }
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
                initialText: this.item.text
            }
        },

        template: "#todo-item-template",

        methods: {
            edit() {
                this.isEditing = true;
                this.initialText = this.item.text;
            },

            remove() {
                this.$emit("remove-item", this.item);
                console.log("remove: " + this.item.text); // delete
            },

            save() {
                this.item.text = this.item.text.trim();

                if (this.item.text.length !== 0) {
                    this.isEditing = false;
                }
            },

            cancelEditing() {
                this.item.text = this.initialText;
                this.isEditing = false;
            }
        }
    })
.mount("#app")