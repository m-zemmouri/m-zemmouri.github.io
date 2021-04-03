
////---------------------------------------------------------------//
//// bootstrapTable Region
////---------------------------------------------------------------//

function getBootstrapTable(data, table) {
    var $table = $('#' + table);
    $table.bootstrapTable();
    if (data) {
        $table.bootstrapTable('load', data);
    }
};

function getBootstrapTable2($table, data, props) {
    if ($table) {
        props = props ? props : {};
        if (data) props["data"] = data;
        $table.bootstrapTable(props);
    }
};

//// End Region
////---------------------------------------------------------------//
