"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const todoForm = document.getElementById("todo-form");
    const addTaskField = document.getElementById("add-task-field");
    const todoList = document.getElementById("todo-list");

    todoForm.addEventListener("submit", function (e) {
        e.preventDefault(); /* чтобы форма не отправлялась и не выполнялось действие по умолчанию - перезагрузка страницы */

        let listItemText = addTaskField.value.trim();

        addTaskField.classList.remove("invalid");

        if (listItemText.length === 0) {
            addTaskField.classList.add("invalid");
            return;
        }

        const listItem = document.createElement("li");

        function setViewMode() {
            listItem.innerHTML = `<div class="list-item-string"></div>
                    <button type="button" class="list-item-edit-button">Редактировать</button>
                    <button type="button" class="list-item-remove-button">Удалить</button>`;

            const listItemString = listItem.querySelector(".list-item-string");
            listItemString.textContent = listItemText;

            listItem.querySelector(".list-item-remove-button").addEventListener("click", function () {
                listItem.remove();
            });

            listItem.querySelector(".list-item-edit-button").addEventListener("click", function () {
                listItem.innerHTML = `
                    <div>
                        <input type="text" class="edit-task-field"> 
                        <div class="error-message">Не введен текст</div>
                    </div>
                    <button type="button" class="list-item-cancel-button">Отменить</button>
                    <button type="button" class="list-item-save-button">Сохранить</button>`;

                const editTaskField = listItem.querySelector(".edit-task-field");
                editTaskField.value = listItemText;

                listItem.querySelector(".list-item-cancel-button").addEventListener("click", function () {
                    setViewMode();
                });

                const saveButton = listItem.querySelector(".list-item-save-button");

                listItem.querySelector(".edit-task-field").addEventListener("keyup", function (e) {
                    if (e.key === "Enter") {
                        saveButton.click();
                    }
                });

                saveButton.addEventListener("click", function () {
                    const editTaskField = listItem.querySelector(".edit-task-field");

                    const editedText = editTaskField.value.trim();

                    editTaskField.classList.remove("invalid");

                    if (editedText.length === 0) {
                        editTaskField.classList.add("invalid");
                        return;
                    }

                    listItemText = editedText;

                    setViewMode();
                });
            });
        }

        setViewMode();

        todoList.append(listItem);

        addTaskField.value = "";
    });
});