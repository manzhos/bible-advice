import React, { useState, useEffect } from 'react';
import './App.css';

import bible from './assets/images/bible.svg'; 

export default function App() {
  const [textQ, setTextQ] = useState('')
  const [answerQ, setAnswerQ] = useState('')
  const [typedAnswer, setTypedAnswer] = useState([])

  const paragraphBreaks = ['* ', '\n'];
  // const paragraphs = originalString.split(paragraphBreaks);
  // const formattedParagraphs = paragraphs.map(paragraph => `<p style="text-align: center;">${paragraph}</p>`);

  useEffect(() => { 
    // console.log('Answer:', answerQ)
    let paragraph = []

    paragraphBreaks.map((item) => {
      if(answerQ.includes(item)) paragraph = answerQ.split(item)
    })
    // console.log('paragraph:', paragraph);

    if (paragraph.length) type(paragraph)
    else setTypedAnswer([answerQ])
  }, [answerQ])

  const type = (paragraph) => {
    const speed = 500

    paragraph.forEach((paragraph, index) => {
      setTimeout(() => {
        setTypedAnswer((prev) => [...prev, paragraph]);
      }, index * speed);
    });
  }

  // useEffect(()=>{console.log('>>> TA >>>', typedAnswer)}, [typedAnswer])

  async function findAnswer() {
    console.log('Pray:', textQ)
    setTypedAnswer([])
    // const url = 'http://5.161.127.35:3300/api/advice';
    const url = 'https://bible-advice-8cjro9dpz-manzhos-projects.vercel.app/api/advice';

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
      console.log(respData);
      // const answer = respData.message.replace('a language model', 'Bible');
      setAnswerQ(respData.message);
    } catch (error) {
      console.log('Error:', error);
      setAnswerQ('God is busy. Please try to find support later.'); //Your god want your money
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      findAnswer();
    }
  }


  return (
    <div className="App">
      <div className="App-header">
        <img 
          src={bible} 
          alt="Bible"
          style={{
            width: "100px",
            margin: "30px"
          }}
        />
        <input
          style={{
            backgroundColor: "#3A3A3A",
            color: "#FFC000",
            margin: 12,
            padding: "12px 24px",
            borderRadius: 15,
            minWidth: "300px",
            maxWidth: "80vw",
            textAlign: "center"
          }}
          onChange={(event) => {setTextQ(event.target.value)}}
          onKeyDown={handleKeyDown}
          value = {textQ}
        />
        <button
          style={{
            padding: "10px 20px",
            color: "#3A3A3A",
            backgroundColor: "#FFC000",
            borderRadius: 15,
          }}
          onClick={() => {findAnswer()}}
        >
          {'Ask the Bible'}
        </button>
        <div
          style={{
            marginTop:"30px",
            padding: "24px",
            maxWidth: "640px"            
          }}
        >
          {typedAnswer.map((block) => {
            return(
              <p>{block}</p>
            )
          })}
        </div>    
      </div>
    </div>
  );
}

