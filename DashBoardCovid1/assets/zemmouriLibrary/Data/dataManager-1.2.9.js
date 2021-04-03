/*!
 * dataManager v1.2.9 (2018-04-01)
 * (c) 2014-2019 ZEMMOURI Mohamed
 *  m.zemmouri@gmail.com
 */

//---------------------------------------------------------------//
// Struct Region
//---------------------------------------------------------------//

/** 
  * Convert Struct to string  
  * @desc Convert Struct to string  
  * @param {Object} struct - The Object to convert to string.
  * @return {string} - string presentation of the object 
*/
function structToString(object) {
    var result = "";
    // String, 
    if (typeof object === 'string')
        result = object;
    // Number,
    else if (typeof object === 'number')
        result = object.toString();
    // Boolean, 
    else if (typeof object === 'boolean')
        result = object.toString();
    else if (typeof object === 'object') {
        // Array, 
        if (Array.isArray(object)) {
            var values = [];
            for (var i = 0; i < object.length; i++) {
                values.push(structToString(object[i]));
            }
            result = "[" + values.join(', ') + "]";
        }
        // Object.
        else {
            var propreties = [];
            for (var prop in object) {
                propreties.push(prop + ":" + structToString(object[prop]));
            }
            result = "{" + propreties.join(', ') + "}";
        }
    }
    return result;
}

/** 
  * Convert String to Struct
  * @desc Convert String to Struct
  * @param {string} - string presentation of the object 
  * @return {Object} struct - The Object to convert to string.
*/
function structFromString(str) {
    str = str.trim();
    // Object.
    if (str.charAt(0) == "{") {
        alert("struct");
        var result = {};
        str = str.substring(1, str.length - 1); // remove { }
        var propreties = str.split(",");
        var prop, value;
        for (var i = 0; i < result.length; i++) {
            prop = propreties[i].split(":")[0].trim();
            value = propreties[i].split(":")[1].trim();
            result[prop] = structFromString(value);
        }
        return result;
    }
    // Array, 
    else if (str.charAt(0) == "[") {
        alert("array");
        str = str.substring(1, str.length - 1); // remove [ ]
        var result = str.split(",");
        for (var i = 0; i < result.length; i++)
            result[i] = result[i].trim();
        return result;
    }
    else {
        alert("other");
        // Boolean, 
        if (str == 'true' || str == 'false')
            return Boolean(str);
        // Number
        else if (!isNaN(parseInt(str)))
            return parseInt(str);
        // String
        else return str;
    }
}

// End Region
//---------------------------------------------------------------//

//---------------------------------------------------------------//
// Syntese data Region
//---------------------------------------------------------------//


/** 
  * get Distinct values of field in data.
  * @desc format list Item
  * @param {Array} data - data.
  * @param {String} field - data.
  * @return {Array} - Distinct values.
*/
function getDistinct(data, field, sorted) {
    var result = [];
    if (data && field)
        result = _.uniq(_.pluck(data, field));
    if (sorted)
        result = _.sortBy(result, function (o) { return o; });
    return result;
}

// End Region
//---------------------------------------------------------------//

//---------------------------------------------------------------//
// Filter data Region
//---------------------------------------------------------------//

/** 
  * filter data 
  * @desc filter data 
  * @param {Array} data - The data to filter.
  * @param {Object} filter - The filter parameter.
  * @return {Array} - filtered data 
  * @example
  * // returns filter data 
  * filterData(data, {Column1:'value1',Column2:'value2'}) 
  * @example
  * // returns filter data 
  * filterData(data, {Column1:'value1',Column2:{value:'value2', operator:'=='}}) 
  * @example
  * // returns filter data 
  * filterData(data, {Column1:'value1',Column2:[{value:'value2A', operator:'=='},{value:'value2B', operator:'>'}]}) 
*/
function filterData(data, filter, logicalOperator) {
    var result = [];
    if (filter) {
        result = _.filter(data, function (row) {
            for (var field in filter) {
                if (!test(row[field], [{ value: filter[field], operator: "==" }], logicalOperator))
                    //if (!test(row[field], { value: filter[field], operator: "==" }))
                    //if (!test(row[field], filter[field]))
                    //if(row[field] != filter[field]) 
                    return false;
            }
            return true;
        });
    }
    else {
        result = data;
    }
    return result;
}

