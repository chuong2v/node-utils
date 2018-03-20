var fs = require('fs');

exports.load = function(folderPath, options){
  options = options || {};
  var returnObject = {};
  var fileNames = fs.readdirSync(folderPath);
  fileNames.forEach(function(fileName) {
    var filePath = path.resolve(folderPath, fileName);
    returnObject[fileName.split('.')[0]] = require(filePath);
  })
  return returnObject;
}
