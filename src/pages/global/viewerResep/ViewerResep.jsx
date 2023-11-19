import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Image,
} from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import qr from "assets/qrcode.png";

const TextComponent = ({ title, h, v, s }) => (
  <Text style={{ ...styles.text, width: h, marginTop: v, ...s }}>{title}</Text>
);

const ImageComponent = ({ src, w, h, s }) => (
  <Image src={src} style={{ ...styles.text, width: w, height: h, ...s }} />
);

const Space = ({ v, h }) => <View style={{ height: v, width: h }} />;

const Divider = () => <View style={styles.divider} />;

const MyDocument = ({ data }) => (
  <Document>
    <Page style={styles.body} size="A4">
      <Text style={styles.title}>Klinik Hikmah Farma</Text>
      <Text style={styles.subtitle}>Jl. Andi Mori No. 14-15 Sengkang</Text>
      <Text style={styles.subtitle}>Telp: 0822911009690</Text>
      <Text style={styles.subtitle}>No. Izin: 0004/ IK / DPMPTSP / 2017</Text>

      <View style={{ flexDirection: "row", display: "flex", marginTop: 24 }}>
        <TextComponent title="Tanggal" h="20%" />
        <TextComponent title=":" h="2%" />
        <TextComponent title={data.tanggal_pemeriksaan} h="20%" />
      </View>

      <Space v={20} />

      <View style={{ flexDirection: "row", display: "flex" }}>
        <TextComponent title="Nama Pasien" h="20%" />
        <TextComponent title=":" h="2%" />
        <TextComponent title={data.nama_pasien} h="20%" />
      </View>

      <Space v={6} />

      <View style={{ flexDirection: "row", display: "flex" }}>
        <TextComponent title="Tanggal Lahir" h="20%" />
        <TextComponent title=":" h="2%" />
        <TextComponent title={data.tanggal_lahir} h="20%" />
      </View>

      <Space v={6} />

      <View style={{ flexDirection: "row", display: "flex" }}>
        <TextComponent title="Jenis Kelamin" h="20%" />
        <TextComponent title=":" h="2%" />
        <TextComponent title={data.jenis_kelamin} h="20%" />
      </View>

      <Space v={20} />

      <View style={{ flexDirection: "row", display: "flex" }}>
        <TextComponent title="Obat-obatan" h="20%" s={styles.headerText} />
      </View>

      <Divider />

      <View style={{ flexDirection: "row", display: "flex" }}>
        <TextComponent title="No." h="15%" />
        <TextComponent title="Nama obat" h="30%" />
        <TextComponent title="Jumlah" h="25%" />
        <TextComponent title="Aturan pakai" h="40%" />
      </View>

      <Space v={10} />

      {data.list_obat.map((e, i) => (
        <View key={i} style={{ flexDirection: "row", display: "flex" }}>
          <TextComponent title={i + 1} h="15%" />
          <TextComponent title={e.nama_obat} h="30%" />
          <TextComponent title={e.jumlah} h="25%" />
          <TextComponent title={e.aturan_pakai} h="40%" />
        </View>
      ))}

      <Space v={30} />

      <View style={{ flexDirection: "row", display: "flex" }}>
        <TextComponent
          title="Intruksi tambahan"
          h="15%"
          s={styles.headerText}
        />
        <TextComponent title=":" />
      </View>

      <Space v={10} />

      <View style={{ flexDirection: "row", display: "flex" }}>
        <TextComponent title={data.intruksi_tambahan} />
      </View>

      <Space v={20} />

      <View style={{ flexDirection: "row", display: "flex" }}>
        <TextComponent title="Dokter" h="20%" s={styles.headerText} />
        <TextComponent title=":" h="2%" />
      </View>

      <Space v={20} />

      <View style={{ flexDirection: "row", display: "flex" }}>
        <TextComponent title="Nama" h="20%" />
        <TextComponent title=":" h="2%" />
        <TextComponent title={data.nama_dokter} />
      </View>

      <Space v={14} />

      <View style={{ flexDirection: "row", display: "flex" }}>
        <TextComponent title="Dokter" h="20%" />
        <TextComponent title=":" h="2%" />
        <TextComponent title={data.spesialis} />
      </View>

      <Space v={14} />

      <View style={{ flexDirection: "row", display: "flex" }}>
        <TextComponent title="Tanda tangan" h="20%" v="4px" />
        <TextComponent title=":" h="1%" v="4px" />
        <ImageComponent src={data.tanda_tangan} w="30px" h="20px" />
      </View>

      <Space v={30} />

      <View>
        <ImageComponent src={qr} w="50px" h="50px" />
      </View>
    </Page>
  </Document>
);
const ViewerResep = () => {
  const location = useLocation();

  return (
    <PDFViewer
      style={{ position: "absolute", border: 0, height: "100%", width: "83%" }}
    >
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
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginVertical: 3,
  },
  headerText: {
    fontFamily: "Oswald",
  },
  text: {
    fontSize: 10,
  },
});

export default ViewerResep;
