var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");
const toxicArea = require('./toxicArea');
// var allEaterStatistic = require('./statistics')

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

grassArr = [];
grassEaterArr = [];
ToxicAreaArr = [];
allEaterArr = [];
aeEaterArr = [];
matrix = [];

var n = 50;

Grass = require("./Grass")
ToxicArea = require("./toxicArea")
GrassEater = require("./GrassEater")
AllEater = require("./AllEater")
AeEater = require("./AeEater")
console.log(ToxicArea);

function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 3))
        
    }  
}

io.sockets.emit("send matrix", matrix)



function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 1 
                grassArr.push(new Grass(x, y))
            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = 2
                grassEaterArr.push(new GrassEater(x, y))
            }
            else if (matrix[y][x] == 3) {
                matrix[y][x] = 3
                allEaterArr.push(new allEater(x, y))
            }
            else if (matrix[y][x] == 4) {
                matrix[y][x] = 4
                aeEaterArr.push(new AeEater(x, y))
            }
            else if (matrix[y][x] == 6) {
                matrix[y][x] = 6
                ToxicAreaArr.push(new toxicArea(x, y))
            }

        }
    }
    io.sockets.emit('send matrix', matrix)
}

function game() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in ToxicArea){
        ToxicAreaArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in allEaterArr) {
        allEaterArr[i].eat();
    }
    for (var i in aeEaterArr) {
        aeEaterArr[i].eat();
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)


function kill() {
    grassArr = [];
    ToxicAreaArr = [];
    grassEaterArr = [];
    allEaterArr = [];
    aeEaterArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrassEater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addAllEater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            allEaterArr.push(new AllEater(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addAeEater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            aeEaterArr.push(new AeEater(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addtoxicArea() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6
            ToxicAreaArr.push(new toxicArea(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add Alleater", addAllEater);
    socket.on("add AeEater", addAeEater);
    socket.on("add toxicArea", addtoxicArea);
});


var statistics = {};

// var statisticsgrass =  document.querySelector('grassStatistics');
// var statisticsgrassEater =  document.querySelector('grassEaterStatistics');
// var statisticsallEater =  document.querySelector('allEaterStatistics');
// var statisticsaeEater =  document.querySelector('aeEaterStatistics');
// var statisticsfunnyKiller =  document.querySelector('funnyKillerStatistics');

// console.log(allEaterStatistic.allStatistics);
 

setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.allEater = allEaterArr.length;
    statistics.aeEater = aeEaterArr.length;
    
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        
    })
},1000)