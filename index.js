var fs = require('fs');
var _ = require('lodash');
var path = require('path');

exports.load = function (folderPath, options) {
  options = options || {};
  var returnObject = {};
  var fileNames = fs.readdirSync(folderPath);
  fileNames.forEach(function (fileName) {
    if (fileName == 'index.js') return
    if (_.startsWith(fileName, '.')) return
    var filePath = path.resolve(folderPath, fileName);
    returnObject[fileName.split('.')[0]] = require(filePath).default || require(filePath)
  })
  return returnObject;
}

exports.transformVietnamese = function (str, joinChar) {
  str = str.toLowerCase();
  //for lower code
  str = str.replace(/á|à|ả|ã|ạ|â|ấ|ầ|ẩ|ẫ|ậ|ă|ắ|ằ|ẳ|ẵ|ặ/g, "a");
  str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, "e");
  str = str.replace(/í|ì|ỉ|ĩ|ị/g, "i");
  str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, "o");
  str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, "u");
  str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/g, "y");
  str = str.replace(/đ/g, "d");
  //for higher code
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");

  if (joinChar) {
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, joinChar);
    str = str.replace(/-+-/g, "-");
    str = str.replace(/^\-+|\-+$/g, "");
  }

  return str;
}

exports.splitTimeRange = function(params, type) {
  params = params || {};
  var formatStr = {
    month: "YYYY-MM",
    day: "YYYY-MM-DD"
  }[type];
  var fromDate = moment(params.fromDate).tz(params.timezone || "UTC");
  var toDate = moment(params.toDate).tz(params.timezone || "UTC");
  var times = [];
  while(fromDate <= toDate){
    times.push(fromDate.format(formatStr));
    fromDate.add(1, type);
  }
  return times;
}
