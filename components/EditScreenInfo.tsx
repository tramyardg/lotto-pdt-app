import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import axios from "axios";
import { getDayAndDate } from "@/utils/dateUtils";


interface LottoResult {
  drawdate: string;
  drawresult: string;
  bonusnumber: string;
  prediction: string;
  prize: string;
}

export default function EditScreenInfo({
  resultsEndpoint,
}: {
  resultsEndpoint: string;
}) {
  const [results, setResults] = useState<LottoResult[]>([]);
  const [drawDate, setDrawDate] = useState<[string, string]>(["", ""]);
  

  const parseLottoResults = (csv: string) => {
    const rows = csv.split("\n");
    const data = rows.slice(1).map((row) => {
      const columns = row.split(",");
      return {
        drawdate: columns[0].trim(),
        drawresult: columns[1].trim(),
        bonusnumber: columns[2].trim(),
        prediction: columns[3].trim(),
        prize: columns[4].trim(),
      };
    });
    return data;
  };

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await axios.get(resultsEndpoint);

        const csvData = response.data;
        const results = parseLottoResults(csvData);
        setResults(results);
        
        const parsedDate = new Date(results[0].drawdate);
        if (isNaN(Number(parsedDate))) {
          // console.error("Invalid date format:", parsedDate);
        } else {
          setDrawDate(getDayAndDate(String(parsedDate)));
        }
        // console.log(results);
      } catch (err) {
      } finally {
      }
    };

    fetchCSV();
  }, []);

  return (
    <>
      <View style={[resultsStyles.row, {marginBottom: 0}]}>
        <Text style={{fontSize: 10, width: '100%', textAlign: 'center', marginBottom: 25}}>{drawDate[0]}</Text>
      </View>
      <View style={resultsStyles.row}>
        <Text style={resultsStyles.header}>Draw Result</Text>
        <Text style={resultsStyles.header}>Bonus Number</Text>
        <Text style={resultsStyles.header}>Prediction</Text>
        <Text style={resultsStyles.header}>Prize</Text>
      </View>
      {results.map((result, index) => (
        <View key={index} style={resultsStyles.row}>
          <Text style={resultsStyles.cell}>{result.drawresult}</Text>
          <Text style={resultsStyles.cell}>{result.bonusnumber}</Text>
          <Text style={resultsStyles.cell}>{result.prediction}</Text>
          <Text style={resultsStyles.cell}>{result.prize}</Text>
        </View>
      ))}
      <View style={{marginTop: 25}}>
        <Text style={{fontSize: 8}}>Notice:</Text>
        <Text style={{fontSize: 8}}>*This tool helps you check if your numbers may match a winning selection. However, it may contain errors or discrepancies. Please consult Loto-Québec's official winning list to confirm your results.</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});

const resultsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  header: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    fontSize: 12
  },
  cell: {
    flex: 1,
    textAlign: "center",
    padding: 5,
    fontSize: 10,
  },
});
