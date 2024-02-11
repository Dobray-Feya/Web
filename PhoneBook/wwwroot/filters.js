"use strict";

$(function () {
    const searchField = $("#search-field");
    const searchButton = $("#search-button");
    const cancelSearchButton = $("#cancel-search-button");

    searchButton.click(function () {
        const searchString = searchField.val().trim().toLowerCase();

        if (searchString.length === 0) {
            return;
        }

        $("#contacts-table tbody tr").each(function () {
            const currentRow = $(this);

            if (currentRow.find(".last-name-td").text().toLowerCase().includes(searchString) ||
                currentRow.find(".name-td").text().toLowerCase().includes(searchString) ||
                currentRow.find(".phone-td").text().toLowerCase().includes(searchString)) {
                currentRow.show();
            } else {
                currentRow.hide();
            }
        });
    });

    cancelSearchButton.click(function () {
        $("#contacts-table tbody tr").show();

        searchField.val("");
    });
});