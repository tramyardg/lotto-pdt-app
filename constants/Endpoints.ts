// prediction649.csv
// predictionmax.csv

// predictionontario649.csv
// predictionquebec649.csv
// predictionquebecmax.csv
// predictionwestern649.csv

// result649.csv
// resultmax.csv

// resultontario649.csv
// resultquebec649.csv
// resultquebecmax.csv
// resultwestern649.csv

const base_url = "https://ayogrup.com/csv/";
// Lotto predictions endpoints
export default {
  test: {
    lottomax: base_url + "predictionmax.csv",
    lotto649: base_url + "prediction649.csv"
  },
  result: {
    lottomax: base_url + "resultmax.csv",
    lotto649: base_url + "result649.csv"
  },
  lotto649: {
    result: base_url + "resultquebec649.csv",
    prediction: base_url + "predictionquebec649.csv",
  },
  lottomax: {
    result: base_url + "resultquebecmax.csv",
    prediction: base_url + "predictionquebecmax.csv"
  },
  western: {
    result: base_url + "resultwestern649.csv",
    prediction: base_url + "predictionwestern649.csv"
  },
  ontario49: {
    result: base_url + "resultontario649.csv",
    prediction: base_url + "predictionontario649.csv",
  }
};
