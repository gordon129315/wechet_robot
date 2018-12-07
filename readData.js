const fs = require('fs');

readData = function(filePath) {
    let lines = require('fs').readFileSync(filePath, 'utf-8').split(/\r?\n/);
    // console.log(lines);
    lines = lines.filter((line) => line.trim() != '');
    // console.log(lines);
    let data = [[],[]];
    for (let i in lines) {
        let line = lines[i].split('|');
        data[0].push(line[0].trim());
        data[1].push(line[1].trim());

    }
    
    return data;
}



//test
//data[0] 群名字的集合， data[1]图片名字的集合
test = function() {
    let data = readData('./data/data.txt');
    data.forEach(element => {
        console.log(element);
    });
}

// test();



// console.log(data);


module.exports = {
    readData
}