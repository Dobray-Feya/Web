"use strict";

$(function () {
    const todoForm = $("#todo-form");
    const addTaskField = $("#add-task-field");
    const todoList = $("#todo-list");
    const addTaskButton = $("#add-task-button");

    todoForm.submit(function (e) {
        e.preventDefault(); /* чтобы форма не отправлялась и не выполнялось действие по умолчанию - перезагрузка страницы */
    });

    addTaskField.keyup(function (e) {
        if (e.key === "Enter") {
            addTaskButton.triggerHandler("click");
        }
    });

    addTaskButton.click(function () {
        let listItemText = addTaskField.val().trim();

        addTaskField.removeClass("invalid");

        if (listItemText.length === 0) {
            addTaskField.addClass("invalid");
            return;
        }

        const listItem = $("<li></li>");

        function setViewMode() {
            listItem.html(`
                <div class="list-item-string"></div>
                <button type="button" class="list-item-edit-button">Редактировать</button>
                <button type="button" class="list-item-remove-button">Удалить</button>
            `);

            const listItemString = listItem.find(".list-item-string");
            listItemString.text(listItemText);

            listItem.find(".list-item-remove-button").click(function () {
                $(function () {
                    $("#confirm-delete-dialog").dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Удалить": function () {
                                $(this).dialog("close");

                                listItem.remove();
                            },
                            "Отмена": function () {
                                $(this).dialog("close");
                            }
                        }
                    });
                });
            });

            listItem.find(".list-item-edit-button").click(function () {
                listItem.html(`
                    <div>
                        <input type="text" class="edit-task-field">
                        <div class="error-message">Не введен текст</div>
                    </div>
                    <button type="button" class="list-item-cancel-button">Отменить</button>
                    <button type="button" class="list-item-save-button">Сохранить</button>
                `);

                const editTaskField = listItem.find(".edit-task-field");
                editTaskField.val(listItemText);

                listItem.find(".list-item-cancel-button").click(function () {
                    setViewMode();
                });

                const saveButton = listItem.find(".list-item-save-button");

                listItem.find(".edit-task-field").keyup(function (e) {
                    if (e.key === "Enter") {
                        saveButton.triggerHandler("click");
                    }
                });

                saveButton.click(function () {
                    const editTaskField = listItem.find(".edit-task-field");

                    const editedText = editTaskField.val().trim();

                    editTaskField.removeClass("invalid");

                    if (editedText.length === 0) {
                        editTaskField.addClass("invalid");
                        return;
                    }

                    listItemText = editedText;

                    setViewMode();
                });
            });
        }

        setViewMode();

        todoList.append(listItem);

        addTaskField.val("");
    });
});