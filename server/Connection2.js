const fetch = require('node-fetch-commonjs');
// const New = require('./config/mysql');
const mysql = require('mysql2/promise');

//establishinng the connection with db
async function New() {
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: "root",
            password: "",
            database: "internship"
        });
        return conn
    }
    catch (err) {
        console.log(err.message);
    }
}
module.exports = New;

async function BTC() {
    try {
    const conn = await New();

  

    var d = new Date()

    const current_time = Date.now()

    const before_time = current_time - 60000

    const start_date = new Date(before_time)

    const five_mins_ago = current_time - 300000

    var chart = "";
    var chart1 = "";
    var chart2 = "";
    var chart3 = "";
    var chart4 = "";
    var chart5 = "";

    for(var i=five_mins_ago; i<current_time; i += 60000){
         
        // const starting = new Date(i)
        const high = i
        const end = high + 60000

        const starting = new Date(high).toLocaleString("sv-SE")
        const ending = new Date(end).toLocaleString("sv-SE")

        //QUERY 1
var results= await conn.query(`SELECT SUM(bid_qty) as volume,MIN(bid_price) as low, MAX(bid_price) as high,open_order FROM dbt_biding WHERE open_order >= '${starting}' AND open_order <= '${ending}' AND market_Symbol='BTC_USDT'`)
// console.log(results[0][0]);           
var vol = results[0][0].volume
            var high1 = results[0][0].high
            var low1 =  results[0][0].low
            var time = results[0][0].open_order
            
            if(vol != ''){
                vol = vol + ', '
            }
            if(high1 != ''){
                high1 = high1 + ', '
            }
            if(low1 != ''){
                low1 = low1 + ', '
            }
            if(time != ''){
                time = time + ', '
            }

            //assigning to the charts
            chart += Date.parse(time) +','
            chart3 += high1
            chart4 += low1
            chart5 += vol
            console.log('--------------------')
            console.log('Time : '+ chart)
            console.log('high : '+ chart3)
            console.log('low : ' + chart4)
            

   
        // //QUERY 2
var result0 = await conn.query(`SELECT bid_price as open,open_order FROM dbt_biding WHERE open_order >= '${starting}' AND open_order <= '${ending}' AND market_symbol='BTC_USDT' ORDER BY id asc`)
           
            var open1 = result0[0][0].open

            if(open1 != ''){
                open1 = open1 + ', '
            }
            chart2 += open1

            console.log('open : '+ chart2)  

        // //QUERY 3
var result3= await conn.query(`SELECT bid_price as close, open_order FROM dbt_biding WHERE open_order >= '${starting}' AND open_order <= '${ending}'  AND market_symbol='BTC_USDT' ORDER BY id desc`)
        
var close1 = result3[0][0].close
            
        if(close1 != ''){
            close1 = close1 + ', '
        }

        chart1 += close1
        console.log('close : ' +chart3);

}
str = str.replace(/,\s*$/, "");


var newarray='{"t":['+chart.replace(/,\s*$/, "")+'],"o":['+chart2.replace(/,\s*$/, "")+'],"h":['+chart3.replace(/,\s*$/, "")+'],"l":['+chart4.replace(/,\s*$/, "")+'],"c":['+chart1.replace(/,\s*$/, "")+'],"v":['+chart5.replace(/,\s*$/, "")+'],"s":"ok"}';
//t = open_order convert it into string time format
//store the output in the json file

console.log(newarray)
//desired foramt
// 2023-01-04 17:00:00

const fs = require('fs');
const writeStream = fs.createWriteStream('file.txt');
const pathName = writeStream.path;
 
let array = ['1','2','3','4','5','6','7'];
  
// array.forEach(value => 
    // writeStream.write(`${newarray}\n`)
    
    // );

writeStream.on('finish', () => {
   console.log(`wrote all the array data to file ${pathName}`);
});

writeStream.on('error', (err) => {
    console.error(`There is an error writing the file ${pathName} => ${err}`)
});

writeStream.end();

// const fs = require('fs');

fs.readFile('./file.txt', 'utf8', (error, data) => {
     if(error){
        console.log(error);
        return;
     }
     console.log(JSON.parse(data));

})
}
catch (err) {
    console.log(err);
}
}
BTC();