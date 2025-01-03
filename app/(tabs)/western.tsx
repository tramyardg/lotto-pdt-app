import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";

import { Text, View } from "@/components/Themed";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Colors from "@/constants/Colors";
import Endpoints from "@/constants/Endpoints";
import LottoNumbers from "@/components/LottoNumbers";
import { getDayAndDate } from "@/utils/dateUtils";

export default function TabThreeScreen() {
  const LOTTO_LOGO = "../../assets/images/logo_w649.webp";
  const LOTTO_TITLE = "Western 649*";
  const LOTTO_ENDPOINT_TEST = Endpoints.test.lotto649;
  const LOTTO_ENDPOINT_PROD = Endpoints.lottomax.prediction;

  const CIRCLE_BG_COLOR: string = Colors.numberBgColor.lottoWestern649;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLotto, setSelectedLotto] = useState(null);
  const [drawDate, setDrawDate] = useState<[string, string]>(["", ""]);

  const selectRandomLotto = () => {
    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setSelectedLotto(data[randomIndex]);
    }
  };

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await axios.get(LOTTO_ENDPOINT_PROD);
        const parsedData = response.data
          .trim()
          .split("\n")
          .map((line) => {
            const [date, set1, set2, set3] = line.split(",");
            return {
              date,
              sets: [set1.split(" "), set2.split(" "), set3.split(" ")],
            };
          });

        const _drawDate = parsedData[0]["date"];
        const parsedDate = new Date(_drawDate);
        if (isNaN(Number(parsedDate))) {
          // console.error("Invalid date format:", _drawDate);
        } else {
          setDrawDate(getDayAndDate(String(parsedDate)));
        }

        setData(parsedData);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchCSV();
  }, []);

  useEffect(() => {
    if (!loading && data.length > 0) {
      selectRandomLotto();
    }
  }, [loading, data]);

  if (loading) {
    return (
      <View style={csvStyles.loader}>
        <ActivityIndicator size="large" color={CIRCLE_BG_COLOR} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={stylesBox.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 10,
          }}
        >
          {/* <Image source={require(LOTTO_LOGO)} /> */}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.title}>{LOTTO_TITLE}</Text>
          <TouchableOpacity onPress={selectRandomLotto}>
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/images/reload.png")}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <Text>{drawDate[0]}</Text>
          <Text style={{ fontWeight: "bold", marginLeft: "auto" }}>
            {drawDate[1]}
          </Text>
        </View>

        {selectedLotto &&
          selectedLotto.sets.map((numbers: [], index: number) => (
            <LottoNumbers
              key={index}
              numbers={numbers}
              circleBackgroundColor={CIRCLE_BG_COLOR}
            />
          ))}
      </View>
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text
          style={{
            fontSize: 6,
            fontStyle: "normal",
            textAlign: "center",
            lineHeight: 8,
          }}
        >
          *Disclaimer: The predictions displayed here are based on patterns
          identified from previous winning numbers. These predictions do not
          guarantee a win and should be viewed as statistical forecasts rather
          than certainties. Results may vary, and there is no assurance that
          following these predictions will result in success.
        </Text>
      </View>
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

const stylesBox = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000", // Shadow color (iOS)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (iOS)
    shadowOpacity: 0.25, // Shadow opacity (iOS)
    shadowRadius: 4, // Shadow radius (iOS)
    elevation: 5, // Shadow (Android)
    borderWidth: 1,
    borderColor: "#ddd", // Border color
  },
});

const csvStyles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
