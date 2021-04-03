// Ready Function off CA Page
function index_Ready() {

    ////---------------------------------------------------------------//
    //// User Parameters Region
    ////---------------------------------------------------------------//


    //// End Region
    ////---------------------------------------------------------------//

    ////---------------------------------------------------------------//
    //// initialization Region
    ////---------------------------------------------------------------//

    getMyCookies();

    $("#lang").val(lang);
    $("#highchartsTheme").val(highchartsTheme);
    $("#Radialize").val(Radialize);
    $("#bootStrapTheme").val(bootStrapTheme);

    if (locales && locales[lang] && locales[lang]['dir']) $('body').attr('dir', locales[lang]['dir']);
    translate();


    $("#saveSettings").click(function () {
        setCookie('lang', $("#lang").val());
        setCookie('highchartsTheme', $("#highchartsTheme").val());
        setCookie('Radialize', $("#Radialize").val());
        setCookie('bootStrapTheme', $("#bootStrapTheme").val());
        location.reload();
    });

    //// End Region
    ////---------------------------------------------------------------//

    ////---------------------------------------------------------------//
    //// Filter Region
    ////---------------------------------------------------------------//   


    //// End Region
    ////---------------------------------------------------------------//

    ////---------------------------------------------------------------//
    //// Chart Region
    ////---------------------------------------------------------------//


    //// End Region
    ////---------------------------------------------------------------//

};