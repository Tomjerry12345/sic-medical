import { Box, Grid, Typography } from "@mui/material";
import CardUser from "../../../component/card/CardUser";
import KonsultasiPasienLogic from "./KonsultasiPasienLogic";

const KonsultasiPasien = () => {
  const { value, func } = KonsultasiPasienLogic();
  return (
    <div>
      <Typography variant="h4" style={{ marginTop: "-15px" }}>
        Konsultasi
      </Typography>
      <Grid spacing={4} container my={2} display="flex" justifyContent="space-between">
        {value.data &&
          value.data.map((item) => (
            <Grid item xs={4}>
              <CardUser
                image={item.image}
                nama={item.nama_dokter}
                spesialis={item.spesialis}
                expireTime={item.expire_time}
                onClick={() => func.onMoveToChat(item.email, item.nama_dokter)}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default KonsultasiPasien;
