"use strict";

$(function () {
    const todoForm = $("#todo-form");
    const addNewTaskField = $("#add-new-task-field");
    const todolist = $("#todo-list");

    todoForm.submit(function (e) {
        e.preventDefault(); /* чтобы форма не отправлялась и не выполнялось действие по умолчанию - перезагрузка страницы */

        let newValue = $.trim(addNewTaskField.val());

        addNewTaskField.removeClass("invalid");

        if (newValue.length === 0) {
            addNewTaskField.addClass("invalid");
            return;
        }

        const listItem = $("<li></li>");

        let listItemValue = newValue;

        function setViewMode() {
            listItem.html(`
                    <span class="list-item-value" >${listItemValue}</span>
                    <button type="button" class="list-item-edit-button">Редактировать</button>
                    <button type="button" class="list-item-remove-button">Удалить</button>
                    `);

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
                            Отмена: function () {
                                $(this).dialog("close");
                            }
                        }
                    });
                });
            })

            listItem.find(".list-item-edit-button").click(function () {
                listItem.html(`
                    <div>
                        <input type="text" class="edit-task-field" id="edit-task-field" value="${listItemValue}">
                        <div class="error-message">Не введен текст</div>
                    </div>
                    <button type="button" class="list-item-cancel-button">Отменить</button>
                    <button type="button" class="list-item-save-button">Сохранить</button>
                    `);

                listItem.find(".list-item-cancel-button").click(function () {
                    setViewMode();
                })

                listItem.find(".list-item-save-button").click(function () {

                    const editTaskField = $("#edit-task-field");

                    let editedValue = $.trim(editTaskField.val());

                    editTaskField.removeClass("invalid");

                    if (editedValue.length === 0) {
                        editTaskField.addClass("invalid");
                        return;
                    }

                    listItemValue = editedValue;

                    setViewMode();
                })
            })
        }

        setViewMode();

        todolist.append(listItem);

        addNewTaskField.val("");
    })
})