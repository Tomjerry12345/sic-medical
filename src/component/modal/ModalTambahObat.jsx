import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { log } from "values/Utilitas";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "370px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalTambahObat = ({ open, handleClose, onSave, onEdit, value }) => {
  const [input, setInput] = useState({
    nama_obat: "",
    jumlah: "",
    aturan_pakai: "",
  });

  useEffect(() => {
    if (value !== null) {
      setInput(value);
    }
  }, [value]);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography
          variant="h6"
          component="h2"
          style={{
            marginBottom: 8,
          }}
        >
          {value === null ? "Tambah Obat" : "Edit Obat"}
        </Typography>

        <Stack spacing={2} style={{}}>
          <TextField
            name="nama_obat"
            label="Nama Obat"
            variant="outlined"
            size="small"
            value={input.nama_obat}
            fullWidth
            onChange={onChange}
          />

          <TextField
            name="jumlah"
            label="Jumlah"
            variant="outlined"
            size="small"
            value={input.jumlah}
            fullWidth
            onChange={onChange}
          />

          <TextField
            multiline
            rows={2}
            name="aturan_pakai"
            label="Aturan Pakai"
            variant="outlined"
            size="small"
            value={input.aturan_pakai}
            fullWidth
            onChange={onChange}
          />
        </Stack>

        <Box display="flex" justifyContent="center">
          <Button
            variant="outlined"
            style={{
              width: "250px",
              borderRadius: "8px",
              borderColor: "green",
              fontFamily: "lato",
              color: "green",
              marginTop: 16,
            }}
            onClick={() => (value === null ? onSave(input) : onEdit(input))}
          >
            {value === null ? "Simpan" : "Edit"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalTambahObat;
