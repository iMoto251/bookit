const fs = require('fs');
const async = require('async');
const csv = require('csv');
const bookCsv = require("./csvData/books.csv");
const ratingsCsv = require("./csvData/ratings.csv");

 
var input = fs.createReadStream(ratingsCsv);
var parser = csv.parse({
  columns: true,
  relax: true
});
 
var inserter = async.cargo(function(tasks, inserterCallback) {
    model.bulkCreate(tasks).then(function() {
        inserterCallback();
      }
    );
  },
  1000
);
 
parser.on('readable', function () {
  while(line = parser.read()) {
    inserter.push(line);
  }
});
 
parser.on('end', function (count) {
  inserter.drain = function() {
    doneLoadingCallback();
  }
});
 
input.pipe(parser);