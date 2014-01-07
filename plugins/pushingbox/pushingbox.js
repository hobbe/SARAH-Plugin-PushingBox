/*
 * PushingBox plugin for S.A.R.A.H.
 * https://github.com/hobbe/SARAH-Plugin-PushingBox
 *
 * Licensed under DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 */

exports.action = function(data, callback, configuration, SARAH) {

	// Retrieve configuration
	var config = configuration.modules.pushingbox;
	if (!config.deviceid) {
		console.log("Invalid PushingBox configuration: missing device ID");
		callback({ 'tts': 'Vous devez configurer le plugin PushingBox avec votre identifiant de scénario' });
		return;
	}

	var url = 'http://api.pushingbox.com/pushingbox?devid=' + config.deviceid
	        + '&message=' + encodeURIComponent(data.tts);

	var http = require('http');

	http.get(url, function(res) {
		console.log("PushingBox response: " + res.statusCode);
		if (data.quiet) {
			callback({});
		} else {
			callback({ 'tts': data.tts + '. Le message a été envoyé sur PushingBox.' });
		}
	}).on('error', function(err) {
		console.log("PushingBox error: " + err.message);
		if (data.quiet) {
			callback({});
		} else {
			callback({ 'tts': data.tts + ". Attention, le message n'a pas été envoyé sur PushingBox." });
		}
	});

};