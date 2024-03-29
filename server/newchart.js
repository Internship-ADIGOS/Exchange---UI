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
async function BTC() {
    try {
        const conn = await New();



        var d = new Date()

        const current_time = Date.now()

        const before_time = current_time - 60000

        const start_date = new Date(before_time)

        const five_mins_ago = current_time - 120600000
        console.log(new Date(five_mins_ago).toLocaleString("sv-SE"))
        var chart = "";
        var chart1 = "";
        var chart2 = "";
        var chart3 = "";
        var chart4 = "";
        var chart5 = "";
        var jj = 1;
        for (var i = five_mins_ago; i < current_time; i += 60000) {
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
            var results = await conn.query(`SELECT SUM(complete_qty) as volume,MIN(bid_price) as low, MAX(bid_price) as high,success_time FROM dbt_biding_log WHERE success_time >= '${starting}' AND success_time <= '${ending}' AND market_symbol='TRX_USDT2'`)

            console.log('--------------------')
            if (results[0].length > 0) {


                var vol = results[0][0].volume
                var high1 = results[0][0].high
                var low1 = results[0][0].low
                var time = results[0][0].success_time

                if (vol != '') {
                    vol = vol + ', '
                }
                if (high1 != '') {
                    high1 = high1 + ', '
                }
                if (low1 != '') {
                    low1 = low1 + ', '
                }
                if (time != '') {
                    time = time + ', '
                }

                //assigning to the charts
                chart += (Date.parse(time)) / 1000 + ','
                chart3 += high1
                chart4 += low1
                chart5 += vol
                // console.log('--------------------')
                // console.log('Time : '+chart)
                // console.log('high : '+chart3)
                // console.log('low : ' +chart4)



                // //QUERY 2
            }
            var result0 = await conn.query(`SELECT  (bid_price) as open,success_time FROM dbt_biding_log WHERE success_time >= '${starting}' AND success_time <= '${ending}' AND market_symbol='TRX_USDT2' ORDER BY log_id asc`)
            // console.log(result0); 
            if (Array.isArray(result0[0]) && !result0[0].length) {

            }
            else {
                var open1 = result0[0][0].open

                if (open1 != '') {
                    open1 = open1 + ','
                }
                chart2 += open1
            }
            // console.log('open : '+chart2)  
            // //QUERY 3
            var result3 = await conn.query(`SELECT bid_price as close, success_time FROM dbt_biding_log WHERE success_time >= '${starting}' AND success_time <= '${ending}'  AND market_symbol='TRX_USDT2' ORDER BY log_id desc`)

            if (Array.isArray(result3[0]) && !result3[0].length) { }
            else {
                var close1 = result3[0][0].close

                if (close1 != '') {
                    close1 = close1 + ','
                }

                chart1 += close1
                // console.log('close : ' +result3);
            }
        }
        // str = str.replace(/,\s*$/, "");

        var newarray = '{"t":[' + chart.replace(/,\s*$/, "") + '],"o":[' + chart2.replace(/,\s*$/, "") + '],"h":[' + chart3.replace(/,\s*$/, "") + '],"l":[' + chart4.replace(/,\s*$/, "") + '],"c":[' + chart1.replace(/,\s*$/, "") + '],"v":[' + chart5.replace(/,\s*$/, "") + '],"s":"ok"}';
        //t = success_time convert it into string time format
        //store the output in the json file

        //desired foramt
        // 2023-01-04 17:00:00

        const fs = require('fs');
        const writeStream = fs.createWriteStream('TRX_USDT2.json');
        const start = fs.statSync("TRX_USDT2").size - 2;
        const pathName = writeStream.path;

        // let array = ['1','2','3','4','5','6','7'];

        writeStream.flatten().toJSONArray().shift(1).pipe(
            fs.createWriteStream(TRX_USDT2.json,
                { flags: 'r+', start }
            ));

        //function for adding the array to existing array in json file
        function appendJsonToFile(writeStream, newarray) {
            return new Promise((resolve, reject) => {
                try {
                    writeStream.write(newarray)
                    resolve('STREAM_WRITE_SUCCESS')
                } catch (StreamError) {
                    console.error('STREAM_WRITE_FAILURE', StreamError)
                }
            })
        }
        //if the JSON File is not empty then we will call this function
        var fileData = fs.readFile('TRX_USDT2.json', (err, data) => {
            if (fileData.length == 0) {
                //we are calling the function
                appendJsonToFile(writeStream, newarray);
            } else {
                //// array.forEach(value => 
                writeStream.create(`${newarray}\n`)
                //     // );

                writeStream.on('finish', () => {
                    console.log(`wrote all the array data to file ${pathName}`);
                });

                writeStream.on('error', (err) => {
                    console.error(`There is an error writing the file ${pathName} => ${err}`)
                });

                writeStream.end();
            }
        })
    }
    catch (err) {
        console.log(err);
    }
}
BTC();