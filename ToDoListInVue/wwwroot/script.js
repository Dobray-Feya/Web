Vue.createApp({})
    .component("TodoList", {
        data() {
            return {
                items: [],
                newTodoItemId: 1,
                newTodoItemText: ""
            }
        },

        methods: {
            addNewTodoItem() {
                const newTodoItem = {
                    id: this.newTodoItemId,
                    text: this.newTodoItemText
                };

                this.items.push(newTodoItem);

                this.newTodoItemId++;
                this.newTodoItemText = "";
            }
        },

        template: `
        <form @submit.prevent="addNewTodoItem" class="row mb-3">
            <label class="col">
                <input type="text" v-model="newTodoItemText" class="form-control"/>
            </label>
            <div class="col-auto">
                <button class="btn btn-primary">Добавить</button>
            </div>
        </form>
        <ul class="list-unstyled">
            <todo-list-item v-for="item in items"
                            :key="item.id" 
                            :item="item">
            </todo-list-item>
        </ul>`
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
                isEditing: false
            }
        },

        template: `
        <li>
            <div v-if="!isEditing" class="row">
                <span class="col me-1">{{ item.text }}</span>
                <button type="button" class="btn btn-primary col-auto me-1">Редактировать</button>
                <button type="button" class="btn btn-danger col-auto">Удалить</button>
           </div>
           <div v-else>
               <input type="text" v-model="item.text">
           </div>
        </li>`
    })
.mount("#app")