/** 
  * test data 
  * @desc compare data with a list of (values, operators)
  * @param {Object} data - The data to compare.
  * @param {Array} or {Object} or {value}  parameters - The list of (values, operators).
  * @return {Array} - true or false 
  * @example
  * // returns true
  * test(1, 1)
  * @example
  * // returns false
  * test(1, {vule:1, operator:">"})
  * @example
  * // returns true
  * test(1, [{vule:0, operator:">"}, {vule:2, operator:"<="}, 1])
*/
function test(data, parameters, logicalOperator) {

    //prepare logicalOperator, default value is and
    logicalOperator = logicalOperator == 'or' ? 'or' : 'and';

    if (typeof (parameters) !== 'undefined') {
        //prepare parameters
        if (!Array.isArray(parameters)) parameters = [parameters];
        for (var i = 0; i < parameters.length; i++) {
            if (parameters[i]) //null undifined parameter ar ignored
            {
                if (logicalOperator == 'or') // OR
                {
                    if (compare(data, parameters[i]) == true) return true;
                }
                else // And
                {
                    if (compare(data, parameters[i]) == false) return false;
                }
            }
        }
    }
    return true;
}

/** 
  * test data 
  * @desc compare data with a list of (values, operators)
  * @param {Object} data - The data to compare.
  * @param {Array} or {Object} or {value}  parameters - The list of (values, operators).
  * @return {Array} - true or false 
  * @example
  * // returns true
  * test(1, 1)
  * @example
  * // returns false
  * test(1, {vule:1, operator:">"})
  * @example
  * // returns true
  * test(1, [{vule:0, operator:">"}, {vule:2, operator:"<="}, 1])
*/
function compare(data, parameter) {
    var result = null;
    if (typeof (parameter) != 'undefined') {
        var operator, value;
        //prepare value
        if (typeof (parameter.value) != 'undefined')
            value = parameter.value;
        else
            value = parameter;

        //prepare operator
        if (["==", "===", "!=", "!==", ">", "<", ">=", "<="].indexOf(parameter.operator) == -1)
            operator = "==";
        else
            operator = parameter.operator;

        // ==	equal to
        if (operator == "==") result = (data == value);
        // ===	equal value and equal type
        if (operator == "===") result = (data === value);
        // !=	not equal
        if (operator == "!=") result = (data != value);
        // !==	not equal data or not equal type
        if (operator == "!==") result = (data !== value);
        // >	greater than
        if (operator == ">") result = (data > value);
        // <	less than
        if (operator == "<") result = (data < value);
        // >=	greater than or equal to
        if (operator == ">=") result = (data >= value);
        // <=	less than or equal to
        if (operator == "<=") result = (data <= value);
    }
    return result;
}

// End Region
//---------------------------------------------------------------//

//---------------------------------------------------------------//
// Filter Data Region
//---------------------------------------------------------------//

/** 
  * extract some fields from data.
  * @desc filter data.
  * @param {Array} data - The data to filter.
  * @param {Array} fields - fields to picked.
  * @return {Array} - picked data.
*/
function pickData(data, fields) {
    var result = [];
    _.each(data, function (row) {
        var item = {};
        _.each(fields, function (field) { item[field] = row[field]; });
        result.push(item);
    });
    return result;
}

// End Region
//---------------------------------------------------------------//

//---------------------------------------------------------------//
// Display Region
//---------------------------------------------------------------//

function transposeTable(data, fields) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var item = {/* name: data[i].name*/ };
        for (var j = 0; j < fields.length; j++) {
            item[fields[j]] = data[i][j];
        }
        result.push(item);
    }
    return result;
}


