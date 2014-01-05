exports.action = function(data, callback, config){

  // Retrieve config
  config = config.modules.pushingbox;
	if (!config.deviceid){
		console.log("Missing PushingBox config");
    return;
  }

  // Callback with TTS
  if (!data.quiet) {
		callback({});
	}

	var url = 'http://api.pushingbox.com/pushingbox?devid=' + config.deviceid + '&message=' + data.tts;

	var http = require('http');
	http.get(url, function(res) {
		console.log("PushingBox response: " + res.statusCode);
	}).on('error', function(e) {
		console.log("PushingBox error: " + e.message);
	});

}