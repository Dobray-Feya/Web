"use strict";

$(function () {
    const addContactForm = $("#add-contact-form");
    const contactsTable = $("#contacts-table");
    const lastNameField = $("#last-name-field");
    const nameField = $("#name-field");
    const phoneField = $("#phone-field");
    const checkAllCheckbox = $("#checkbox-th input:checkbox");
    const deleteSelectedContactsButton = $("#delete-selected-contacts-button");

    deleteSelectedContactsButton.click(function () {
        const checkedRows = $("#contacts-table tbody tr").filter(function () {
            return $(this).find(".checkbox-td input").is(":checked");
        });

        function showDeletionDialog() {
            $("#confirm-delete-dialog").dialog({
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                    "Удалить": function () {
                        $(this).dialog("close");

                        rowsCount -= checkedRows.length;

                        checkedRows.remove();

                        function updateRowsIds() {
                            $("#contacts-table tbody tr").each(function (i) {
                                $(this).find(".row-id-td").text(i + 1);
                            });
                        }

                        updateRowsIds();
                    },
                    "Отмена": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }

        function showNoCheckedContactsDialog() {
            $(function () {
                $("#no-checked-contacts-dialog-message").dialog({
                    modal: true,
                    buttons: {
                        OK: function () {
                            $(this).dialog("close");
                        }
                    }
                });
            });
        }

        if (checkedRows.length > 0) {
            showDeletionDialog();
        } else {
            showNoCheckedContactsDialog();
        }
    });

    let rowsCount = 0;

    addContactForm.submit(function (e) {
        e.preventDefault();

        function isEmpty(text) {
            return text.length === 0;
        }

        function showError(errorField, text) {
            errorField.addClass("invalid");
            errorField.prop("placeholder", text);
        }

        lastNameField.val(lastNameField.val().trim());
        let lastName = lastNameField.val();

        nameField.val(nameField.val().trim());
        let name = nameField.val();

        phoneField.val(phoneField.val().trim());
        let phone = phoneField.val();

        let isError = false;

        if (isEmpty(lastName)) {
            showError(lastNameField, "Не указана фамилия");

            isError = true;
        } else {
            lastNameField.removeClass("invalid");
            lastNameField.prop("placeholder", "Введите фамилию");
        }

        if (isEmpty(name)) {
            showError(nameField, "Не указано имя");

            isError = true;
        } else {
            nameField.removeClass("invalid");
            nameField.prop("placeholder", "Введите имя");
        }

        if (isEmpty(phone)) {
            showError(phoneField, "Не указан номер телефона");

            isError = true;
        } else {
            phoneField.removeClass("invalid");
            phoneField.prop("placeholder", "Введите номер телефона");
        }

        if (isError) {
            isError = false;

            return;
        }

        function isInContacts(number) {
            let isInContacts = false;

            $("#contacts-table tbody tr").each(function () {
                if ($(this).find(".phone-td").text() === number) {
                    isInContacts = true;
                    return false;
                }
            });

            return isInContacts;
        }

        function showNotUniquePhoneNumberDialog() {
            $(function () {
                $("#not-unique-phone-number-dialog-message").dialog({
                    modal: true,
                    buttons: {
                        OK: function () {
                            $(this).dialog("close");
                        }
                    }
                });
            })
        }

        if (isInContacts(phone)) {
            showNotUniquePhoneNumberDialog();
            return;
        }

        rowsCount++;
        let rowId = rowsCount;

        let isRowChecked = false;

        const tableRow = $("<tr>");
        contactsTable.append(tableRow);

        function setViewMode() {
            tableRow.append(`<td class="checkbox-td center"><input type="checkbox"></td>`);
            tableRow.find(".checkbox-td input:checkbox").prop("checked", isRowChecked);

            tableRow.append(`<td class="row-id-td center"></td>`);
            tableRow.find(".row-id-td").text(rowId);

            tableRow.append(`<td class="last-name-td"></td>`);
            tableRow.find(".last-name-td").text(lastName);

            tableRow.append(`<td class="name-td"></td>`);
            tableRow.find(".name-td").text(name);

            tableRow.append(`<td class="phone-td"></td>`);
            tableRow.find(".phone-td").text(phone);

            tableRow.append(`<td class="center"><img class="edit-button" src="Images/edit.svg"> <img class="delete-button" src="Images/delete.svg"></td>`);

            checkAllCheckbox.change(function () {
                const isChecked = checkAllCheckbox.is(":checked");
                $("#contacts-table td input:checkbox").prop("checked", isChecked);
            });

            tableRow.find(".checkbox-td input:checkbox").change(function () {
                checkAllCheckbox.prop("checked", false);
            });

            tableRow.find(".delete-button").click(function () {
                $(function () {
                    $("#confirm-delete-dialog").dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "Удалить": function () {
                                $(this).dialog("close");

                                tableRow.remove();
                                rowsCount--;

                                function updateRowsIds() {
                                    $("#contacts-table tbody tr").each(function (i) {
                                        $(this).find(".row-id-td").text(i + 1);
                                    });
                                }

                                updateRowsIds();
                            },
                            "Отмена": function () {
                                $(this).dialog("close");
                            }
                        }
                    });
                });
            });

            tableRow.find(".edit-button").click(function () {
                isRowChecked = tableRow.find(".checkbox-td input:checkbox").is(":checked");
                rowId = tableRow.find(".row-id-td").text();
                lastName = tableRow.find(".last-name-td").text();
                name = tableRow.find(".name-td").text();
                phone = tableRow.find(".phone-td").text();

                tableRow.html("");
                tableRow.append(`<td class="checkbox-td center"><input type="checkbox"></td>`);
                tableRow.find(".checkbox-td input:checkbox").prop("checked", isRowChecked);

                tableRow.append(`<td class="center">${rowId}</td>`);

                tableRow.append(`<td><input class="last-name-input"></td>`);
                tableRow.find(".last-name-input").val(lastName);

                tableRow.append(`<td><input class="name-input"></td>`);
                tableRow.find(".name-input").val(name);

                tableRow.append(`<td><input class="phone-input"></td>`);
                tableRow.find(".phone-input").val(phone);

                tableRow.append(`<td class="center"><img class="save-button" src="Images/save.svg"> <img class="cancel-button" src="Images/cancel.svg"></td>`);

                tableRow.find(".checkbox-td input:checkbox").change(function () {
                    checkAllCheckbox.prop("checked", false);
                });

                tableRow.find(".save-button").click(function () {
                    isRowChecked = tableRow.find(".checkbox-td input:checkbox").is(":checked");

                    let isCellError = false;

                    const lastNameCell = tableRow.find(".last-name-input");
                    const newLastName = lastNameCell.val().trim();
                    lastNameCell.val(newLastName);

                    const nameCell = tableRow.find(".name-input");;
                    const newName = nameCell.val().trim();
                    nameCell.val(newName);

                    const phoneCell = tableRow.find(".phone-input");;
                    const newPhone = phoneCell.val().trim();
                    phoneCell.val(newPhone);

                    if (isEmpty(newLastName)) {
                        showError(lastNameCell, "Не указана фамилия");

                        isCellError = true;
                    } else {
                        lastNameCell.removeClass("invalid");
                    }

                    if (isEmpty(newName)) {
                        showError(nameCell, "Не указано имя");

                        isCellError = true;
                    } else {
                        nameCell.removeClass("invalid");
                    }

                    if (isEmpty(newPhone)) {
                        showError(phoneCell, "Не указан номер телефона");

                        isCellError = true;
                    } else {
                        phoneCell.removeClass("invalid");
                    }

                    if (isCellError) {
                        isCellError = false;

                        return;
                    }

                    if (isInContacts(newPhone)) {
                        showNotUniquePhoneNumberDialog();

                        return;
                    }

                    lastName = newLastName;
                    name = newName;
                    phone = newPhone;

                    tableRow.html("");
                    setViewMode();
                });

                tableRow.find(".cancel-button").click(function () {
                    tableRow.html("");
                    setViewMode();
                });
            });
        }

        setViewMode();

        $("#last-name-field").val("");
        $("#name-field").val("");
        $("#phone-field").val("");
        checkAllCheckbox.prop("checked", false);
    });
});