import { Grid, Typography } from "@mui/material";
import CardUser from "../../../component/card/CardUser";
import KonsultasiDokterLogic from "./KonsultasiDokterLogic";
import { log } from "../../../values/Utilitas";

const KonsultasiDokter = () => {
  const { value, func } = KonsultasiDokterLogic();

  return (
    <div>
      <Typography variant="h4" style={{ marginTop: "-15px" }}>
        Konsultasi
      </Typography>
      <Grid spacing={4} container my={2} display="flex" justifyContent="space-between">
        {value.data.map((item) => (
          <Grid item xs={4}>
            <CardUser
              image={item.image}
              nama={item.nama_lengkap}
              spesialis={item.type}
              onClick={() => func.onMoveToChat(item.email, item.nama_lengkap)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default KonsultasiDokter;
