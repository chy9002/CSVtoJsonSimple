var inputPath = process.argv[2];
var outputPath = inputPath.replace('.csv','.json');
//var dataArray =[];
var csv =['1','2'];
const fs = require('fs')
fs.readFile(inputPath, 'utf8', function (err, data) {
  dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
  // Your array contains ['ID', 'D11', ... ]
    //console.log(dataArray);
    csv = dataArray;
    //console.log(csv);
    var attrs = csv.splice(0,1);
  
    var result = csv.map(function(row) {
        var obj = {};
        var rowData = row.split(',');
        attrs[0].split(',').forEach(function(val, idx) {
        obj = constructObj(val, obj, rowData[idx]);
        });
        return obj;
    })
    
    
    function constructObj(str, parentObj, data) {
        if(str.split('/').length === 1) {
        parentObj[str] = data;
        return parentObj;
        }
    
        var curKey = str.split('/')[0];
        if(!parentObj[curKey])
        parentObj[curKey] = {};
        parentObj[curKey] = constructObj(str.split('/').slice(1).join('/'), parentObj[curKey], data);
        return parentObj;
    }
    console.log(JSON.stringify(result));
    var Outfs = require('fs');
    Outfs.writeFile(outputPath, JSON.stringify(result), 'utf8', function(){});
});
