import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Logic from "./Logic";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const AppointmentPageDokter = () => {
  const classes = useStyles();
  const { value } = Logic();
  return (
    <>
      <Stack spacing={6} style={{ fontFamily: "lato", marginTop: "-12px" }}>
        {/* appointment */}
        <p style={{ fontSize: "26px", fontWeight: "400" }}>Appointment</p>
      </Stack>
      <TableContainer component={Paper} style={{ marginTop: "50px" }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#8BD7EF" }}>
            <TableRow>
              <TableCell
                style={{
                  color: "white",
                  fontWeight: "600",
                  fontFamily: "lato",
                  fontSize: "18px",
                }}
              >
                #
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  fontWeight: "600",
                  fontFamily: "lato",
                  fontSize: "18px",
                }}
              >
                Nama
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  fontWeight: "600",
                  fontFamily: "lato",
                  fontSize: "18px",
                }}
              >
                Email
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  fontWeight: "600",
                  fontFamily: "lato",
                  fontSize: "18px",
                }}
              >
                Telpon
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  fontWeight: "600",
                  fontFamily: "lato",
                  fontSize: "18px",
                }}
              >
                Tanggal Perjanjian
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  fontWeight: "600",
                  fontFamily: "lato",
                  fontSize: "18px",
                }}
              >
                Gender
              </TableCell>

              <TableCell
                style={{
                  color: "white",
                  fontWeight: "600",
                  fontFamily: "lato",
                  fontSize: "18px",
                }}
              >
                Keluhan
              </TableCell>
              {/* <TableCell
                style={{
                  color: "white",
                  fontWeight: "600",
                  fontFamily: "lato",
                  fontSize: "18px",
                }}
              >
                Action
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {value.data &&
              value.data.map((row, i) => (
                <TableRow key={row.id}>
                  <TableCell style={{ fontWeight: "600", fontFamily: "lato" }}>
                    {i + 1}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ fontWeight: "600", fontFamily: "lato" }}
                  >
                    {row.nama_lengkap}
                  </TableCell>
                  <TableCell style={{ fontWeight: "600", fontFamily: "lato" }}>
                    {row.email}
                  </TableCell>
                  <TableCell style={{ fontWeight: "600", fontFamily: "lato" }}>
                    {row.no_hp}
                  </TableCell>
                  <TableCell style={{ fontWeight: "600", fontFamily: "lato" }}>
                    {row.date}
                  </TableCell>
                  <TableCell style={{ fontWeight: "600", fontFamily: "lato" }}>
                    {row.gender}
                  </TableCell>
                  <TableCell style={{ fontWeight: "600", fontFamily: "lato" }}>
                    {row.message}
                  </TableCell>
                  {/* <TableCell style={{ fontWeight: "600", fontFamily: "lato" }}>
                  {
                    <Button
                      variant="contained"
                      style={{
                        width: "78px",
                        backgroundColor: "#F5FF83",
                        marginRight: "10px",
                        marginBottom: "5px",
                        color: "black",
                        fontWeight: "600",
                        fontFamily: "lato",
                        textTransform: "none",
                        fontSize: "18px",
                      }}
                      size="small"
                    >
                      Edit
                    </Button>
                  }
                  {
                    <Button
                      variant="contained"
                      style={{
                        width: "78px",
                        backgroundColor: "#FF8383",
                        color: "black",
                        fontWeight: "600",
                        fontFamily: "lato",
                        textTransform: "none",
                        fontSize: "18px",
                      }}
                      size="small"
                    >
                      Delete
                    </Button>
                  }
                </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AppointmentPageDokter;
