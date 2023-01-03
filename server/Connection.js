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
  
    for(var i=0; i<results.length; i++){
        console.log(results[i].success_time)
    }

})

