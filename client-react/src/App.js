import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

export default function App() {
  const [textQ, onChangeTextQ] = useState('')
  const [answerQ, setAnswerQ] = useState('')

  useEffect(() => { console.log('Question:', textQ) }, [textQ])
  useEffect(() => { console.log('Answer:', answerQ) }, [answerQ])

  const { GoogleGenerativeAI } = require("@google/generative-ai");
  // const fs = require("fs");
  // const genAI = new GoogleGenerativeAI('AIzaSyD2_aeaVxzb9VrneQ7BCPY4eCLWEQMReSU');
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

  async function findAnswer() {
    console.log('textQ:', textQ)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    try{
      const result = await model.generateContent([
        textQ,
        // {inlineData: {data: Buffer.from(fs.readFileSync('path/to/image.png')).toString("base64"), mimeType: 'image/png'}}
      ]);
      console.log(result.response.text());
      setAnswerQ(result.response.text());
    } catch (error) {
      console.log('Error:', error);
      setAnswerQ('Your god want your money');
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
          {/* <Text 
            style={{
              color: "#FFC000"
            }}
          >
            Type your problem, darling.
          </Text> */}
          <input
            style={{
              backgroundColor: "#3A3A3A",
              color: "#FFC000",
              margin: 12,
              padding: 12,
              borderRadius: 15,
              // width: "75wh"
            }}
            onChangeText = {onChangeTextQ}
            value = {textQ}
          />
          <button
            onPress={() => {findAnswer()}}
            title="Ask the Bible"
            color="#FFC000"
            accessibilityLabel="Find the answer to your problem in the Bible."
          />
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

