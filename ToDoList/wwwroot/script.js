"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const todoForm = document.getElementById("todo-form");
    const addNewTaskField = document.getElementById("add-new-task-field");
    const todolist = document.getElementById("todo-list");

    todoForm.addEventListener("submit", function (e) {
        e.preventDefault(); /* чтобы форма не отправлялась и не выполнялось действие по умолчанию - перезагрузка страницы */

        let newValue = addNewTaskField.value.trim();

        addNewTaskField.classList.remove("invalid");

        if (newValue.length === 0) {
            addNewTaskField.classList.add("invalid");
            return;
        }

        const listItem = document.createElement("li");

        let listItemValue = newValue;

        function setViewMode() {
            listItem.innerHTML = `<span class="list-item-value" >${listItemValue}</span>
                    <button type="button" class="list-item-edit-button">Редактировать</button>
                    <button type="button" class="list-item-remove-button">Удалить</button>`;

            listItem.querySelector(".list-item-remove-button").addEventListener("click", function () {
                listItem.remove();
            })

            listItem.querySelector(".list-item-edit-button").addEventListener("click", function () {
                listItem.innerHTML = `
                    <div>
                        <input type="text" class="edit-task-field" id="edit-task-field" value="${listItemValue}">
                        <div class="error-message">Не введен текст</div>
                    </div>
                    <button type="button" class="list-item-cancel-button">Отменить</button>
                    <button type="button" class="list-item-save-button">Сохранить</button>
                    `;

                listItem.querySelector(".list-item-cancel-button").addEventListener("click", function () {
                    setViewMode();
                })

                listItem.querySelector(".list-item-save-button").addEventListener("click", function () {

                    const editTaskField = document.getElementById("edit-task-field");

                    let editedValue = editTaskField.value.trim();

                    editTaskField.classList.remove("invalid");

                    if (editedValue.length === 0) {
                        editTaskField.classList.add("invalid");
                        return;
                    }

                    listItemValue = editedValue;

                    setViewMode();
                })
            })
        }

        setViewMode();

        todolist.append(listItem);

        addNewTaskField.value = "";
    })
})