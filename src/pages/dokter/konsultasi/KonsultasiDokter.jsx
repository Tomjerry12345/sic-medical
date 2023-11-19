import { Grid, Typography } from "@mui/material";
import CardUser from "../../../component/card/CardUser";
import Logic from "./Logic";
import { log } from "../../../values/Utilitas";

const KonsultasiDokter = () => {
  const { value, func } = Logic();

  return (
    <div>
      <Typography variant="h4" style={{ marginTop: "-15px" }}>
        Konsultasi Pasien
      </Typography>
      <Grid
        spacing={4}
        container
        my={2}
        display="flex"
        justifyContent="space-between"
      >
        {value.data.map((item) => (
          <Grid item xs={4}>
            <CardUser
              image={item.image}
              nama={item.nama_lengkap}
              spesialis={item.type}
              online={item.online}
              onClick={() => func.onMoveToChat(item)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default KonsultasiDokter;
