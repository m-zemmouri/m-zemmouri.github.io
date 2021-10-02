var data0 = [];
var data = [];

//waitingDialog.show("Loading Data");
//setTimeout(function () { waitingDialog.hide(); }, 1500);
$.getJSON("https://covid.ourworldindata.org/data/owid-covid-data.json", function (result) {
    data0 = result;
    transformData();
    Ready();
    //waitingDialog.hide(); 
});


function transformData() {

    for (var p0 in data0) {
        var row0 = { "iso_code": p0 };
        var val = data0[p0];
        for (var p1 in val) {
            if (p1 != "data") {
                row0[p1] = val[p1];
            }
        }
        var max_total_cases = _.max(val.data, function (d) { return d.total_cases; }).total_cases;
        var max_total_deaths = _.max(val.data, function (d) { return d.total_deaths; }).total_deaths;
        var max_total_tests = _.max(val.data, function (d) { return d.total_tests; }).total_tests;
        var max_total_vaccinations = _.max(val.data, function (d) { return d.total_vaccinations; }).total_vaccinations;


        for (var i = 0; i < val.data.length; i++) {
            var r = val.data[i];
            var row = Object.assign({ month: r.date.substr(0, 7) }, row0, r,
                { max_total_cases: max_total_cases, new_cases_p: r.new_cases / max_total_cases },
                { max_total_deaths: max_total_deaths, new_deaths_p: r.new_deaths / max_total_deaths },
                { max_total_tests: max_total_tests, new_tests_p: r.new_tests / max_total_tests },
                { max_total_vaccinations: max_total_vaccinations, new_vaccinations_p: r.new_vaccinations / max_total_vaccinations },
            );
            data.push(row);
        }
    }
}

