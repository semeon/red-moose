export function CsvController(path) {

	var filePath = path;

	this.parseFiles = function(fileNames, callback) {
		for (var i=0; i< fileNames.length; i++) {
			ParseCsvFile(fileNames[i], callback);
		}
	}

	// Private
	function ParseCsvFile(fileName, callback) {
		Papa.parse(filePath + fileName, {
			download: true,
			header: true,
			dynamicTyping: true,
			complete: function(results) {
				callback(fileName, results);
			}
		});
	}

}