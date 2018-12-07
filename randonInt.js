randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // returns a random integer from min to max
}


//test
test = function() {
    for (let i = 0; i < 20; i++) {
        console.log(randomInt(4,8));
    }
}

// test();

module.exports = {
    randomInt
}

