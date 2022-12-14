import * as React from 'react';
import  * as HTTPClient from '../HTTPClient';

import { Image, Text, View } from 'react-native';
import LoadAnim from '../assets/animations/loading.gif';
import styles from './styles/Styles';

const emotionEmojis = {
  'admiration': '๐ฅฐ',
  'amusement': '๐',
  'anger': '๐คฌ',
  'annoyance': '๐ก',
  'approval': '๐',
  'caring': '๐ค',
  'confusion': '๐',
  'curiosity': '๐ค',
  'desire': '๐ค',
  'disappointment': '๐',
  'disagreement': '๐',
  'disgust': '๐คข',
  'embarrassment': '๐ณ',
  'excitement': '๐คฉ',
  'fear': '๐จ',
  'gratitude': '๐',
  'grief': '๐ข',
  'joy': '๐',
  'love': '๐',
  'nervousness': '๐ฐ',
  'optimism': '๐ฅณ',
  'pride': '๐',
  'realization': '๐คจ',
  'relief': '๐',
  'remorse': '๐',
  'sadness': '๐ญ',
  'surprise': '๐ฎ'
};

export var transcription, summary, emotions;

export default function Loading({ navigation }) {
  async function awaitWebsocketMessage() {
    HTTPClient.ws.onmessage = (event) => {
      const data = event.data;
      transcription = data.split('&&')[0];
      summary = data.split("&&")[1];
      emotions = JSON.parse(data.split("&&")[2]);

      console.log('Successfully received data from websocket');

      var emotions_formatted = [];
      for (var emotion in emotions) {
        if (emotion != 'neutral') {
          emotions_formatted.push({
              emoji: emotionEmojis[emotion],
              emotion: emotion,
              score: emotions[emotion]
          });
        }
      }

      emotions = emotions_formatted;
      console.log('Successfully formatted emotion data');

      navigation.navigate('Results');
    };
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {awaitWebsocketMessage()});
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={LoadAnim} />
      <Text style={styles.label}>Just a moment...</Text>
      <View style={{padding: 120}}></View>
    </View>
  );
}