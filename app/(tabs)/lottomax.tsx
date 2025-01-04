import {
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
import stylesBox from "@/styles/stylesBox";
import singleStyles from "@/styles/single";
import { getDayAndDate } from "@/utils/dateUtils";

export default function TabTwoScreen() {
  const LOTTO_LOGO = "../../assets/images/lottomax.png";
  const LOTTO_TITLE = "Québec Lotto Max*";
  const LOTTO_ENDPOINT_TEST = Endpoints.test.lotto649;
  const LOTTO_ENDPOINT_PROD = Endpoints.lottomax.prediction;

  const CIRCLE_BG_COLOR: string = Colors.numberBgColor.lottoMax;

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
          .map((line: string) => {
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
      <View style={singleStyles.loader}>
        <ActivityIndicator size="large" color={CIRCLE_BG_COLOR} />
      </View>
    );
  }

  return (
    <View style={singleStyles.container}>
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
          <Text style={singleStyles.title}>{LOTTO_TITLE}</Text>
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
