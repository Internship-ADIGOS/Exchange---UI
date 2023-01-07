const fetch = require('node-fetch-commonjs');
// const New = require('./config/mysql');
const mysql = require('mysql2/promise');
const { rejects } = require('assert');

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
module.exports = New;
 const  BTC = async () => {
    try {
    const conn = await New();

  

    var d = new Date()

    const current_time = Date.now()

    const before_time = current_time - 60000

    const start_date =  new Date(before_time)

    const five_mins_ago = current_time - 120600000
    console.log(new Date(five_mins_ago).toLocaleString("sv-SE"))
    var chart = "";
    var chart1 = "";
    var chart2 = "";
    var chart3 = "";
    var chart4 = "";
    var chart5 = "";
        var jj=1;
    for(var i=five_mins_ago; i<current_time; i += 60000){
         console.log(jj++)
         console.log('--------------------')
           
        // const starting = new Date(i)
        const high = i
        const end = high + 60000

        const starting = new Date(high).toLocaleString("sv-SE")
        const ending = new Date(end).toLocaleString("sv-SE")
console.log(starting)
console.log('--------------------')
           
// console.log(ending)
// console.log('--------------------')
           
        //QUERY 1
var results= await conn.query(`SELECT SUM(complete_qty) as volume,MIN(bid_price) as low, MAX(bid_price) as high,success_time FROM dbt_biding_log WHERE success_time >= '${starting}' AND success_time <= '${ending}' AND market_symbol='TRX_USDT'`)
   
console.log('--------------------')
if ( results[0].length > 0)
{

       
var vol = results[0][0].volume
            var high1 = results[0][0].high
            var low1 =  results[0][0].low
            var time = results[0][0].success_time
            
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
            chart += (Date.parse(time))/1000 + ', '
            chart3 += high1
            chart4 += low1
            chart5 += vol
           // console.log('--------------------')
            // console.log('Time : '+chart)
            // console.log('high : '+chart3)
            // console.log('low : ' +chart4)
            

   
        // //QUERY 2
}
var result0= await conn.query(`SELECT  (bid_price) as open,success_time FROM dbt_biding_log WHERE success_time >= '${starting}' AND success_time <= '${ending}' AND market_symbol='TRX_USDT' ORDER BY log_id asc`)
// console.log(result0); 
if(Array.isArray(result0[0]) && !result0[0].length)
 { 
    
 }
 else
 {
    var open1 = result0[0][0].open

        if(open1 != ''){
            open1 = open1 + ','
        }
        chart2 += open1
    }
            // console.log('open : '+chart2)  

        // //QUERY 3
       var result3= await conn.query(`SELECT bid_price as close, success_time FROM dbt_biding_log WHERE success_time >= '${starting}' AND success_time <= '${ending}'  AND market_symbol='TRX_USDT' ORDER BY log_id desc`)
       
       if(Array.isArray(result3[0]) && !result3[0].length)
       {}
       else
       { 
       var close1 = result3[0][0].close
            
        if(close1 != ''){
            close1 = close1 + ','
        }

            chart1 += close1
        // console.log('close : ' +result3);
    }
}
// str = str.replace(/,\s*$/, "");

var newarray='{"t":['+chart.replace(/,\s*$/, "")+'],"o":['+chart2.replace(/,\s*$/, "")+'],"h":['+chart3.replace(/,\s*$/, "")+'],"l":['+chart4.replace(/,\s*$/, "")+'],"c":['+chart1.replace(/,\s*$/, "")+'],"v":['+chart5.replace(/,\s*$/, "")+'],"s":"ok"}';
//t = success_time convert it into string time format
//store the output in the json file

//desired foramt
// 2023-01-04 17:00:00

const fs = require('fs');
const writeStream = await createWriteStreamAsync('my-file.txt');
const pathName = writeStream.path;

//approach 1
async function createWriteStreamAsync(pathName){
    return new Promise((resolve, reject) =>{ 
        const writeStream = fs.createWriteStream(pathName);
        writeStream.on('open', () =>{
            resolve(writeStream)
        });
        writeStream.on('error', (error)=>{
            reject(error);
        });
    });
}

(async ()=>{
    try{
        const writeStream = await createWriteStreamAsync(newarray);
        console.log('Write stream created successfully');
    }catch(error){
     console.error(error);
    }
})();
}catch (err) {
    console.log(err);
}
}
BTC()
//approach 2
// fs.writeFileSync('TRX_USDT2.json', JSON.stringify(newarray))
 
// // let array = ['1','2','3','4','5','6','7'];
  
// // //if there are  null and Nan values then dont push it to the JSON file
// if(chart != null || NaN && chart1 != null || NaN && chart2 != null || NaN && chart3 != null || NaN  && chart4 != null || NaN ){
//     // // array.forEach(value => 
//     writeStream.writeFile(`${newarray}\n`)
//     //// );
// }


// // //function for writing into the file    
// writeStream.on('finish', () => {
//    console.log(`wrote all the array data to file ${pathName}`);
// });


// writeStream.on('error', (err) => {
//     console.error(`There is an error writing the file ${pathName} => ${err}`)
// });

// writeStream.end();

// // const fs = require('fs');

// // fs.readFile('./file.txt', 'utf8', (error, data) => {
// //      if(error){
// //         console.log(error);
// //         return;
// //      }
// //      console.log(JSON.parse(data).t);

// // })
// }