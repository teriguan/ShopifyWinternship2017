/**
 * Constructor: timepiece object containing its title, colour and price. 
 */
function Timepiece(title, colour, price) {
                this.title = title;
                this.colour = colour;
                this.price = price;
            }

/**
 * Tests whether an object is a timepiece or not.
 */
var isTimepiece = function (obj) {
    var clock = /clock/i;
    var watch = /watch/i;
    if (clock.test(obj) || watch.test(obj)) {
        return true;
    }
    return false;
}

/**
 * Adds items to the cart.
 */
var addTimepiece = function (items) {
    var cart = [];
    for (var index in items) {
        var title = items[index].title;
        var colours = items[index].variants;
        for (var i in colours) {
            var time = new Timepiece(title, colours[i].title, colours[i].price);
            cart.push(time);
        }
    }
    document.getElementById("cart").innerHTML = '' + cart.length;
    checkout(cart);
}

/**
* Tallies up cart items and prints a list of the items and the total amount before taxes and shipping
* on to the web page.
*/
var checkout = function (basket) {
    var totalBT = 0;
    var receipt = '';
    for (var item in basket) {
        receipt += '<tr><td>' + basket[item].title + '</td><td>' + basket[item].colour 
            + '</td><td>' + basket[item].price + '</td></tr>';
        totalBT += parseFloat(basket[item].price);
    }
    document.getElementById("print").innerHTML = receipt;
    document.getElementById("total").innerHTML = "$" + totalBT.toFixed(2);
}