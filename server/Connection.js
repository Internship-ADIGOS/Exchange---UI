const mysql = require('mysql')

//Creating the connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: 'internship'
})

//connection to the database
const connectDB = connection.connect()

module.exports = connectDB

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
       const answer =  connection.query(`SELECT SUM(complete_qty) as volume,MIN(bid_price) as low, MAX(bid_price) as high,success_time FROM dbt_biding_log WHERE success_time >= '${starting}' AND success_time <= '${ending}' AND market_Symbol='BTC_USDT'`)

            var high1 = answer.high
            var vol = answer.volume
            var low1 =  answer.low
            var time = answer.open_order

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
            chart += Date.parse(time)+','
            chart3 += high1
            chart4 += low1
            chart5 += vol

            console.log(chart)
            
   
        // //QUERY 2
        const answer2 = connection.query(`SELECT  (bid_price) as open,success_time FROM dbt_biding_log WHERE success_time >= '${starting}' AND success_time <= '${ending}' AND market_symbol='BTC_USDT' ORDER BY log_id asc`)
            
            var open1 = answer2.open

            if(open1 != ''){
                open1 = open1 + ', '
            }
            chart2 += open1

            
            // //QUERY 3
            const answer3 = connection.query(`SELECT bid_price as close, success_time FROM dbt_biding_log WHERE success_time >= '${starting}' AND success_time <= '${ending}'  AND market_symbol='BTC_USDT' ORDER BY log_id desc`)
            
            var close1 = answer3.close
            
            if(close1 != ''){
                close1 = close1 + ','
            }
            
            chart1 += close1
            
}
    
        console.log('--------------------')
        console.log( chart)
        console.log('-----------Time :-------- ')
        console.log('---------hign-----------')
        console.log(chart3)
        console.log('-----low-----------')
        console.log( chart4)
        console.log('------close--------')
        console.log(chart1);
        console.log('---------------')
        console.log( chart2)  
        


// {"t":[],"o":[],"h":[],"l":[],"c":[],"v":[],"s":"ok"}
//t = open_order convert it into string time format
//store the output in the json file

//desired foramt
// 2023-01-04 17:00:00
