// Ready Function off CA Page
function CA_Article_Ready(myData) {

    ////---------------------------------------------------------------//
    //// User Parameters Region
    ////---------------------------------------------------------------//

    var Annee = "";
    var Mois = "";

    //// End Region
    ////---------------------------------------------------------------//

    ////---------------------------------------------------------------//
    //// initialization Region
    ////---------------------------------------------------------------//

    Page_Initialize();
    initializeColors();
    get_Chart_Pie_CA_Annuel(myData);
    changeAnnee();

    //// End Region
    ////---------------------------------------------------------------//

    ////---------------------------------------------------------------//
    //// Filter Region
    ////---------------------------------------------------------------//   

    // Filter myData by Year
    function changeAnnee(AnneeParameter) {

        var DataAnnee = [];

        if (AnneeParameter && AnneeParameter != Annee) {
            //get the selected Annee
            Annee = AnneeParameter;
            DataAnnee = filterData(myData, { Year: Annee });
        }
        else {
            //cancel the Annee selection
            Annee = "";
            DataAnnee = myData;
        }
        // get Chart
        get_Chart_Column_CA_Mensuel(DataAnnee);
        //cancel the Mois selection
        Mois = "";
        changeMois();
    }

    // Filter myData by Month
    function changeMois(MoisParameter) {

        var DataAnnee = myData;
        var DataMois = [];

        if (Annee) {
            //get the selected Annee
            DataAnnee = filterData(myData, { Year: Annee });
        }

        if (MoisParameter && MoisParameter != Mois) {
            //get the selected Month
            Mois = MoisParameter;
            DataMois = filterData(DataAnnee, { Month: Mois });
        }
        else {
            //cancel the Month selection
            Mois = "";
            DataMois = DataAnnee;
        }
        // get Chart
        get_Chart_Pie_CA_Article(DataMois);
    }

    //// End Region
    ////---------------------------------------------------------------//

    ////---------------------------------------------------------------//
    //// Chart Region
    ////---------------------------------------------------------------//

    // CA / Année
    function get_Chart_Pie_CA_Annuel(data) {
        //prepare data
        var parameter = { groupBy: "Year", name: "" + translate("Turnover") + "", field: "Extended Price", aggregation: "sum" };
        var series = group(data, parameter);

        //Chart options
        var MyOptions = {
            chart:
            {
                renderTo: "Chart_Pie_CA_Annuel",
                type: 'pie',
            },
            credits:
            {
                text: 'Northwind',
                href: 'https://northwinddatabase.codeplex.com/'
            },
            title:
            {
                text: "" + translate("Turnover") + " / " + translate("Year") + ""
            },
            tooltip:
            {
                enabled: true,
                formatter: function () {
                    return "" + translate("Year") + " : <b>" + this.point.name + "</b><br/>"+translate("Turnover") +" : <b>" + Highcharts.numberFormat(this.point.y, 2) + "</b><br/>"+ translate("Percentage") +" : <b>" + Highcharts.numberFormat(this.percentage, 2) + "%</b>";
                }
            },
            plotOptions:
            {
                pie:
                {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels:
                    {
                        enabled: true,
                        format: '<b>{point.name}</b> ({point.percentage:.2f}%)',
                        color: '#000000',
                        connectorColor: '#000000',
                        style:
                        {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series:
            [{
                data: series.data,
                point:
                {
                    events:
                    {
                        click: function (event) {
                            changeAnnee(this.name);
                        }
                    }
                }
            }]
        };

        var chart = new Highcharts.Chart(MyOptions);
    }

    // CA / Mois Chart
    function get_Chart_Column_CA_Mensuel(data) {
        //prepare data 
        var parameter = { name: translate("Turnover"), field: "Extended Price", aggregation: "sum", categoredBy: "Month", categories: categoriesDictionary["Months"] };
        var series = group(data, parameter);

        //Chart options
        var MyOptions = {
            chart:
            {
                renderTo: "Chart_Column_CA_Mensuel",
                type: 'column',
            },
            credits:
            {
                text: 'Northwind',
                href: 'https://northwinddatabase.codeplex.com/'
            },
            title:
            {
                text: "" + translate("Turnover") + " " + Annee + " / " + translate("Month")
            },
            tooltip:
            {
                enabled: true,
                formatter: function () {
                    return "<b>" + this.x + "-" + this.point.series.name + "</b><br/>" + translate("Turnover") + " : <b>" + Highcharts.numberFormat(this.point.y, 2) + "</b>";
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
            plotOptions: {
                column:
                {
                    allowPointSelect: true,
                    cursor: 'pointer',
                },
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                changeMois(this.x + 1);
                            }
                        }
                    }
                }
            },
        };
        var chart = new Highcharts.Chart(MyOptions);
    }

    // CA / Année
    function get_Chart_Pie_CA_Article(data) {
        //prepare data
        var parameterArticle = { groupBy: "Product", name: "" + translate("Turnover") + "", field: "Extended Price", aggregation: "sum" };
        var parameterFamille = { groupBy: "Category", name: translate("Turnover"), field: "Extended Price", aggregation: "sum", drilldown: parameterArticle };
        var series = group(data, parameterFamille);

        //Chart options
        var MyOptions = {
            chart:
            {
                renderTo: "Chart_Pie_CA_Article",
                type: 'pie'
            },
            credits:
            {
                text: 'Northwind',
                href: 'https://northwinddatabase.codeplex.com/'
            },
            title:
            {
                text: "" + translate("Turnover") + " " + Annee + "-" + Mois + " / " + translate("Product")
            },
            tooltip:
            {
                enabled: true,
                formatter: function () {
                    return "<b>" + this.point.name + "</b><br/>"+translate("Turnover") +" : <b>" + Highcharts.numberFormat(this.point.y, 2) + "</b><br/>"+ translate("Percentage") +" : <b>" + Highcharts.numberFormat(this.percentage, 2) + "%</b>";
                }
            },
            plotOptions:
            {
                pie:
                {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels:
                    {
                        enabled: true,
                        format: '<b>{point.name}</b> ({point.percentage:.2f}%)',
                        color: '#000000',
                        connectorColor: '#000000',
                        style:
                        {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series:
            [{
                data: series.data,
            }],
            drilldown:
            {
                series: series.drilldown,
            },
        };

        var chart = new Highcharts.Chart(MyOptions);
    }

    //// End Region
    ////---------------------------------------------------------------//
};