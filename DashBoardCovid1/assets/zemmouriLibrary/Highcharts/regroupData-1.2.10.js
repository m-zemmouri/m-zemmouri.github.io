/*!
 * RegroupData v1.2.10 (2021-04-02)
 * (c) 2014-2021 ZEMMOURI Mohamed
 *  m.zemmouri@gmail.com
 */

//---------------------------------------------------------------//
// Main function Region
//---------------------------------------------------------------//

/** 
  * group data to be used in highchart 
  * @desc group data to be used in highchart 
  * @param {Array} data - data.
  * @param {Object} parameter - parameter value {field; aggregation function}.
  * @param {String} id - parent id (in case of drilldown chart).
  * @return {Object} - highchart data {data; drilldown}..
  * @example
  * // returns grouped data for Highcharts, parameters undefined
  * group(data) 
  * @example
  * // returns grouped data for Highcharts, with one parameter
  * group(data, {groupBy : "col2", name : "test", field : "col1", aggregation : "count", categoredBy : "catfield", categories : [cat1, cat2], drilldown : null}) 
  * @example
  * // returns grouped data for Highcharts, with one parameter
  * group(data, [{groupBy : "col2", name : "test", field : "col1", aggregation : "count"},{field : "col2", aggregation : "count"}]) 
  */

function group(data, parameters, id) {
    var result = { data: [], drilldown: [] };
    if (!id) id = "";

    //prepare parameters
    if (!Array.isArray(parameters)) parameters = [parameters];

    //for (var i = 0; i < parameters.length; i++) {
    //	var parameter = parameters[i];

    _.each(parameters, function (parameter) {
        //vars initialisation      
        if (!parameter)
            parameter = {};//other method : parameter = {groupBy : "", name : "", field : "", aggregation : "count", categoredBy : "", categories : [], drilldown : null};

        if (!parameter.aggregation)
            parameter.aggregation = "count";

        if (!parameter.field)
            parameter.field = "";

        if (!parameter.name)
            parameter.name = parameter.aggregation + " " + parameter.field;

        if (parameter.categoredBy && !(parameter.categories && parameter.categories.length))
            parameter.categories = getDistinct(data, parameter.categoredBy);

        // get different groups
        var groups = [];
        if (parameter.groupBy)
            groups = getDistinct(data, parameter.groupBy);
        else	//just to use it as name --> var item = {name:groupName};
            groups.push(parameter.name);

        var j = 0;
        var value = 0;
        _.each(groups, function (groupName) {
            //filter Data
            var filter = {};
            if (parameter.groupBy)
                filter[parameter.groupBy] = groupName;
            var selectedData = filterData(data, filter);

            //new item
            var item = { name: groupName };

            if (parameter.categoredBy) {
                item["data"] = categorize(selectedData, parameter);
            }
            else {
                //Save last value to use in cum aggrigation
                value = aggregate(selectedData, parameter, value);
                item["y"] = value;

            }
            //Colorize Item
            if (parameter.colors && parameter.colors[groupName])
                item["color"] = parameter.colors[groupName];
            //insert item 
            result.data.push(item);

            //drilldown
            if (parameter.drilldown) {
                var drilldownId = id + "_" + j;
                item["drilldown"] = drilldownId;
                var drilldownSeries = group(selectedData, parameter.drilldown, drilldownId);
                result.drilldown.push({ id: drilldownId, name: parameter.name, data: drilldownSeries.data });
                result.drilldown = result.drilldown.concat(drilldownSeries.drilldown);
            }
            j++;
        });
    }
    );

    return result;
}

// End Region
//---------------------------------------------------------------//

//---------------------------------------------------------------//
// sub functions Region
//---------------------------------------------------------------//


