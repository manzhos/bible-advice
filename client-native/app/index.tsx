import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Button } from "react-native";

// import { Button, Grid, Paper, Typography } from '@mui/material';

export default function Index() {
  const [textQ, onChangeTextQ] = useState('')
  const [answerQ, setAnswerQ] = useState('')

  useEffect(() => { console.log('Question:', textQ) }, [textQ])
  useEffect(() => { console.log('Answer:', answerQ) }, [answerQ])

  async function findAnswer() {
    console.log('Pray:', textQ)
    const url: string = 'https://bible-advice-2cxjc83ys-manzhos-projects.vercel.app';
    // const url: string = 'https://bible-advice-8cjro9dpz-manzhos-projects.vercel.app/api/advice';

    interface Advice {
      message: string
    }

    interface Body {
      textQ: string
    }
    let body: Body = {
      textQ: textQ
    }

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
        mode:   'no-cors', 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'no-cors',
          'Content-Length': '*',
          'Host': '*'
        },
        body:   JSON.stringify(body), 
      });
      console.log(response);
      const data: Advice = await response.json();
      console.log(data.message);
      setAnswerQ(data.message);
    } catch (error) {
      console.log('Error:', error);
      setAnswerQ('God is busy. Please try to find support later.'); //Your god want your money
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0C0C0C",
      }}
    >
      <TextInput
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
      <Button
        onPress={() => {findAnswer()}}
        title="Ask the Bible"
        color="#FFC000"
        accessibilityLabel="Find the answer to your problem in the Bible."
      />
      {answerQ !== '' &&
        <Text 
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
      </Text>        
      }
    </View>
  );
}
