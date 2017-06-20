'use strict';



/*I want to create a function that will push an array of hoursOpen into an object constructor so i dont have to do it for each store. */

/*I want to take randomCount and multiply it by avgCookie 15 times (for 15 hours) and push the product into the cookiePerHour array within each store object.*/

var tableEl = document.createElement('table');
document.body.appendChild(tableEl);

//creates a random amount of customers
function randomCust(min, max){
  var randomCount = Math.floor(Math.random() * (max + 1 - min)) + min;
  // console.log(randomCount);
  return randomCount;
}

//creates an hoursOpen array for each location
function pushHoursOpen(store){
  for(var i = 1; i < storeObjects.length; i++){
    store.hoursOpen = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
  }
}

//This function multiplies the randomCust by the avgCookie sales to create a random number for cookies sold per hour. and pushes that into the empty cookiePerHour array 15 times (or the length of the hoursOpen array).
function perHour(store){
  for(var i = 1; i <= store.hoursOpen.length; i++){
    store.cookiePerHour.push(randomCust(store.custMin, store.custMax) * Math.floor(store.avgCookie));
  };
  console.log(store.cookiePerHour);
}

//Creates the top row of the table, which is each hour the stores are open plus the word 'Totals'.
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

//creates a function that takes all my data and puts it into a table in HTML
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

//sole purpose of this function is so that I can loop through all the stores objects and put the data into the table.
function loopStores(){
  for (var i = 0; i < storeObjects.length; i++){
    allLocations(storeObjects[i]);
  }
}

//this is a function that calls all my other functions so i dont have to call so many functions at the end of my code.
function allLocations(store){
  pushHoursOpen(store);
  perHour(store);
  pushToSales(store);
}

//object constructor that allows me to create new stores.
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

/* I want to create a function that will create a new store from a users input and add it to my array storeObjects so that I can eventually get a total of the cookies sold per hour over all locations.

I want to figure out a way to essentialy have the user create a "new Locations" that I can push into the storeObjects array so that all the code I have already will work for it and I can then get the cookiePerHour total for each location no matter how many there are.   */

var formEl = document.getElementById('new-store');
formEl.addEventListener('submit', handleSubmit);

function handleSubmit(event){
  event.preventDefault();

  var newLocation = new Locations(event.target.location.value, parseInt(event.target.custMin.value), parseInt(event.target.custMax.value), parseInt(event.target.avgCookie.value));
  console.log(newLocation);
  allLocations(newLocation);
}


putInHours();
loopStores();
