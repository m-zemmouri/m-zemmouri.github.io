// Ready Function off Data Page
function Order_Data() {

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
    getBootstrapTable2($("#bstable"), data["Order"], bootstrapProps["Order"]);

    //// End Region
    ////---------------------------------------------------------------//

};
