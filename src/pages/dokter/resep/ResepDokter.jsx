import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Logic from "./Logic";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ModalSignature from "component/modal/ModalSignature";
import ModalTambahObat from "component/modal/ModalTambahObat";
import { DataGrid } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";

const ResepDokter = () => {
  const { value, func } = Logic();
  return (
    <>
      <Stack spacing={4}>
        <Typography
          style={{
            fontFamily: "lato",
            fontSize: "28px",
            lineHeight: "43.2px",
            marginTop: "-14px",
          }}
        >
          Resep Pasien
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            // defaultValue={dayjs(value.currentDate)}
            label="Tanggal Pemeriksaan"
            onChange={(e) => func.onChangeDate(e, "tanggal_pemeriksaan")}
          />
        </LocalizationProvider>

        <TextField
          name="nama_pasien"
          label="Nama Pasien"
          disabled
          value={value.input.nama_pasien}
          onChange={func.onChange}
        />

        <TextField
          name="tanggal_lahir"
          label="Tanggal Lahir"
          disabled
          value={value.input.tanggal_lahir}
          onChange={func.onChange}
        />

        <TextField
          name="jenis_kelamin"
          label="Jenis Kelamin"
          disabled
          value={value.input.jenis_kelamin}
          onChange={func.onChange}
        />

        <TextField
          name="intruksi_tambahan"
          label="Intruksi Tambahan"
          multiline
          rows={3}
          onChange={func.onChange}
        />

        {value.rows.length > 0 ? (
          <div style={{ maxHeight: 400, width: "100%" }}>
            <DataGrid
              disableColumnMenu
              rows={value.rows}
              columns={value.columns}
              getRowId={(row) => row?.no}
            />
          </div>
        ) : null}

        <Box display="flex" justifyContent="center">
          <Button
            variant="outlined"
            style={{
              width: "250px",
              borderRadius: "8px",
              fontFamily: "lato",
            }}
            onClick={func.onOpenTambahObat}
          >
            Tambah Obat
          </Button>
        </Box>

        {value.input.tanda_tangan !== null ? (
          <Box display="flex" justifyContent="center">
            <Box
              style={{
                background: "aliceblue",
              }}
            >
              <img
                height="200"
                width="300"
                src={value.input.tanda_tangan}
                alt=""
              />
            </Box>
          </Box>
        ) : null}

        <Box display="flex" justifyContent="center">
          <Button
            variant="outlined"
            style={{
              width: "250px",
              borderRadius: "8px",
              borderColor: "green",
              fontFamily: "lato",
              color: "green",
            }}
            onClick={func.onOpenSignature}
          >
            Tanda tangan
          </Button>
        </Box>

        <Stack style={{ margin: "30px auto" }}>
          <LoadingButton
            variant="contained"
            loadingPosition="end"
            loading={value.loading}
            style={{
              width: "250px",
              backgroundColor: "#8BD7EF",
              borderRadius: "8px",
              fontFamily: "lato",
            }}
            onClick={func.sendRecipe}
          >
            Kirim Resep
          </LoadingButton>
        </Stack>
      </Stack>

      <ModalSignature
        open={value.openSignature}
        handleClose={func.onCloseSignature}
        sigCanvas={value.sigCanvas}
        saveSignature={func.saveSignature}
      />

      <ModalTambahObat
        open={value.openTambahObat}
        handleClose={func.onCloseTambahObat}
        onSave={func.onTambahObat}
        onEdit={func.onEditObat}
        value={value.objObat}
      />
    </>
  );
};

export default ResepDokter;
