import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface MoodHistory {
  moodValue: number;
  moodDescription: string;
  aiResponse: string;
}

const MoodTracker: React.FC = () => {
  const [moodValue, setMoodValue] = useState<number>(3);
  const [moodDescription, setMoodDescription] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<MoodHistory[]>([]);

  // Initialize the Google Gemini API
  const genAI = new GoogleGenerativeAI('AIzaSyARYgcY-n6AHSl0KtTNRshYMEaMeLEvMlU');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro-001' });

  const handleGenerateInsight = async () => {
    if (!moodDescription.trim()) {
      alert('Please enter a mood description!');
      return;
    }

    setLoading(true);

    try {
      const prompt = `Act as a compassionate mental health expert. A user reported their daily mood:
      Mood Rating: ${moodValue}/5
      Mood Description: ${moodDescription}.
      Provide actionable insights to help improve their well-being and suggest positive changes. in short`;

      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();

      setAiResponse(responseText);
      setHistory([
        ...history,
        { moodValue, moodDescription, aiResponse: responseText },
      ]);

      setMoodDescription('');
    } catch (error) {
      console.error('Error generating AI insights:', error);
      setAiResponse('Unable to fetch insights. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mood Tracker</Text>

      {/* Mood Rating */}
      <Text style={styles.label}>Rate Your Mood (1-5): {moodValue}</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={moodValue}
        onValueChange={setMoodValue}
        minimumTrackTintColor="#1FB28A"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1FB28A"
      />

      {/* Mood Description */}
      <TextInput
        style={styles.input}
        placeholder="Describe your mood..."
        value={moodDescription}
        onChangeText={setMoodDescription}
        multiline
      />

      {/* Generate Insights Button */}
      <Button
        title="Generate AI Insight"
        onPress={handleGenerateInsight}
        color="#1FB28A"
      />

      {loading && <ActivityIndicator size="large" color="#1FB28A" />}

      {/* Display AI Insights */}
      {aiResponse ? (
        <View style={styles.responseContainer}>
          <Text style={styles.responseTitle}>AI Insight:</Text>
          <Text style={styles.responseText}>{aiResponse}</Text>
        </View>
      ) : null}

      {/* History of Mood Entries */}
      <FlatList
        data={history}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>
              Mood: {item.moodValue}/5 | {item.moodDescription}
            </Text>
            <Text style={styles.historyText}>Insight: {item.aiResponse}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  input: {
    height: 100,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  responseContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0f7e9',
    borderRadius: 5,
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  responseText: {
    fontSize: 16,
  },
  historyItem: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  historyText: {
    fontSize: 16,
  },
});

export default MoodTracker;
