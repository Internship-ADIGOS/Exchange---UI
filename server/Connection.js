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
    console.log(d.getTime())
     //This is for the 1 minute time
    const current_time = Date.now()
    console.log(current_time)

    //we want the timestamp 1 min before (60 seconds before)
    const before_time = current_time - 60000
    console.log(before_time)

    //converting the before time to date format
    const start_date = new Date(before_time)
    console.log(start_date)


    //This is for the 5 mins time
    const five_mins_ago = current_time - 300000
    console.log(five_mins_ago)

    console.log("Looping !")
    //loop 
    for(var i=five_mins_ago; i<=current_time; i += 60000){
         
        const ans = new Date(i)
        // console.log(ans.toLocaleDateString())
        // console.log(ans.toLocaleTimeString())
        console.log(ans.toLocaleString())
    }
    // connection.query(`SELECT SUM(complete_qty) as volume,MIN(bid_price) as low,MAX(bid_price) as high,success_time FROM dbt_biding_log WHERE success_time >= '2022-11-30 21:54:08' AND success_time <= '2022-11-30 21:55:08'     market_Symbol='BTC_USDT';`)

})

