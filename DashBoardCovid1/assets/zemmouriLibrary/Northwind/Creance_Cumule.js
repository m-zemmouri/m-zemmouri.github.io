// Ready Function off CA Page
function Creance_Cumule_Ready(myData) {

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
    get_Chart_Line_Creance_Cumule(myData);

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
    function get_Chart_Line_Creance_Cumule(data) {
        //prepare data 
        // var categories = ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];

        var parameter = { groupBy: "Year", name: "" + translate("Debt") + "", field: "Debt", aggregation: "cum", categoredBy: "Month", categories: categoriesDictionary["Months"] };
        var series = group(data, parameter);

        //Chart options
        var MyOptions = {
            chart:
            {
                renderTo: "Chart_Line_Creance_Cumule",
                type: 'line',
            },
            credits:
            {
                text: 'Northwind',
                href: 'https://northwinddatabase.codeplex.com/'
            },
            title:
            {
                text: translate("Creance Cumule")
            },
            tooltip:
            {
                enabled: true,
                formatter: function () {
                    return "<b>" + this.x + "-" + this.point.series.name + "</b><br/>" + translate("Debt") + " : <b>" + Highcharts.numberFormat(this.point.y, 2) + "</b>";
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