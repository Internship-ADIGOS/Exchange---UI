const mysql = require('mysql')

//Creating the connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'internship'
})

//connection to the database
const connectDB = connection.connect()

module.exports = connectDB


connection.query('SELECT * FROM dbt_biding_log', (error, results, fields)=>{

    if(error){
        console.log(error)
    }
  
    // case 1: If he says to fetch the timestamp from the database
    // //fetching the current time data from the db

    // for(var i=0; i<results.length; i++){
    //     const ans = console.log(Date.parse((results[i].success_time)))
    // }


    var d = new Date()
    // console.log(d.getTime())
     //This is for the 1 minute time
    const current_time = Date.now()
    // console.log(current_time)

    //we want the timestamp 1 min before (60 seconds before)
    const before_time = current_time - 60000
    // console.log(before_time)

    //converting the before time to date format
    const start_date = new Date(before_time)
    // console.log(start_date)


    //This is for the 5 mins time
    const five_mins_ago = current_time - 300000
    // console.log(five_mins_ago)

    // console.log("Looping !")
    //loop 

    //defining the charts
    var chart = "";
    var chart1 = "";
    var chart2 = "";
    var chart3 = "";
    var chart4 = "";
    var chart5 = "";

    for(var i=five_mins_ago; i<=current_time; i += 60000){
         
        // const starting = new Date(i)
        const high = i
        const end = high + 60000

        const starting = new Date(high).toLocaleString("sv-SE")
        const ending = new Date(end).toLocaleString("sv-SE")
        // console.log(starting)
        // console.log(ending)
        // console.log("--")
        // const ending = new Date(i + 60000)

        // console.log(ans.toLocaleDateString())
        // console.log(ans.toLocaleTimeString())
        // console.log(starting.toLocaleString("sv-SE"))

        //QUERY 1
        connection.query(`SELECT SUM(complete_qty) as volume,MIN(bid_price) as low, MAX(bid_price) as high,success_time FROM dbt_biding_log WHERE success_time >= '${starting}' AND success_time <= '${ending}' AND market_Symbol='BTC_USDT'`, (error, results, fields)=>{

            //if any error exists
            if(error){
                console.log(error)
            }
            var vol = results[0].volume
            var high1 = results[0].high
            var low1 =  results[0].low
            var time = results[0].success_time
            
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
            chart += Date.parse(time)
            chart3 += high1
            chart4 += low1
            chart5 += vol

            console.log(chart)
            // console.log(chart3)
            // console.log(chart4)
        })
   
        // //QUERY 2
        connection.query(`SELECT  (bid_price) as open,success_time FROM dbt_biding_log WHERE success_time >= '${starting}' AND success_time <= '${ending}' AND market_symbol='BTC_USDT' ORDER BY log_id asc`, (error, results, fields)=>{
            
            if(error){
                console.log(error)
            }
            
            var open1 = results[0].open

            if(open1 != ''){
                open1 = open1 + ','
            }
            chart2 = open1

            // console.log(open1)  
        })
        
        // //QUERY 3
        connection.query(`SELECT bid_price as close, success_time FROM dbt_biding_log WHERE success_time >= '${starting}' AND success_time <= '${ending}'  AND market_symbol='BTC_USDT' ORDER BY log_id desc`, (error, results, fields)=>{
            
            if(error){
                console.log(error)
            }
            var close1 = results[0].close
            
            if(close1 != ''){
                close1 = close1 + ','
            }

            chart1 = close1
        })
        

}

// {"t":[],"o":[],"h":[],"l":[],"c":[],"v":[],"s":"ok"}
//t = success_time convert it into string time format
//store the output in the json file

//desired foramt
// 2023-01-04 17:00:00

})