
function getJson(txt, keys) {
    var data = [];
    var strDelimiter = "\t";
    var Lines = txt.split("\r\n");
    var row = Lines[0].split(strDelimiter);
    var i;
    if (!keys) {
        for (i = 1; i < row.length; i++) {
            keys[row[i]] = "string";
        }
    }

    //for (var i = 1; i < headRow.length; i++) data[headRow[i]] = {};
    for (var j = 1; j < Lines.length; j++) {
        var item = {};
        row = Lines[j].split(strDelimiter);
        i = 0;
        for (var key in keys) {
            if (typeof keys[key] === 'number') {// Number,
                item[key] = parseFloat(row[i]);
            }
            else if (typeof object === 'boolean') {// Boolean, 
                item[key] = new Boolean(row[i]);
            }
            else if (typeof object === 'date') {// Date,
                item[key] = Date.parse(row[i]);
            }
            else {
                item[key] = row[i];
            }
            i++;
        }
        data.push(item);
    }
    return data;
}

//---------------------------------------------------------------//
// Change log Region
//---------------------------------------------------------------//
/*
v1.0.0 (2016-03-04)
	change Filter data functions.
*/
// End Region
//---------------------------------------------------------------//


