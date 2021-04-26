const fs = require("fs");
const path = require("path");
const async = require("async");
const csv = require("csv");
const bookCsv = require("./csvData/books.csv");
const ratingsCsv = require("./csvData/ratings.csv");

function csvToDb(filename, fn) {
    let input = fs.createReadStream(
      path.resolve(__dirname, "../public/assets", filename)
    );
    let parser = csv.parse({
      columns: true,
      relax: true,
    });
  
    let inserter = async.cargo(function (tasks, inserterCb) {
      fn(tasks, inserterCb);
    }, 1000); 


    parser.on("readable", function () {
        while ((line = parser.read())) {
          inserter.push(line);
        }
      });
    
      parser.on("error", function (err) {
        throw err;
      });
    
      parser.on("end", function (count) {
        inserter.drain();
      });
    
      input.pipe(parser);
    }
    
    module.exports = csvToDb;