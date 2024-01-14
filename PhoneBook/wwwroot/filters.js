"use strict";

$(function () {
    const searchField = $("#search-field");
    const searchButton = $("#search-button");
    const cancelSearchButton = $("#cancel-search-button");

    searchButton.click(function () {
        cancelSearchButton.trigger("click");

        const searchString = searchField.val().trim().toLowerCase();

        if (searchString.length === 0) {
            return;
        }

        $("#contacts-table tbody tr").each(function () {
            const currentRow = $(this);

            if (currentRow.find(".last-name-td").text().toLowerCase().indexOf(searchString) === -1 &&
                currentRow.find(".name-td").text().toLowerCase().indexOf(searchString) === -1 &&
                currentRow.find(".phone-td").text().toLowerCase().indexOf(searchString) === -1) {
                currentRow.hide();
            }
        });
    });

    cancelSearchButton.click(function () {
        $("#contacts-table tbody tr").show();
    });
});