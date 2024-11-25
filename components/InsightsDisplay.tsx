import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InsightsDisplayProps {
  insight: string;
}

const InsightsDisplay: React.FC<InsightsDisplayProps> = ({ insight }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>AI Insights:</Text>
      <Text style={styles.text}>{insight}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, marginTop: 16 },
  label: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  text: { fontSize: 16, color: '#333' },
});

export default InsightsDisplay;
