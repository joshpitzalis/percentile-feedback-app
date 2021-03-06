exports.parseData = function(rawData, todayDate){

var data = [];
for(var i=0; i<rawData.rows.length; i++){
    if (rawData.rows[i][3] > 0){
        var time = parseInt(rawData.rows[i][0].split("T")[1].split(":")[0]);
        var date = rawData.rows[i][0].split("T")[0];
        data.push([date, time, rawData.rows[i][1]]);
    }
}

var date = data[0][0];
var today=[];
var month=[];
var prod = 0;
var hist = {
    0: [], 1: [], 2: [], 3: [], 4: [], 5: [],
    6: [], 7: [], 8: [], 9: [], 10: [], 11: [],
    12: [], 13: [], 14: [], 15: [], 16: [], 17: [],
    18: [], 19: [], 20: [],21: [], 22: [], 23: [],
};

for(var i=0; i<data.length; i++){
    var gap = 0;
    //add first value
    if(i===0){
        prod = data[i][2];
        month.push([data[i][1], prod]);
        hist[data[i][1]].push(prod);
    } else {
        var sameDate = (data[i][0] === data[i-1][0]);
        var sameHour = (data[i][1] === data[i-1][1]);
        var isToday = (todayDate === data[i][0]);
        if(!isToday){
            var lastEntry = (data[i][1]<24 && data[i][0] != data[i+1][0]);
            if(!lastEntry){
                gap = data[i+1][1] - data[i][1];
            }
        }
        if(!sameDate){prod=data[i][2];}      
        //if date and hour are the same, add prod, replace previous entry
        if(sameDate && !isToday){
            if(sameHour){month.pop();}
            prod += data[i][2];
            month.push([data[i][1], prod]);
            hist[data[i][1]].push(prod);
            //check to see if there is a blank or if its the last entry for the day
            if(lastEntry){
                for(var j = (data[i][1]+1); j<24; j++){
                    month.push([j, prod]);
                    hist[j].push(prod);
                }
            }
            if(gap > 1){
                for(var g = 1; g < gap; g++ ){
                    month.push([(data[i][1]+g), prod]);
                    hist[(data[i][1]+g)].push(prod);
                }
            }
        }
        
        if(isToday){
            if(today.length<1){prod=0;}
            if(sameHour){today.pop();}
            prod += data[i][2];
            today.push([data[i][1], prod]);
        }
    }
}

var hour = hist[today[today.length - 1][0]];
var greaterThan = 0;
hour.forEach(function(val, index, array){
   if(today[today.length -1][1] > val){  
        greaterThan++;
   }
});

var pfaColor;
var pfa = Math.round(greaterThan/hour.length*100);
if(pfa <  25){pfaColor = 'rgba(255,0,0,1)';}
if(pfa >= 25 && pfa <= 75){pfaColor = 'rgba(125,125,0,1)';}
if(pfa > 75){pfaColor = 'rgba(144,238,126,1)';}

    myData = {
        daily: today,
        monthly: month,
        date: todayDate,
        hist: hist,
        pfa: [pfa, 100-pfa],
        pfaColor: pfaColor
    };

    return myData;
}