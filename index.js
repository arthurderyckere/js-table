var searchTable;
(function () {

    searchTable = document.getElementById("tblSearchResults");

    if (searchTable) {
        searchTable.addEventListener("click", function (e) {
            removeSelectedFromRows(searchTable);
            handleTableClick(e);
        });
    }

})();

function handleTableClick(e) {
    if (!e || !e.target || !e.target.parentNode) return;
    let parent = e.target.parentNode;
    if (parent.nodeName === "TR") {
        toggleSelectedClassOnElement(parent);
        addKeyUpEventListener();
    }
}
function toggleSelectedClassOnElement(element) {
    if (!element || !element.classList) return;
    element.classList.toggle("selected");
}
function addKeyUpEventListener() {
    document.removeEventListener('keydown', navigateInTable, false);
    document.addEventListener("keydown", navigateInTable);
}
function logEvent(e) {
    console.log(e);
}
function navigateInTable(e) {
    if (!e || !e.key) return;
    switch (e.key) {
        case "Enter":
            selectElementInTable();
            break;
        case "Escape":
            deselectElementInTable();
            break;
        case "ArrowLeft":
        case "ArrowRight":
            break;
        case "ArrowUp":
            changeSelectionInTable("up");
            break;
        case "ArrowDown":
            changeSelectionInTable("down");
            break;
        default: break;
    }
}

function selectElementInTable() {
    let selectedRows = searchTable.getElementsByClassName("selected");
    if (!selectedRows || !selectedRows[0] || selectedRows[0].nodeName != "TR") return;
    let selectedRow = selectedRows[0];
    let selectedLabel = document.getElementById("lblSelectedElement");
    if (!selectedLabel) return;
    selectedLabel.innerHTML = selectedRow.firstElementChild.innerHTML;
}
function deselectElementInTable() {
    removeSelectedFromRows();
    let selectedLabel = document.getElementById("lblSelectedElement");
    if (!selectedLabel) return;
    selectedLabel.innerHTML = "none";
}
function changeSelectionInTable(direction) {
    if (searchTable) {
        let selectedRows = searchTable.getElementsByClassName("selected");
        if (!selectedRows || !selectedRows[0] || selectedRows[0].nodeName != "TR") return;
        let selectedRow = selectedRows[0];
        if (direction && direction === "up") {
            if (selectedRow && selectedRow.previousElementSibling && selectedRow.previousElementSibling.nodeName === "TR") {
                removeSelectedFromRows();
                toggleSelectedClassOnElement(selectedRow.previousElementSibling);
            }
        } else if (direction && direction === "down") {
            if (selectedRow && selectedRow.nextElementSibling && selectedRow.nextElementSibling.nodeName === "TR") {
                removeSelectedFromRows();
                toggleSelectedClassOnElement(selectedRow.nextElementSibling);
            }
        }
    }
}
function removeSelectedFromRows() {
    if (searchTable && searchTable.rows) {
        for (var i = 0; i < searchTable.rows.length; i++) {
            let row = searchTable.rows[i];
            if (row && row.classList) {
                row.classList.remove("selected");
            }
        }
    }
}