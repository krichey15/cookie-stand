'use strict';



/*I want to create a function that will push an array of hoursOpen into an object constructor so i dont have to do it for each store. */

/*I want to take randomCount and multiply it by avgCookie 15 times (for 15 hours) and push the product into the cookiePerHour array within each store object.*/

var tableEl = document.createElement('table');
document.body.appendChild(tableEl);

function randomCust(min, max){
  var randomCount = Math.floor(Math.random() * (max + 1 - min)) + min;
  // console.log(randomCount);
  return randomCount;
}

function pushHoursOpen(store){
  for(var i = 1; i < storeObjects.length; i++){
    store.hoursOpen = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
  }
}

function perHour(store){
  for(var i = 1; i <= store.hoursOpen.length; i++){
    store.cookiePerHour.push(randomCust(store.custMin, store.custMax) * Math.floor(store.avgCookie));
  };
  console.log(store.cookiePerHour);
}

function putInHours(){
  var hours = [' ', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', 'Totals'];

  var tableRowEl = document.createElement('tr');
  tableEl.appendChild(tableRowEl);

  for(var i = 0; i <= hours.length; i++){
    var tableDataEl = document.createElement('td');
    tableRowEl.appendChild(tableDataEl);
    tableDataEl.textContent = hours[i];
  };
}

/*I want change the code below so that it creates a table instead of a list. */
function pushToSales(store){
  var tableRowEl = document.createElement('tr');
  tableEl.appendChild(tableRowEl);

  var tableDataEl = document.createElement('td');
  tableRowEl.appendChild(tableDataEl);
  tableDataEl.textContent = store.location;

  for(var i = 0; i < store.hoursOpen.length; i++){
    var cookieDataEl = document.createElement('td');
    tableRowEl.appendChild(cookieDataEl);
    cookieDataEl.textContent = store.cookiePerHour[i];
  };
  var totalPerDay = document.createElement('td');
  tableRowEl.appendChild(totalPerDay);
  var sumStore = store.cookiePerHour.reduce(function(total, amount){
    return total + amount;
  });
  totalPerDay.textContent = sumStore;

}
//this is the start of the totals for each hour.
// function footer() {
//   var footEl = document.createElement('tfoot');
//   tableEl.appendChild('footEl');
//   footEl.textContent =
// }

function loopStores(){
  for (var i = 0; i < storeObjects.length; i++){
    allLocations(storeObjects[i]);
  }
}

function allLocations(store){
  pushHoursOpen(store);
  perHour(store);
  pushToSales(store);
}

function Locations(location, custMin, custMax, avgCookie){
  this.location = location;
  this.custMin = custMin;
  this.custMax = custMax;
  this.avgCookie = avgCookie;
  this.cookiePerHour = [];
}

var pike = new Locations('1st and Pike', 23, 65, 6.3, []);
var seaTac = new Locations('SeaTac Airport', 3, 24, 1.2, []);
var seattleCenter = new Locations('Seattle Center', 11, 38, 3.7, []);
var capitolHill = new Locations('Capitol Hill', 20, 38, 2.3, []);
var alki = new Locations('Alki', 2, 16, 4.6, []);

var storeObjects = [pike, seaTac, seattleCenter, capitolHill, alki];
// console.log(storeObjects);

var formEl = document.getElementById('new-store');
formEl.addEventListener('submit', handleSubmit);

function handleSubmit(event){
  event.preventDefault();

  var location = event.target.location.value;
  var custMin = parseInt(event.target.custMin.value);
  var custMax = parseInt(event.target.custMax.value);
  var avgCookie = parseInt(event.target.avgCookie.value);

  if(location === '1st and Pike' || location === 'SeaTac Airport' || location === 'Seattle Center' || location === 'Capitol Hill' || location === 'Alki') {
    alert('Invalid input, that store already exists.');
  } else {
    var newStore = new Locations(location, custMin, custMax, avgCookie);
    pushHoursOpen(newStore);
    perHour(newStore);
    pushToSales(newStore);
  }
}

putInHours();
loopStores();
