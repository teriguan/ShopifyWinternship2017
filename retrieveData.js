/**
 * Modified from user siongui on GitHub
 * https://siongui.github.io/2012/09/29/javascript-single-callback-for-multiple-asynchronous-xhr-requests/
 * 
 * Cross-Browser AJAX request (XMLHttpRequest)
 */
var AjaxRequest = function(url, callback, failCallback) {
  var xmlhttp;

  if (window.XMLHttpRequest)
    xmlhttp=new XMLHttpRequest();
  else
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200)
        callback(xmlhttp.responseText, url);
      else
        failCallback(url);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
};

/**
 * Issue Multiple AJAX requests to get data, and a single callback is called
 * after all AJAX requests ar completed successfully.
 */
var AjaxRequestsMulti = function(urls, callbackMulti, failCallbackMulti) {
  var isAllCallsCompleted = false;
  var isCallFailed = false;
  var data = [];

  // Iterates through urls array to send AJAX requests
  for (var i=0; i<urls.length; i++) {
    
    // If callback is successful, response text from AJAX reuqest is added to data array.
    var callback = function(responseText, url) {
      if (isCallFailed) return;

      // Add JSON object to data array.
      data[url] = JSON.parse(responseText);

      // get size of data
      var size = 0;
      for (var index in data) {
        if (data.hasOwnProperty(index))
          size ++;
      }

      if (size == urls.length)
        // all AJAX requests are completed successfully
        callbackMulti(data);
    };

    var failCallback = function(url) {
      isCallFailed = true;
      failCallbackMulti(url);
    };

    AjaxRequest(urls[i], callback, failCallback);
  }
};