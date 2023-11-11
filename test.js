const tp = require('./IsaacKoh_ThemeParks');

// // add new park
// const newPark = tp.parks.new({
//     name: 'New Park',
//     description: 'This is a new park created by me.',
//     opened: 2023,
//     ticket_price: 50,
//     attractions: 12,
//     location: 'Singapore',
//     rating: 4.88888
// });
// console.log(newPark);

// // get all theme parks (tp)
// const allParks = tp.parks.all();
// console.log(allParks);

// get top
// const parks = tp.parks.topRated(3);
// console.log(parks);

// // search park by exact conditions
// const searchPark = tp.parks.search({
//     location: "Singapore"
// })
// console.log('Search results: ' + searchPark);

// // search park by name
// const searchParkName = tp.parks.searchName('uni');
// console.log('Search results: ' + searchParkName);

// search parks within entry_fee range
const results = tp.parks.searchFeeRange(0, 100);
console.log("Parks within price range: " + JSON.stringify(results, null, 2));