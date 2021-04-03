// Ready Function off Data Page
function Order_Detail_Data() {

    ////---------------------------------------------------------------//
    //// User Parameters Region
    ////---------------------------------------------------------------//


    //// End Region
    ////---------------------------------------------------------------//

    ////---------------------------------------------------------------//
    //// initialization Region
    ////---------------------------------------------------------------//

    Page_Initialize();
    bootstrapProps["Order_Detail"].locale = lang == 'ar' ? 'ar-SA' : lang == 'fr' ? 'fr-FR' : 'en-US';
    getBootstrapTable2($("#bstable"), data["Order_Detail"], bootstrapProps["Order_Detail"]);

    //// End Region
    ////---------------------------------------------------------------//

};