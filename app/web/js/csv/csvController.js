export function CsvController() {

	var filePath = "";
	var onLoadCallback = {};

	this.init = function(path, callback) {
		filePath = path;
		onLoadCallback = callback;
	}

	this.parseFiles = function(fileNames, callback) {
		for (var i=0; i< fileNames.length; i++) {
			ParseCsvFile(fileNames[i]);
		}
	}

	this.parseFile = function(fileName, callback) {
		ParseCsvFile(fileName, callback);
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