function transposeTable0(TableID) {
    //get the element
    var $this = $("#" + TableID);
    var newrows = [];
    $this.find("tr").each(function () {
        var i = 0;
        $(this).find("td, th").each(function () {
            i++;
            if (newrows[i] === undefined) { newrows[i] = $("<tr></tr>"); }
            if (i == 1)
                newrows[i].append("<th>" + this.innerHTML + "</th>");
            else
                newrows[i].append("<td>" + this.innerHTML + "</td>");
        });
    });
    $this.find("tr").remove();
    $.each(newrows, function () {
        $this.append(this);
    });
}






/** 
  * Render an html table 
  * @desc Render an html table 
  * @param {string} TableID - identifier of Table DIV.
  * @param {Array} data - The data to display.
  * @param {Array} fields - fileds witch be displayed.
  * @param {Array} fields_Lib - Lib fileds witch be displayed.
  * @return {Array} - html table
*/
function renderTable(TableID, data, fields, fields_Lib) {
    //get the element
    var htmlTable = "#" + TableID;
    //parameters initialisation
    if (!(fields && fields.length)) {
        fields = [];
        if (!data) {
            //Anonymos field
            fields.push("#####");
        }
        else {
            //get field from data
            for (var field in data[0]) {
                fields.push(field);
            }
        }
    }

    if (!(fields_Lib && fields_Lib.length)) {
        fields_Lib = [];
        //for(var field in fields) 
        for (var i = 0; i < fields.length; i++) {
            fields_Lib.push(fields[i]);
        }
    }

    // Head Row	

    var html_Head = "<thead><tr><th>" + fields_Lib.join("</th><th>") + "</th></tr></thead>";

    // Table body
    var html_Rows = [];

    if (data) //if(typeof data !== "undefined" && data != null && data.length>0)
    {
        var str;
        var field;
        var value;
        for (var i = 0; i < data.length; i++) {
            row = data[i];
            str = "<tr>";
            for (var j = 0; j < fields.length; j++) {
                field = fields[j];
                value = row[field];
                str += "<td>" + value + "</td>";
            }
            str += "</tr>";
            html_Rows.push(str);
        }
    }
    else // No data	
    {
        html_Rows.push("<tr><td colspan='" + fields.length + "'>No data</td></tr>");
    }
    $(htmlTable).html("<table class='table table-striped'><caption></caption>" + html_Head + "<tbody>" + html_Rows.join('') + "</tbody></table>");
}

/** 
  * Render an html table 
  * @desc Render an html table 
  * @param {string} TableID - identifier of Table DIV.
  * @param {Array} data - The data to display.
  * @param {Array} fields - fileds witch be displayed.
  * @param {Array} fields_Lib - Lib fileds witch be displayed.
  * @param {bool} renderHead - whether Hide the head row or not.
  * @return {Array} - html table
*/

function upDateTable(TableID, data, fields) {
    if (data) {
        //parameters initialisation
        var field;
        if (!(fields && fields.length)) {
            fields = [];
            for (field in data[0]) {
                fields.push(field);
            }
        }
        var rowData;
        var cellData;
        var rowHtml;
        var cellHtml;

        var table = document.getElementById(TableID);

        // Table Rows		
        for (var i = 0; i < data.length; i++) {
            rowData = data[i];
            var rowHtml = table.insertRow(-1);
            for (var j = 0; j < fields.length; j++) {
                cellHtml = rowHtml.insertCell(-1);
                field = fields[j];
                if (rowData[field]) {
                    cellData = rowData[field];
                    cellHtml.innerHTML = cellData;
                }
            }
        }
    }
};

// End Region
//---------------------------------------------------------------//

//---------------------------------------------------------------//
// Change log Region
//---------------------------------------------------------------//
/*
v1.2.9 (2018-04-01)
    Optimize filter function

v1.2.8 (2016-03-07)
    Fix bug in test function

v1.2.7 (2016-02-21)
    change structToString(struct).

v1.2.6 (2016-02-14)
    add function compare.
    add logical operator as arg in test function.
    move getDistinct from regroupdata-1.2.3.js

v1.2.5 (2016-01-24)
    add function test.
    delete filterDataByColumn.

v1.2.4 (2015-05-30)
    add upDateTable.
    change renderTable functions, the head row optional.

v1.2.3 (2015-05-03)
    change Filter data functions.
*/
// End Region
//---------------------------------------------------------------//


