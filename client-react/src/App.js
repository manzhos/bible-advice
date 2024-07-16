import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [textQ, setTextQ] = useState('')
  const [answerQ, setAnswerQ] = useState('')

  useEffect(() => { console.log('Question:', textQ) }, [textQ])
  useEffect(() => { console.log('Answer:', answerQ) }, [answerQ])

  async function findAnswer() {
    console.log('Pray:', textQ)
    const url = 'http://5.161.127.35:3300/api/advice';
    // const url: string = 'https://bible-advice-8cjro9dpz-manzhos-projects.vercel.app/api/advice';

    try {
      if (!textQ || textQ === '') {
        setAnswerQ('You not type any question');
        return;
      }
      if (url === ''){
        setAnswerQ('God is busy. Please try to find support later.');
      }

      const response = await fetch(url, {
        method: 'POST', 
        // mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin':'no-cors',
        },
        body: JSON.stringify({textQ: textQ}), 
      });
      // console.log(response);
      const respData = await response.json()
      // console.log(respData);
      setAnswerQ(respData.message);
    } catch (error) {
      console.log('Error:', error);
      setAnswerQ('God is busy. Please try to find support later.'); //Your god want your money
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0C0C0C",
          }}
        >
          <input
            style={{
              backgroundColor: "#3A3A3A",
              color: "#FFC000",
              margin: 12,
              padding: 12,
              borderRadius: 15,
              // width: "75wh"
            }}
            onChange={(event) => {setTextQ(event.target.value)}}
            value = {textQ}
          />
          <div>
            <button onClick={() => {findAnswer()}}>
              {'Ask the Bible'}
            </button>
          </div>
          <p 
            style={{
              color: "#FFC000",
              marginTop:30,
              borderColor: "#FFC000",
              borderRadius: 15,
              borderWidth: 1,
              padding: 24,
            }}
          >
            {answerQ}
          </p>      
        </div>
      </header>
    </div>
  );
}

