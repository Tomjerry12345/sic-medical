import { Box, Typography } from "@mui/material";
import CardUser from "../../../component/card/CardUser";

const KonsultasiDokter = () => {
  return (
    <div>
      <Typography variant="h4" style={{ marginTop: "-15px" }}>
        Konsultasi
      </Typography>
      <Box my={6} display="flex" justifyContent="space-between">
        <CardUser nama="Baco" spesialis="dokter" />
        <CardUser nama="bacce" spesialis="gigi" />
        <CardUser nama="test" spesialis="test" />
      </Box>
    </div>
  );
};

export default KonsultasiDokter;
