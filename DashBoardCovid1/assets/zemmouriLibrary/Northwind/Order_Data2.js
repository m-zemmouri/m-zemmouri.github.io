// Ready Function off Data Page
function Order_Data2() {

    ////---------------------------------------------------------------//
    //// User Parameters Region
    ////---------------------------------------------------------------//


    //// End Region
    ////---------------------------------------------------------------//

    ////---------------------------------------------------------------//
    //// initialization Region
    ////---------------------------------------------------------------//

    Page_Initialize();
    bootstrapProps["Order"].locale = lang == 'ar' ? 'ar-SA' : lang == 'fr' ? 'fr-FR' : 'en-US';
    bootstrapProps["Order"].detailView = true;
    bootstrapProps["Order"].onExpandRow = function (index, row, $detail) { expandDetail($detail, row["Order ID"]); };
    getBootstrapTable2($("#bstable"), data["Order"], bootstrapProps["Order"]);


    function expandDetail($detail, OrderID) {
        buildTableDetail($detail.html('<table></table>').find('table'), OrderID);
    }

    function buildTableDetail($el, OrderID) {
        var dataDetail = filterData(data["Order_Detail"], { "Order ID": OrderID });
        $el.bootstrapTable({
            columns: bootstrapProps["Order_Detail"].columns,
            data: dataDetail,
        });
    }




    $('[data-toggle="tooltip"]').tooltip();
    //hide config divs
    $("#Data_Tab_Confg").toggle(true);
    $("#Recap_Tab_Confg").toggle(false);
    $("#Chart_Tab_Confg").toggle(false);



    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab

        $("#Data_Tab_Confg").toggle(target == "#Data_Tab");
        $("#Recap_Tab_Confg").toggle(target == "#Recap_Tab");
        $("#Chart_Tab_Confg").toggle(target == "#Chart_Tab");

        if (target == "#Chart_Tab") {
        }

    });
    //// End Region
    ////---------------------------------------------------------------//

};
