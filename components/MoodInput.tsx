import React, { useState } from 'react';
import  Slider  from '@react-native-community/slider';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

interface MoodInputProps {
  onSubmit: (mood: number, description: string) => void;
}

const MoodInput: React.FC<MoodInputProps> = ({ onSubmit }) => {
  const [mood, setMood] = useState(3);
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (description.trim() === '') {
      alert('Please enter a mood description.');
      return;
    }
    onSubmit(mood, description);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Mood (1 to 5): {mood}</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={mood}
        onValueChange={(value) => setMood(value)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Describe your mood..."
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontSize: 16, marginBottom: 8 },
  slider: { width: '100%', height: 40 },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default MoodInput;
