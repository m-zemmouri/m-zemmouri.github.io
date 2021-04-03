////---------------------------------------------------------------//
//// User Parameters Region
////---------------------------------------------------------------//

var ColorsDictionary = { /*"2014": "'#000000'", "Benefice": "'#000000'", "Bénéfice": "'#000000'", */ };
var categoriesDictionary = {
    "MonthsName": ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
    "Months": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    "Days": ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    "DaysName": ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']

};
var locales = {};
var bootstrapProps = {
    Stock:
    {
        search: true,
        pagination: true,
        showColumns: true,
        showPaginationSwitch: true,
        showToggle: true,
        showExport: true,
        toolbar: "#toolbar",
        advancedSearch: true,
        idTable: "advancedTable",
        showMultiSort: true,
        sortPriority: [{ "sortName": "Stock Montant", "sortOrder": "Asc" }],
        columns:
        [
            { field: 'Category', sortable: true, searchable: true, class: 'lang-entry', title: translate('Category') },
            { field: 'Product', sortable: true, class: 'lang-entry', title: translate('Product') },
            { field: 'Supplier', sortable: true, searchable: true, class: 'lang-entry', title: translate('Supplier') },
            { field: 'Supplier Country', visible: false, sortable: true, searchable: true, class: 'lang-entry', title: translate('Supplier Country') },
            { field: 'Supplier City', visible: false, sortable: true, searchable: true, class: 'lang-entry', title: translate('Supplier City') },
            { field: 'Stock', sortable: true, searchable: true, align: 'right', class: 'lang-entry', title: translate('Stock') },
            { field: 'Units On Order', align: 'right', class: 'lang-entry', title: translate('Units On Order') },
            { field: 'Reorder Level', align: 'right', class: 'lang-entry', title: translate('Reorder Level') },
            { field: 'Unit Price', sortable: true, searchable: true, align: 'right', class: 'lang-entry', title: translate('Unit Price') },
            { field: 'Stock Sum', sortable: true, searchable: true, align: 'right', class: 'lang-entry', title: translate('Stock Sum') },
        ]
    },

    Order:
    {
        search: true,
        pagination: true,
        showColumns: true,
        showPaginationSwitch: true,
        showToggle: true,
        showExport: true,
        toolbar: "#toolbar",
        advancedSearch: true,
        idTable: "advancedTable",
        showMultiSort: true,
        sortPriority: [{ "sortName": "Date", "sortOrder": "Asc" }],
        columns:
        [
            { field: 'Order ID', visible: false, align: 'right', class: 'lang-entry', title: translate('Order ID') },
            { field: 'Employe', sortable: true, searchable: true, class: 'lang-entry', title: translate('Employe') },
            { field: 'Employe Country', visible: false, sortable: true, class: 'lang-entry', title: translate('Employe Country') },
            { field: 'Employe City', visible: false, sortable: true, class: 'lang-entry', title: translate('Employe City') },
            { field: 'Customer ID', visible: false, class: 'lang-entry', title: translate('Customer ID') },
            { field: 'Customer', sortable: true, searchable: true, class: 'lang-entry', title: translate('Customer') },
            { field: 'Customer Country', visible: false, sortable: true, class: 'lang-entry', title: translate('Customer Country') },
            { field: 'Customer City', visible: false, sortable: true, class: 'lang-entry', title: translate('Customer City') },
            { field: 'Shipper', sortable: true, searchable: true, class: 'lang-entry', title: translate('Shipper') },
            { field: 'Order Date', sortable: true, searchable: true, class: 'lang-entry', title: translate('Order Date') },
            { field: 'Year', visible: false, sortable: true, searchable: true, align: 'right', class: 'lang-entry', title: translate('Year') },
            { field: 'Month', visible: false, sortable: true, searchable: true, align: 'right', class: 'lang-entry', title: translate('Month') },
        ]
    },

    "Order_Detail":
    {
        search: true,
        pagination: true,
        showColumns: true,
        showPaginationSwitch: true,
        showToggle: true,
        showExport: true,
        toolbar: "#toolbar",
        advancedSearch: true,
        idTable: "advancedTable",
        showMultiSort: true,
        sortPriority: [{ "sortName": "Date", "sortOrder": "Asc" }],
        columns:
        [
            { field: 'Order ID', visible: false, align: 'right', class: 'lang-entry', title: translate('Order ID') },
            { field: 'Employe', visible: false, sortable: true, class: 'lang-entry', title: translate('Employe') },
            { field: 'Customer', visible: false, class: 'lang-entry', title: translate('Customer') },
            { field: 'Order Date', sortable: true, searchable: true, align: 'right', class: 'lang-entry', title: translate('Order Date') },
            { field: 'Category', sortable: true, searchable: true, class: 'lang-entry', title: translate('Category') },
            { field: 'Product ID', visible: false, align: 'right', class: 'lang-entry', title: translate('Product ID') },
            { field: 'Product', sortable: true, searchable: true, class: 'lang-entry', title: translate('Product') },
            { field: 'Supplier', sortable: true, searchable: true, class: 'lang-entry', title: translate('Supplier') },
            { field: 'Unit Price', sortable: true, searchable: true, align: 'right', class: 'lang-entry', title: translate('Unit Price') },
            { field: 'Quantity', sortable: true, searchable: true, align: 'right', class: 'lang-entry', title: translate('Quantity') },
            { field: 'Discount', visible: false, sortable: true, searchable: true, align: 'right', class: 'lang-entry', title: translate('Discount') },
            { field: 'Price', visible: false, searchable: true, align: 'right', class: 'lang-entry', title: translate('Price') },
            { field: 'Discount Price', align: 'right', class: 'lang-entry', title: translate('Discount Price') },
            { field: 'Extended Price', sortable: true, searchable: true, align: 'right', class: 'lang-entry', title: translate('Extended Price') },
        ]
    },
};


var lang = "en";
var highchartsTheme = "default";
var Radialize = true;
var bootStrapTheme = "default";

//// End Region
////---------------------------------------------------------------//
