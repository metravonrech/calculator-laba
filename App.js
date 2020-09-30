import React, { useState } from 'react';
import { StatusBar, View, Text, Button, TouchableOpacity } from 'react-native';
import styles from './App.styles';

function App() {
  const operations = ['Del', '+', '-', '*', '/', '='];
  const nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]
  const [resultText, setResultText] = useState('')
  const [calculationText, setCalculationText] = useState('')

  const validate = () => {
    const lastChar = resultText[resultText.length - 1];
    switch (lastChar) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false;
    }
    return true
  }

  const calculate = () => setCalculationText(eval(resultText))

  const buttonPressed = (text) => {
    const lastChar = resultText[resultText.length - 1];
    if (text === '=' ){
      return validate() && calculate()
    }
    setResultText((old) => (old + text))
  }

  const getNumbers = () => {
    let rows = [];

    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity onPress={() => buttonPressed(nums[i][j])} style={styles.btn}>
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        )
      }
      rows.push(
        <View style={styles.row}>
          {row}
        </View>
      )
    }
    return rows
  }

  const operate = (operation) => {
    switch (operation) {
      case 'Del':
        setResultText(old => old.slice(0, -1));
        setCalculationText('')
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = resultText[resultText.length - 1];
        if (resultText === '' || operations.indexOf(lastChar) > 0) return
        setResultText(resultText + operation)
    }
  }


  const getOperations = () => {
    const ops = []
    for (let i = 0; i < 5; i++) {
      ops.push(
        <TouchableOpacity style={styles.btn} onPress={() => operate(operations[i])}>
          <Text style={[styles.btnText, styles.white]}>{operations[i]}</Text>
        </TouchableOpacity>)
    }
    return ops
  }


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#202020'} barStyle={'light-content'}/>
      <View style={styles.result}>
        <Text style={styles.resultText}></Text>
      </View>
      <View style={styles.result}>
        <Text style={styles.resultText}>{resultText}</Text>
      </View>
      <View style={styles.calculation}>
        <Text style={styles.calculationText}>{calculationText}</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.numbers}>
          {getNumbers()}
        </View>
        <View style={styles.operations}>
          {getOperations()}
        </View>
      </View>
    </View>

  );
}

export default App;