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
        const checkedRows = $("#contacts-table tbody tr").filter(function (i) {
            return $(this).find(".checkbox-td input:checked").is(":checked");
        })

        function showDeletionDialog() {
            $("#confirm-delete-dialog").dialog({
                resizable: false,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                    "Удалить": function () {
                        $(this).dialog("close");

                        checkedRows.each(function (i) {
                            $(this).remove();
                            rowsCount--;
                        })

                        function updateRowsIds() {
                            $("#contacts-table tbody tr").each(function (i) {
                                $(this).find(".row-id-td").text(i + 1);
                            })
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
    })

    let rowsCount = 0;

    addContactForm.submit(function (e) {
        e.preventDefault();

        function isEmpty(text) {
            if (text.length === 0) {
                return true;
            }

            return false;
        }

        function showError(errorField, text) {
            errorField.addClass("invalid");
            errorField.attr("placeholder", text);
        }

       /* let lastName = lastNameField.val().trim();
        let name = nameField.val().trim();
        let phone = phoneField.val().trim();*/

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
            lastNameField.attr("placeholder", "Введите фамилию");
        }

        if (isEmpty(name)) {
            showError(nameField, "Не указано имя");

            isError = true;
        } else {
            nameField.removeClass("invalid");
            nameField.attr("placeholder", "Введите имя");
        }

        if (isEmpty(phone)) {
            showError(phoneField, "Не указан номер телефона");

            isError = true;
        } else {
            phoneField.removeClass("invalid");
            phoneField.attr("placeholder", "Введите номер телефона");
        }

        if (isError) {
            isError = false;

            return;
        }

        function isInContacts(number) {
            let isInContacts = false;

            $("#contacts-table tbody tr").each(function (i) {
                if ($(this).find(".phone-td").text() === number) {
                    isInContacts = true;
                    return false;
                }
            })

            return isInContacts;
        }

        function showNotUniqPhoneNumberDialog() {
            $(function () {
                $("#not-uniq-phone-number-dialog-message").dialog({
                    modal: true,
                    buttons: {
                        OK: function () {
                            $(this).dialog("close");
                        }
                    }
                });
            });
        }

        if (isInContacts(phone)) {
            showNotUniqPhoneNumberDialog();
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
            tableRow.append(`<td class="row-id-td center">${rowId}</td>`);
            tableRow.append(`<td class="last-name-td">${lastName}</td>`);
            tableRow.append(`<td class="name-td">${name}</td>`);
            tableRow.append(`<td class="phone-td">${phone}</td>`);
            tableRow.append(`<td class="center"><img class="edit-button" src="Images/edit.svg"> <img class="delete-button" src="Images/delete.svg"></td>`);

            checkAllCheckbox.change(function () {
                const isChecked = checkAllCheckbox.is(":checked");
                $("#contacts-table td input:checkbox").prop("checked", isChecked);
            })

            tableRow.find(".checkbox-td input:checkbox").change(function () {
                checkAllCheckbox.prop("checked", false);
            })

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
                                    })
                                }

                                updateRowsIds();
                            },
                            "Отмена": function () {
                                $(this).dialog("close");
                            }
                        }
                    });
                });
            })

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
                tableRow.append(`<td><input class="last-name-input" value="${lastName}"></td>`);
                tableRow.append(`<td><input class="name-input" value="${name}"></td>`);
                tableRow.append(`<td><input class="phone-input" value="${phone}"></td>`);
                tableRow.append(`<td class="center"><img class="save-button" src="Images/save.svg"> <img class="cancel-button" src="Images/cancel.svg"></td>`);

                tableRow.find(".checkbox-td input:checkbox").change(function () {
                    checkAllCheckbox.prop("checked", false);
                })

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
                        showNotUniqPhoneNumberDialog();
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
            })
        }

        setViewMode();

        $("#last-name-field").val("");
        $("#name-field").val("");
        $("#phone-field").val("");
        checkAllCheckbox.prop("checked", false);
    })
})