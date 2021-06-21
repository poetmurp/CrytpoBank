const Web3 = require('web3');
const ethers = require('ethers');
const mysql = require('mysql')
const AWSHttpProvider = require('@aws/web3-http-provider');

exports.lambdaHandler = async (event) => {
  const endpoint = process.env.AMB_HTTP_ENDPOINT;
  const credentials = {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
  }
  const wallet = process.env.ETHEREUM_WALLET;
  const dbHost = process.env.MYSQL_HOST;
  const dbUser = process.env.MYSQL_USER;
  const dbPassword = process.env.MYSQL_PASSWORD;
  const dbDatabase = process.env.MYSQL_DATABASE;

  const web3 = new Web3(new AWSHttpProvider(endpoint));

  const baseProvider = new AWSHttpProvider(endpoint, credentials);

  let provider = new ethers.providers.Web3Provider(baseProvider);

  const balance = web3.eth.getBalance(wallet).then((response) => web3.utils.fromWei(response, "ether")).then((response) => { return response; });

  const bal = await balance;

  const dbconn = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbDatabase
  });

  dbconn.connect((err) => {
    if (err) throw err;
  });

  const query = "update ethereum set balance = '" + bal + "';";
  dbconn.query(query, (err, rows) => { if (err) throw err; });
  return { statusCode: 200, 
           headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "https://www.example.com",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
           body: JSON.stringify({ balance: bal }) 
          };

}