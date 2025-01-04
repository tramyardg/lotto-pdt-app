import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Endpoints from "@/constants/Endpoints";
import resultsStyles from "@/styles/results";

export default function ModalScreen() {
  const RESULTS_ENDPOINT = Endpoints.lottomax.result;
  const LOTTO_TITLE = "Lotto Max";

  return (
    <View style={resultsStyles.container}>
      <Text style={resultsStyles.title}>Previous Draw Results</Text>
      <Text style={resultsStyles.title}>{LOTTO_TITLE}</Text>
      <EditScreenInfo resultsEndpoint={RESULTS_ENDPOINT} />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
