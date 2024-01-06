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

        methods: {
            editItem() {
                this.isEditing = true;
            },

            saveItem() {
                this.isEditing = false;
            }
        },

        template: `
        <li>
            <div v-if="!isEditing" class="row mb-2">
                <span class="col me-1">{{ item.text }}</span>
                <div class="col-auto me-1">
                   <button type="button"
                           class="btn btn-primary"
                           @click="editItem">
                           Редактировать
                   </button>
                </div>
                <div class="col-auto">
                   <button type="button"
                           class="btn btn-danger"
                           @click="deleteItem">
                           Удалить
                   </button>
                </div>
           </div>
           <div v-else class="row mb-2">
               <input type="text" 
                      v-model="item.text"
                      class="col me-1 form-control">
               <div class="col-auto me-1">
                  <button type="button"
                           class="btn btn-success"
                           @click="saveItem">
                           Сохранить
                   </button>
                </div>
                <div class="col-auto">
                   <button type="button"
                           class="btn btn-secondary"
                           @click="cancelEditingItem">
                           Отменить
                   </button>
                </div>
           </div>
        </li>`
    })
.mount("#app")