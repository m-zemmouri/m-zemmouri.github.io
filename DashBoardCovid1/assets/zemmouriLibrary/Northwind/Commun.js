// Commun functions
function translate(entry) {
    if (entry) {
        var result = entry;
        if (locales && locales[lang] && locales[lang][entry]) result = locales[lang][entry];
        return result;
    }
    $(".lang-entry").each(function () {
        // remove class lang-entry
        //if ($(this).attr("class") == "lang-entry") $(this).removeAttr("class");
        //else $(this).removeClass("lang-entry");
        //translate
        var entry = $.trim($(this).text());
        var value = translate(entry);
        var htm = $(this).html();
        htm = htm.replace(entry, value);
        $(this).html(htm);        
    } );   
};


function Page_Initialize() {
    getMyCookies();
    if (locales && locales[lang] && locales[lang]['dir']) $('body').attr('dir', locales[lang]['dir']);
    waitingDialog.show("Loading"); setTimeout(function () { waitingDialog.hide(); }, 1500);
    translate();
};

function getNorthwindBootstrapTable(data, table) {
    getBootstrapTable(data, table);
    var bootstrap_table_local = lang == 'ar' ? 'ar-SA' : lang == 'fr' ? 'fr-FR' : 'en-US';
    $('#' + table).bootstrapTable('refreshOptions', { locale: bootstrap_table_local });
};

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    exdays = exdays ? exdays : 1;
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function getMyCookies() {

    var tmpValue = getCookie('lang');
    lang = tmpValue && $.inArray(tmpValue, ["ar", "fr", "en"]) > -1 ? tmpValue : 'en';

    tmpValue = getCookie('highchartsTheme');
    highchartsTheme = tmpValue && $.inArray(tmpValue, ["default", "dark-blue", "dark-green", "dark-unica", "gray", "grid-light", "grid", "sand-signika", "skies"]) > -1 ? tmpValue : 'default';

    tmpValue = getCookie('Radialize');
    Radialize = tmpValue && $.inArray(tmpValue, ["true", "false"]) > -1 ? tmpValue : true;

    tmpValue = getCookie('bootStrapTheme');
    bootStrapTheme = tmpValue && $.inArray(tmpValue, ["default"]) > -1 ? tmpValue : 'default';
}
