import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Endpoints from "@/constants/Endpoints";

export default function ModalScreen() {
  const RESULTS_ENDPOINT = Endpoints.western.result;
  const LOTTO_TITLE = "Western 649";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previous Draw Results</Text>
      <Text style={styles.title}>{LOTTO_TITLE}</Text>
      <EditScreenInfo resultsEndpoint={RESULTS_ENDPOINT} />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 0,
    height: 1,
    width: "80%",
  },
});
