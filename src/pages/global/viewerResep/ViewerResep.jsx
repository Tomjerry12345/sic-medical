import { Page, Text, View, Document, StyleSheet, PDFViewer, Font } from "@react-pdf/renderer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { log } from "values/Utilitas";
// import "@react-pdf/dist/esm/Page/AnnotationLayer.css";

const MyDocument = ({ data }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.title}>Apotek Sakinah</Text>
      <Text style={styles.headerText}>Jl.blaaaa</Text>
      <Text style={styles.headerText}>Miguel de Cervantes</Text>
      <View style={{ flexDirection: "row", display: "flex", marginTop: 24 }}>
        <Text
          style={{
            fontSize: 14,
          }}
        >
          Alamat
        </Text>
        <Text
          style={{
            fontSize: 14,
            left: 30,
          }}
        >
          :
        </Text>
        <Text
          style={{
            fontSize: 14,
            left: 36,
          }}
        >
          Jl.blaaaa
        </Text>
      </View>

      <View style={{ flexDirection: "row", display: "flex", marginTop: 10 }}>
        <Text
          style={{
            fontSize: 14,
          }}
        >
          Telepon
        </Text>
        <Text
          style={{
            fontSize: 14,
            left: 24,
          }}
        >
          :
        </Text>
        <Text
          style={{
            fontSize: 14,
            left: 30,
          }}
        >
          xxxxxxx
        </Text>
      </View>
      <View style={styles.divider}></View>
      <View style={{ flexDirection: "column", display: "flex" }}>
        <Text style={{ fontSize: 14 }}>Resep : </Text>
        <Text style={styles.text}>{data.resep}</Text>
        {/* <Text style={styles.text}>- Miguel de Cervantes</Text> */}
      </View>
    </Page>
  </Document>
);
const ViewerResep = () => {
  const location = useLocation();

  useEffect(() => {
    const state = location.state;
    log({ state });
  }, []);

  return (
    <PDFViewer style={{ position: "absolute", border: 0, height: "100%", width: "83%" }}>
      <MyDocument data={location.state} />
    </PDFViewer>
  );
};

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  divider: {
    backgroundColor: "black",
    height: 1,
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  headerText: {
    fontSize: 12,
    textAlign: "center",
    marginVertical: 3,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 14,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
});

export default ViewerResep;
