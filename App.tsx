import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  let [time, setTime] = useState(new Date())
  let [subject, setSubject] = useState('로딩..')

  const timeTable = [
    [
      '자율', '국어', '컴일', '수학', '급식', '과학', '프C', '프C', '방과후', '방과후', '자습', '자습'
    ], [
      '프C', '프C', '진로', '컴일', '급식', '미술', '미술', '과학', '자습', '자습', '자습', '자습'
    ], [
      '사회', '컴일', '국어', '과학', '급식', '영어', '수학', '체육', 'TOPCIT', 'TOPCIT', '자습', '자습'
    ],[
      '국어', '과학', '프C', '프C', '급식', '수학', '체육', '영어', '전자기초', '전자기초', '전자기초', '전자기초'
    ], [
      '컴일', '영어', '프C', '프C',  '급식', '창체', '창체', '자습', '자습', '자습', '자습'
    ]
  ]

  setInterval(() => {
    const date = new Date()
    setTime(date)

    const startHour = 7
    const index = date.getHours() - startHour
    console.log(`${index}교시`)
    setSubject(timeTable[date.getDay() - 1][index - 1] || '기숙사')
  }, 1000)

  return (
    <View style={styles.container}>
      <Text style={{fontSize:50, marginBottom:30, fontWeight:'bold'}}>다음 과목 : {subject}</Text>
      <table style={{color:'darkgray', fontSize:45, fontWeight:'bold'}}>
        <tr>
          <td style={timePixelHour(1, time)}>한</td>
          <td style={timePixelHour(2, time)}>두</td>
          <td style={timePixelHour(3, time)}>세</td>
          <td style={timePixelHour(4, time)}>네</td>
          <td style={timePixelHour(5, time)}>다</td>
          <td style={timePixelHour(5, time)}>섯</td>
        </tr>
        <tr>
          <td style={timePixelHour(6, time)}>여</td>
          <td style={timePixelHour(6, time)}>섯</td>
          <td style={timePixelHour(7, time)}>일</td>
          <td style={timePixelHour(7, time)}>곱</td>
          <td style={timePixelHour(8, time)}>여</td>
          <td style={timePixelHour(8, time)}>덟</td>
        </tr>
        <tr>
          <td style={timePixelHour(9, time)}>아</td>
          <td style={timePixelHour(9, time)}>홉</td>
          <td style={timePixelHour([10, 11, 12], time)}>열</td>
          <td style={timePixelHour(11, time)}>한</td>
          <td style={timePixelHour(12, time)}>두</td>
          <td style={{color:'black', paddingLeft:7, paddingRight:7}}>시</td>
        </tr>

        <tr>
          <td style={specialTime('자', time)}>자</td>
          <td style={timePixelMinTen(2, time)}>이</td>
          <td style={timePixelMinTen(3, time)}>삼</td>
          <td style={timePixelMinTen(4, time)}>사</td>
          <td style={timePixelMinTen(5, time)}>오</td>
          <td style={timePixelMinTen(10, time)}>십</td>
        </tr>
        <tr>
          <td style={specialTime('정', time)}>정</td>
          <td style={timePixelMin(1, time)}>일</td>
          <td style={timePixelMin(2, time)}>이</td>
          <td style={timePixelMin(3, time)}>삼</td>
          <td style={timePixelMin(4, time)}>사</td>
          <td style={timePixelMin(6, time)}>육</td>
        </tr>
        <tr>
          <td style={specialTime('오', time)}>오</td>
          <td style={timePixelMin(5, time)}>오</td>
          <td style={timePixelMin(7, time)}>칠</td>
          <td style={timePixelMin(8, time)}>팔</td>
          <td style={timePixelMin(9, time)}>구</td>
          <td style={timePixelMinSpecial(time)}>분</td>
        </tr>
      </table>

      <StatusBar style="auto" />
    </View>
  )
}

function timePixelHour (hour: number | number[], time: Date) : React.CSSProperties {
  if(typeof hour == 'number'){
    return {
      color: (time.getHours() % 12 == hour) ? 'black' : 'darkgray',
      paddingLeft:7, paddingRight:7
    }
  }else{
    return {
      color: (hour.includes(time.getHours() % 12)) ? 'black' : 'darkgray', 
      paddingLeft:7, paddingRight:7
    }
  }
}

function specialTime(sp: '자' | '정' | '오', time: Date) : React.CSSProperties {
  if(time.getHours() % 12 == 0){
    if(sp == '정'){
      return {
        color: 'black', 
        paddingLeft:7, paddingRight:7
      }
    }

    // 자정
    if(sp == '자' && time.getHours() == 24){
      return {
        color: 'black', 
        paddingLeft:7, paddingRight:7
      }
    }

    // 정오
    if(sp == '오'  && time.getHours() == 12){
      return {
        color: 'black', 
        paddingLeft:7, paddingRight:7
      }
    }
  }
  return {
    color: 'darkgray', 
    paddingLeft:7, paddingRight:7
  }
}

function timePixelMin (min: number | number[], time: Date) : React.CSSProperties {
  if(typeof min == 'number'){
    return {
      color: (time.getMinutes() == min || time.getMinutes() % 10 == min) ? 'black' : 'darkgray',
      paddingLeft:7, paddingRight:7
    }
  }else{
    return {
      color: (min.includes(time.getMinutes())) ? 'black' : 'darkgray',
      paddingLeft:7, paddingRight:7
    }
  }
}

function timePixelMinSpecial (time: Date) : React.CSSProperties {
    return {
      color: (time.getMinutes() != 0) ? 'black' : 'darkgray',
      paddingLeft:7, paddingRight:7
    }
}

function timePixelMinTen (min: number, time: Date) : React.CSSProperties {
    return {
      color: Math.floor(time.getMinutes() / 10) == min || (time.getMinutes() >= 10 && min == 10) ? 'black' : 'darkgray',
      paddingLeft:7, paddingRight:7
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:'white',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})