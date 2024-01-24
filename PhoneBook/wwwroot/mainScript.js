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

                        function updateRowsNumbers() {
                            $("#contacts-table tbody tr").each(function (i) {
                                $(this).find(".row-number-td").text(i + 1);
                            });
                        }

                        updateRowsNumbers();
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

        function normalizeFieldValue(field) {
            field.val(field.val().trim());
        }

        function isFieldValueInvalid(field) {
            if (field.val().length === 0) {
                field.addClass("invalid");
                return true;
            } else {
                field.removeClass("invalid");
                return false;
            }
        }

        normalizeFieldValue(lastNameField);
        let lastName = lastNameField.val();

        normalizeFieldValue(nameField);
        let name = nameField.val();

        normalizeFieldValue(phoneField);
        let phone = phoneField.val();

        let isError = isFieldValueInvalid(lastNameField);
        isError = isFieldValueInvalid(nameField) || isError;
        isError = isFieldValueInvalid(phoneField) || isError;

        if (isError) {
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
            $(function() {
                $("#not-unique-phone-number-dialog-message").dialog({
                    modal: true,
                    buttons: {
                        OK: function() {
                            $(this).dialog("close");
                        }
                    }
                });
            });
        }

        if (isInContacts(phone)) {
            showNotUniquePhoneNumberDialog();
            return;
        }

        rowsCount++;
        let rowNumber = rowsCount;

        let isRowChecked = false;

        const tableRow = $("<tr>");
        contactsTable.append(tableRow);

        function setViewMode() {
            tableRow.append(`<td class="checkbox-td center"><input type="checkbox"></td>`);
            tableRow.find(".checkbox-td input:checkbox").prop("checked", isRowChecked);

            tableRow.append(`<td class="row-number-td center"></td>`);
            tableRow.find(".row-number-td").text(rowNumber);

            tableRow.append(`<td class="last-name-td"></td>`);
            tableRow.find(".last-name-td").text(lastName);

            tableRow.append(`<td class="name-td"></td>`);
            tableRow.find(".name-td").text(name);

            tableRow.append(`<td class="phone-td"></td>`);
            tableRow.find(".phone-td").text(phone);

            tableRow.append(`<td class="center">
                            <img class="edit-button td-button" src="Images/edit.svg" title="Редактировать">
                            <img class="delete-button td-button" src="Images/delete.svg" title="Удалить"></td>`);

            checkAllCheckbox.change(function () {
                const isChecked = checkAllCheckbox.is(":checked");
                $("#contacts-table td input:checkbox").prop("checked", isChecked);
            });

            tableRow.find(".checkbox-td input:checkbox").change(function () {
                checkAllCheckbox.prop("checked", false);
            });

            tableRow.find(".delete-button").click(function () {
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

                                function updateRowsNumbers() {
                                    $("#contacts-table tbody tr").each(function (i) {
                                        $(this).find(".row-number-td").text(i + 1);
                                    });
                                }

                                updateRowsNumbers();
                            },
                            "Отмена": function () {
                                $(this).dialog("close");
                            }
                        }
                    });
            });

            tableRow.find(".edit-button").click(function () {
                isRowChecked = tableRow.find(".checkbox-td input:checkbox").is(":checked");
                rowNumber = tableRow.find(".row-number-td").text();
                lastName = tableRow.find(".last-name-td").text();
                name = tableRow.find(".name-td").text();
                phone = tableRow.find(".phone-td").text();

                tableRow.html("");
                tableRow.append(`<td class="checkbox-td center"><input type="checkbox"></td>`);
                tableRow.find(".checkbox-td input:checkbox").prop("checked", isRowChecked);

                tableRow.append(`<td class="center">${rowNumber}</td>`);

                tableRow.append(
                    `<td>
                    <input type="text" class="last-name-input">
                    <div class="error-message">Поле не заполнено</div>
                    </td>`);
                tableRow.find(".last-name-input").val(lastName);

                tableRow.append(
                    `<td>
                    <input type="text" class="name-input">
                    <div class="error-message">Поле не заполнено</div>
                    </td>`);
                tableRow.find(".name-input").val(name);

                tableRow.append(
                    `<td>
                    <input type="text" class="phone-input">
                    <div class="error-message">Поле не заполнено</div>
                    </td>`);
                tableRow.find(".phone-input").val(phone);

                tableRow.append(`<td class="center">
                                 <img class="save-button td-button" src="Images/save.svg" title="Сохранить">
                                 <img class="cancel-button td-button" src="Images/cancel.svg" title="Отменить"></td>`);

                tableRow.find(".checkbox-td input:checkbox").change(function () {
                    checkAllCheckbox.prop("checked", false);
                });

                tableRow.find(".save-button").click(function () {
                    isRowChecked = tableRow.find(".checkbox-td input:checkbox").is(":checked");

                    const lastNameCell = tableRow.find(".last-name-input");
                    normalizeFieldValue(lastNameCell);
                    const newLastName = lastNameCell.val();

                    const nameCell = tableRow.find(".name-input");
                    normalizeFieldValue(nameCell);
                    const newName = nameCell.val();

                    const phoneCell = tableRow.find(".phone-input");
                    normalizeFieldValue(phoneCell);
                    const newPhone = phoneCell.val();

                    let isCellError = isFieldValueInvalid(lastNameCell);
                    isCellError = isFieldValueInvalid(nameCell) || isCellError;
                    isCellError = isFieldValueInvalid(phoneCell) || isCellError;

                    if (isCellError) {
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