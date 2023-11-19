import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import Logic from "./Logic";
import { LoadingButton } from "@mui/lab";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const AddDokterPage = () => {
  const { value, func } = Logic();
  return (
    <Stack spacing={4} direction="column" alignItems="center">
      <Typography
        style={{
          fontFamily: "lato",
          fontWeight: "bold",
          fontSize: 24,
        }}
      >
        Tambah Dokter
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack
          mb={2}
          mt={4}
          style={{
            alignItems: "center",
            borderRadius: "30%",
          }}
        >
          {value.img.previewImage == null ? (
            <img
              width="110"
              height="110"
              style={{
                position: "relative",
                marginBottom: "14px",
                zIndex: 0,
                background: "grey",
                borderRadius: "150px",
              }}
              alt=""
            />
          ) : (
            <img
              src={value.img.previewImage}
              width="110"
              height="110"
              style={{
                // position: "relative",
                marginBottom: "14px",
                borderRadius: "50%",
                zIndex: 0,
              }}
              alt=""
            />
          )}

          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            style={{
              background: "#8BD7EF",
              marginTop: "-39px",
              marginLeft: "77px",
              fontSize: "20px",
              padding: "10px",
              borderRadius: "5px",
              color: "white",
            }}
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={func.onGetImage}
            />
            <AddAPhotoOutlinedIcon />
          </IconButton>
        </Stack>

        <TextField
          name="nama_dokter"
          onChange={func.onChange}
          size="small"
          label="Nama Dokter"
          value={value.input.nama_dokter}
          variant="outlined"
          sx={{
            width: 400,
            marginBottom: "16px",
          }}
        />

        <TextField
          name="spesialis"
          onChange={func.onChange}
          size="small"
          value={value.input.spesialis}
          label="Dokter"
          variant="outlined"
          sx={{
            width: 400,
            marginBottom: "16px",
          }}
        />

        <TextField
          name="email"
          onChange={func.onChange}
          size="small"
          label="Email"
          variant="outlined"
          value={value.input.email}
          sx={{
            width: 400,
            marginBottom: "16px",
          }}
        />

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={value.showPassword ? "text" : "password"}
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={func.handleClickShowPassword}
                  edge="end"
                >
                  {value.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            onChange={func.onChange}
          />
        </FormControl>
      </Box>

      <LoadingButton
        variant="contained"
        loading={value.loading}
        loadingPosition="end"
        style={{
          backgroundColor: "#8BD7EF",
          borderRadius: "8px",
          fontFamily: "lato",
          textTransform: "none",
        }}
        onClick={func.onMake}
      >
        Tambah
      </LoadingButton>
    </Stack>
  );
};

export default AddDokterPage;
