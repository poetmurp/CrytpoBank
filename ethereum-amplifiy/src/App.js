import React from 'react';
import './App.css';

function callApi() {
  const apiUrl = 'https://ikmolwko88.execute-api.us-east-1.amazonaws.com/eth-balance';
  fetch(apiUrl, {method: 'GET'}).then(data => data.json()).then(json => {document.getElementById('balance').innerHTML = json.balance;});
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Balance: <div id="balance"></div>
        <button onClick={callApi}>Call API</button>
      </header>
    </div>
  );
}

export default App;