import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AppointmentLogic from "../../pasien/appointment/AppointmentLogic";
import AppointmentLogicDokter from "./AppointmentLogic";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const rows = [
  {
    id: 1,
    name: "Monkey D Luffy",
    email: "monkeydluffy@gmail.com",
    phone: "085753845575",
    date: "12-10-2023",
    gender: "Laki-laki",
    type: "General practioner",
    message: "Sakit perut",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "555-5678",
    date: "2023-05-09",
    gender: "Female",
    type: "General practioner",
    message: "Sakit perut",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "555-9876",
    date: "2023-05-09",
    gender: "Male",
    type: "General practioner",
    message: "Sakit perut",
  },
];

const AppointmentPageDokter = () => {
  const classes = useStyles();
  const {value} = AppointmentLogicDokter();
  return (
    <>
      <Stack spacing={6} style={{ fontFamily: "lato", marginTop: "-12px" }}>
        {/* appointment */}
        <p style={{ fontSize: "26px", fontWeight: "400" }}>Appointment</p>
        {/* button */}
        {/* <Button
          variant="contained"
          style={{
            width: "210px",
            height: "42px",
            backgroundColor: "#8BD7EF",
            borderRadius: "8px",
            fontFamily: "lato",
            textTransform: "none",
            fontSize: "17px",
          }}
        >
          Make an appointment
        </Button> */}
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
                Name
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
                Phone
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  fontWeight: "600",
                  fontFamily: "lato",
                  fontSize: "18px",
                }}
              >
                Date
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
                Type
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  fontWeight: "600",
                  fontFamily: "lato",
                  fontSize: "18px",
                }}
              >
                Message
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
            { value.data && value.data.map((row, i) => (
              <TableRow key={row.id}>
                <TableCell style={{ fontWeight: "600", fontFamily: "lato" }}>
                  {i + 1}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ fontWeight: "600", fontFamily: "lato" }}
                >
                  {row.name_lengkap}
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
                  {row.type_diseases}
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