function categorize(data, parameter) { return categorize0(data, parameter); }
/** 
  * categorize data
  * @desc categorize data
  * @param {Array} data - data.
  * @param {Object} parameter - item value.
  * @return {Array} - categorized data.
*/
function categorize1(data, parameter) {
    var result = [];
    var value = 0;
    for (var i = 0; i < parameter.categories.length; i++) {
        //filter Data
        var filter = {};
        filter[parameter.categoredBy] = parameter.categories[i];
        var selectedData = filterData(data, filter);
        //Save last value to use in cum aggrigation
        value = aggregate(selectedData, parameter, value);
        result.push(value);
    }
    return result;
}


/** 
  * categorize data
  * @desc categorize data
  * @param {Array} data - data.
  * @param {Object} parameter - item value.
  * @return {Array} - categorized data.
*/
function categorize0(data, parameter) {
    var result = [];
    var categoredparameter = { groupBy: parameter.categoredBy, field: parameter.field, aggregation: parameter.aggregation, colors: parameter.colors };//, colors: parameter.colors
    var categoredData = group(data, categoredparameter).data;

    result = _.sortBy(categoredData, function (item) { return parameter.categories.indexOf(item.name); });
    var i = 0;
    while (result.length < parameter.categories.length) {
        if (typeof result[i] === 'undefined' || result[i].name != parameter.categories[i]) {
            result.splice(i, 0, { name: parameter.categories[i], y: 0 });
        }
        i++;
    }
    return result;
}

/** 
  * aggregate data
  * @desc aggregate data
  * @param {Array} data - data.
  * @param {Object} parameter - parameter value {field; aggregation function}.
  * @return {Integer} - aggregation value.
*/
function aggregate(data, parameter, lastValue) {
    {	//vars initialisation	
        var field = "";
        var aggregation = "count";
        if (parameter) {
            if (parameter.field) {
                field = parameter.field;
                if (parameter.aggregation) aggregation = parameter.aggregation;
            }
        }
        lastValue = lastValue ? lastValue : 0;
    }
    var result = null;
    result = 0;
    if (data) {
        if (aggregation == "count") {
            result = data.length;
        }
        else {
            var values = _.pluck(data, field);

            for (i = 0; i < values.length; i++) {
                values[i] = parseFloat(values[i]);
                values[i] = values[i] ? values[i] : 0;
            }
            if (aggregation == "max") {
                result = _.max(values);
            }
            else if (aggregation == "min") {
                result = _.min(values);
            }
            else if (aggregation == "sum") {
                result = _.reduce(values, function (memo, num) { return memo + num; }, 0);
            }
            else if (aggregation == "avg") {
                result = _.reduce(values, function (memo, num) { return memo + num; }, 0) / _.size(values);
            }
            else if (aggregation == "cum") {
                result = lastValue + _.reduce(values, function (memo, num) { return memo + num; }, 0);
            }
            else {
                result = _.size(values);
            }
        }
    }
    return result;
}

// End Region
//---------------------------------------------------------------//


//---------------------------------------------------------------//
// Change log Region
//---------------------------------------------------------------//
/*
v1.2.10 (2021-04-02)
    remove Null value from values in aggregate function (values[i] = values[i] ? values[i] : 0)
v1.2.9 (2020-03-11)
    Replace for (.. parameters) by each in group function
v1.2.8 (2017-04-07)
    add color to categorize0
v1.2.7 (2016-xx-xx)

v1.2.6 (2016-03-08)
    Add Cumulation 'cum' aggregation
v1.2.5 (2016-03-07)
    fix bug in group function (categoredBy field)
v1.2.4 (2016-02-14)
    move getDistinct to dataManager-1.2.6.js
v1.2.3 (2016-01-21)
    change categorize function.
*/
// End Region
//---------------------------------------------------------------//

//---------------------------------------------------------------//
// TO DO Region
//---------------------------------------------------------------//
/*
v1.2.6 (2016-03-08)
    uniformiser la transfer des donners pour group data, et categorized data, ex Benefice_Annuel page

*/
// End Region
//---------------------------------------------------------------//

