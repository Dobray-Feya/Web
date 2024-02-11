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
        const visibleRows = $("#contacts-table tbody tr").filter(function () {
            return $(this).is(":visible");
        });

        const checkedRows = visibleRows.filter(function () {
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
            $("#no-checked-contacts-dialog-message").dialog({
                modal: true,
                buttons: {
                    OK: function () {
                        $(this).dialog("close");
                    }
                }
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

        function trimFieldValue(field) {
            field.val(field.val().trim());
        }

        function validateFieldValue(field) {
            if (field.val().length === 0) {
                field.addClass("invalid");
                return false;
            }

            field.removeClass("invalid");
            return true;
        }

        trimFieldValue(lastNameField);
        let lastName = lastNameField.val();

        trimFieldValue(nameField);
        let name = nameField.val();

        trimFieldValue(phoneField);
        let phone = phoneField.val();

        // нужно проверить каждое поле, чтобы подсветить в нем ошибку, если она есть
        let isValidInput = validateFieldValue(lastNameField);
        isValidInput = validateFieldValue(nameField) && isValidInput;
        isValidInput = validateFieldValue(phoneField) && isValidInput;

        if (!isValidInput) {
            return;
        }

        function isInContacts(phoneNumber) {
            let isInContacts = false;

            $("#contacts-table tbody tr").each(function () {
                if ($(this).find(".phone-td").text() === phoneNumber) {
                    isInContacts = true;
                    return false;
                }
            });

            return isInContacts;
        }

        function showNotUniquePhoneNumberDialog() {
            $("#not-unique-phone-number-dialog-message").dialog({
                modal: true,
                buttons: {
                    OK: function () {
                        $(this).dialog("close");
                    }
                }
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
            tableRow.append($(`<td class="checkbox-td center"><input type="checkbox"></td>`).prop("checked", isRowChecked));

            tableRow.append($(`<td class="row-number-td center"></td>`).text(rowNumber));

            tableRow.append($(`<td class="last-name-td"></td>`).text(lastName));

            tableRow.append($(`<td class="name-td"></td>`).text(name));

            tableRow.append($(`<td class="phone-td"></td>`).text(phone));

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
                tableRow.append($(`<td class="checkbox-td center"><input type="checkbox"></td>`).prop("checked", isRowChecked));

                tableRow.append(`<td class="center">${rowNumber}</td>`);

                const warningBlock = `<div class="error-message">Поле не заполнено</div>`;

                const lastNameTd = $(`<td></td>`);
                lastNameTd.append($(`<input type="text" class="last-name-input">`).val(lastName));
                lastNameTd.append($(warningBlock));
                tableRow.append(lastNameTd);

                const nameTd = $(`<td></td>`);
                nameTd.append($(`<input type="text" class="name-input">`).val(name));
                nameTd.append($(warningBlock));
                tableRow.append(nameTd);

                const phoneTd = $(`<td></td>`);
                phoneTd.append($(`<input type="text" class="phone-input">`).val(phone));
                phoneTd.append($(warningBlock));
                tableRow.append(phoneTd);

                tableRow.append(`<td class="center">
                                 <img class="save-button td-button" src="Images/save.svg" title="Сохранить">
                                 <img class="cancel-button td-button" src="Images/cancel.svg" title="Отменить"></td>`);

                tableRow.find(".checkbox-td input:checkbox").change(function () {
                    checkAllCheckbox.prop("checked", false);
                });

                tableRow.find(".save-button").click(function () {
                    isRowChecked = tableRow.find(".checkbox-td input:checkbox").is(":checked");

                    const lastNameCell = tableRow.find(".last-name-input");
                    trimFieldValue(lastNameCell);
                    const newLastName = lastNameCell.val();

                    const nameCell = tableRow.find(".name-input");
                    trimFieldValue(nameCell);
                    const newName = nameCell.val();

                    const phoneCell = tableRow.find(".phone-input");
                    trimFieldValue(phoneCell);
                    const newPhone = phoneCell.val();

                    // нужно проверить каждое поле, чтобы подсветить в нем ошибку, если она есть
                    let isValidCellsInput = validateFieldValue(lastNameCell);
                    isValidCellsInput = validateFieldValue(nameCell) && isValidCellsInput;
                    isValidCellsInput = validateFieldValue(phoneCell) && isValidCellsInput;

                    if (!isValidCellsInput) {
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

        lastNameField.val("");
        nameField.val("");
        phoneField.val("");
        checkAllCheckbox.prop("checked", false);
    });
});