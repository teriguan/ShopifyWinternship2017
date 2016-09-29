/**
 * Modified from user siongui "JS Single Callback for Multiple Asynchronous AJAX Requests" on GitHub
 * https://siongui.github.io/2012/09/29/javascript-single-callback-for-multiple-asynchronous-xhr-requests/
 * 
 * Callback function after all AJAX requests are completed successfully.
 */
var callbackMulti = function (data) {
    var timepieces = [];
    
    // Iterates through data array
    for (var index in data) {
        var products = data[index].products;

        // Iterates through products to add clocks or watches to timepieces array.
        for (var index in products) {
            var object = products[index];
            if (isTimepiece(object.product_type)) {
                timepieces.push(object);
            }
        }
    }
    // Add each timepiece to cart.
    addTimepiece(timepieces);
};

/**
 * Callback function if one of AJAX requests fails.
 */
var failCallbackMulti = function(url) {
  // Alerts which url failed.
  alert(url + ' failed');
};

/**
 * Array of all the endpoint pages.
 */
var urls = ['https://shopicruit.myshopify.com/products.json?page=1',
            'https://shopicruit.myshopify.com/products.json?page=2',
            'https://shopicruit.myshopify.com/products.json?page=3',
            'https://shopicruit.myshopify.com/products.json?page=4',
            'https://shopicruit.myshopify.com/products.json?page=5'];

document.getElementById('bt').onclick = function() {
  AjaxRequestsMulti(urls, callbackMulti, failCallbackMulti);
};