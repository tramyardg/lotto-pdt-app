import { StyleSheet } from "react-native";

const singleStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  disclaimer: {
    fontSize: 6,
    fontStyle: "normal",
    textAlign: "center",
    lineHeight: 8,
    color: "#000000"
  }
});

export default singleStyles;
