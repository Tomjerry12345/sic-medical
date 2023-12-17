import { Grid, Typography } from "@mui/material";
import CardUser from "component/card/CardUser";
import KonsultasiPasienLogic from "./Logic";
import ModalTimePicker from "component/modal/ModalTimePicker";

const KonsultasiPasien = () => {
  const { value, func } = KonsultasiPasienLogic();
  return (
    <div>
      <Typography variant="h4" style={{ marginTop: "-15px" }}>
        Konsultasi Dokter
      </Typography>
      <Grid
        spacing={4}
        container
        my={2}
        display="flex"
        justifyContent="space-between"
      >
        {value.data &&
          value.data.map((item) => (
            <Grid item xs={4}>
              <CardUser
                showOnline
                image={item.image}
                nama={item.nama_dokter}
                spesialis={item.spesialis}
                expireTime={item.expire_time}
                waktuKonsultasiDokter={item.waktu_konsultasi}
                waktuKonsultasiPasien={item.waktu_konsultasi_pasien}
                onClick={() => func.onPickTime(item.waktu_konsultasi, item.email, item.nama_dokter, item.image, item.id_call)}
              />
            </Grid>
          ))}
      </Grid>

      <ModalTimePicker
        open={value.open}
        handleClose={func.handleClose}
        onAccept={func.onChangeTime}
        disabledTime={value.pickDokter.waktu_konsultasi}
        nonDisabledTime={[{
          hour: 13,
          minute: 30
        }]} />
    </div>
  );
};

export default KonsultasiPasien;
