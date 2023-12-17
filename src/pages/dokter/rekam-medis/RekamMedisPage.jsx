import { Grid, Typography } from "@mui/material";
import CardUser from "component/card/CardUser";
import Logic from "./Logic";

const RekamMedisPage = () => {
  const { value, func } = Logic();

  return (
    <div>
      <Typography variant="h4" style={{ marginTop: "-15px" }}>
        Rekam Medis
      </Typography>

      <Grid
        spacing={4}
        container
        my={2}
        display="flex"
        justifyContent="space-between"
      >
        {value.data.map((item, i) => (
          <Grid key={i} item xs={4}>
            <CardUser
              image={item.image}
              nama={item.nama_lengkap}
              spesialis={item.type}
              onClick={() => func.onMove(item)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RekamMedisPage;
