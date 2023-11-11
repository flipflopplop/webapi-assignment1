const db = require('./database');
const { v4: uuidv4 } = require('uuid');

module.exports.parks = {
    // create new park entry
    new(parkData) {
        // validation
        if (parkData.rating < 0 || parkData.rating > 5) return 'Failed to create park: Invalid rating provided';

        // store new park
        db.parks.push({
            id: uuidv4(),
            name: parkData.name,
            description: parkData.description,
            opened: parkData.opened,
            ticket_price: parkData.ticket_price,
            attractions: parkData.attractions,
            location: parkData.location,
            rating: +parkData.rating.toFixed(1)
        });

        return `Park '${parkData.name}' has been added`;
    },

    // get all theme parks
    all() {
        return db.parks;
    },

    // get top (x) rated parks
    topRated(num_parks) {
        // sort by park rating, only return top (x) records
        return db.parks.sort((a, b) => b.rating - a.rating).slice(0, num_parks);
    },

    // search for park that matches exact conditions
    search(conditions) {
        return db.parks.filter(park => {
            for (var key in conditions) {
                if (park[key] == undefined || park[key] != conditions[key]) return false;
            }
            return true;
        });
    },

    // search for park by name
    searchName(name) {
        let lowerCase = name.toLowerCase();
        return db.parks.filter(park => park.name.toLowerCase().includes(lowerCase));
    },

    // search parks within entry_fee range
    searchFeeRange(min, max) {
        return db.parks.filter(park => park.entry_fee >= min && park.entry_fee <= max);
    }

}