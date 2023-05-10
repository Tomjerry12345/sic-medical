import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    
  },
});

const rows = [
  { id: 1, name: 'Monkey D Luffy', email: 'monkeydluffy@gmail.com', phone: '085753845575', date: '12-10-2023', gender: 'Laki-laki', type: 'General practioner', message: 'Sakit perut' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-5678', date: '2023-05-09', gender: 'Female' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-9876', date: '2023-05-09', gender: 'Male' },
];

  


const AppointmentPage = () => {
    const classes = useStyles();
    return (
      <>
        <Stack spacing={2} style={{fontFamily: "lato", marginTop: "-39px"}}>
          {/* appointment */}
          <p style={{fontSize: "26px", fontWeight: "400"}}>Appointment</p>
          {/* button */}
          <Button variant='contained' style={{width: "210px", height: "42px", backgroundColor: "#8BD7EF", borderRadius: "8px", fontFamily: "lato", textTransform: "none", fontSize: "18px"}}>Make an appointment</Button>
        </Stack>
        <TableContainer component={Paper} style={{marginTop: "70px"}}>
        <Table className={classes.table} aria-label="simple table" >
          <TableHead style={{backgroundColor: "#8BD7EF", }}>
            <TableRow >
              <TableCell style={{color: "white", fontWeight: "600", fontFamily: "lato", fontSize: "18px"}}>#</TableCell>
              <TableCell style={{color: "white", fontWeight: "600", fontFamily: "lato", fontSize: "18px"}}>Name</TableCell>
              <TableCell style={{color: "white", fontWeight: "600", fontFamily: "lato", fontSize: "18px"}}>Email</TableCell>
              <TableCell style={{color: "white", fontWeight: "600", fontFamily: "lato", fontSize: "18px"}}>Phone</TableCell>
              <TableCell style={{color: "white", fontWeight: "600", fontFamily: "lato", fontSize: "18px"}}>Date</TableCell>
              <TableCell style={{color: "white", fontWeight: "600", fontFamily: "lato", fontSize: "18px"}}>Gender</TableCell>
              <TableCell style={{color: "white", fontWeight: "600", fontFamily: "lato", fontSize: "18px"}}>Type</TableCell>
              <TableCell style={{color: "white", fontWeight: "600", fontFamily: "lato", fontSize: "18px"}}>Message</TableCell>
              <TableCell style={{color: "white", fontWeight: "600", fontFamily: "lato", fontSize: "18px"}}>Action</TableCell>
            </TableRow>
          </TableHead> 
          <TableBody >
            {rows.map((row) => (
              <TableRow key={row.id} >
                <TableCell style={{fontWeight: "600", fontFamily: "lato",}}>{row.id}</TableCell>
                <TableCell component="th" scope="row" style={{fontWeight: "600", fontFamily: "lato"}}>
                  {row.name}
                </TableCell>
                <TableCell style={{fontWeight: "600", fontFamily: "lato"}}>{row.email}</TableCell>
                <TableCell style={{fontWeight: "600", fontFamily: "lato"}}>{row.phone}</TableCell>
                <TableCell style={{fontWeight: "600", fontFamily: "lato"}}>{row.date}</TableCell>
                <TableCell style={{fontWeight: "600", fontFamily: "lato"}}>{row.gender}</TableCell>
                <TableCell style={{fontWeight: "600", fontFamily: "lato"}}>{row.type}</TableCell>
                <TableCell style={{fontWeight: "600", fontFamily: "lato"}}>{row.message}</TableCell>
                <TableCell style={{fontWeight: "600", fontFamily: "lato",}}>{<Button variant="contained"  style={{width: "78px",backgroundColor: "#F5FF83", marginRight: "10px",marginBottom: "5px" , color:'black', fontWeight: "600", fontFamily: "lato", textTransform: "none", fontSize: "18px"}} size='small'>Edit</Button>  }
                {<Button variant="contained" style={{width: "78px",backgroundColor: "#FF8383", color:'black', fontWeight: "600", fontFamily: "lato", textTransform: "none", fontSize: "18px"}} size='small'>Delete</Button>  }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
    );
}
 
export default AppointmentPage;


