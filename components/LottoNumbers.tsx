import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface LottoNumbersProps {
  numbers: number[]; // Array of numbers
  circleBackgroundColor: string; // Color code (e.g., '#FF0000' or 'red')
}

const LottoNumbers: React.FC<LottoNumbersProps> = ({
  numbers,
  circleBackgroundColor,
}) => {
  const dynamicStyles = StyleSheet.create({
    circle: {
      backgroundColor: circleBackgroundColor,
    },
  });
  let circleStyle = {
    ...dynamicStyles.circle,
    ...styles.circle,
  };
  return (
    <View style={styles.container}>
      {numbers.map((number, index) => (
        <View key={index} style={circleStyle}>
          <Text style={styles.number}>{number}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 2,
    marginBottom: 1,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
  },
  number: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default LottoNumbers;
