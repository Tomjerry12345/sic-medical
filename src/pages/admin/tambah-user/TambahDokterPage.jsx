import React from "react";
import { Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Logic from "./Logic";

const TambahDokterPage = () => {
  const { value, func } = Logic();
  return (
    <>
      <Stack spacing={6} style={{ fontFamily: "lato", marginTop: "-12px" }}>
        {/* appointment */}
        <p style={{ fontSize: "26px", fontWeight: "400" }}>Tambah Dokter</p>
      </Stack>
      <Button
        variant="contained"
        style={{
          margin: "18px 0px",
        }}
        onClick={func.onTambahDokter}
      >
        Tambah
      </Button>
      <div style={{ width: "100%" }}>
        {value.rows.length > 0 ? (
          <DataGrid
            rows={value.rows}
            columns={value.columns}
            getRowId={(row) => row?.no}
          />
        ) : null}
      </div>
    </>
  );
};

export default TambahDokterPage;
