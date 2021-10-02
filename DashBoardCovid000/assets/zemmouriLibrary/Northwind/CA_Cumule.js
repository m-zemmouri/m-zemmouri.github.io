// Ready Function off CA Page
function CA_Cumule_Ready(myData) {

    ////---------------------------------------------------------------//
    //// User Parameters Region
    ////---------------------------------------------------------------//


    //// End Region
    ////---------------------------------------------------------------//

    ////---------------------------------------------------------------//
    //// initialization Region
    ////---------------------------------------------------------------//

    Page_Initialize();
    initializeColors();
    get_Chart_Line_CA_Cumule(myData);

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

    // CA Cumule Chart
    function get_Chart_Line_CA_Cumule(data) {
        //prepare data 
        var parameter = { groupBy: "Year", name: translate("Turnover"), field: "Extended Price", aggregation: "cum", categoredBy: "Month", categories: categoriesDictionary["Months"] };
        var series = group(data, parameter);

        //Chart options
        var MyOptions = {
            chart:
            {
                renderTo: "Chart_Line_CA_Cumule",
                type: 'line',
            },
            credits:
            {
                text: 'Northwind',
                href: 'https://northwinddatabase.codeplex.com/'
            },
            title:
            {
                text: "" + translate("CA Cumule") + ""
            },
            tooltip:
            {
                enabled: true,
                formatter: function () {
                    return "<b>" + this.x + "-" + this.point.series.name + "</b><br/>"+translate("CA Cumule")+" : <b>" + Highcharts.numberFormat(this.point.y, 2) + "</b>";
                }
            },

            xAxis:
            {
                categories: categoriesDictionary["MonthsName"],
            },
            yAxis:
            {
                title:
                {
                    text: translate("Amount"),
                },
                allowDecimals: false,
            },
            legend:
            {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: series.data,
        };
        var chart = new Highcharts.Chart(MyOptions);
    }

    //// End Region
    ////---------------------------------------------------------------//

};