import * as React from "react";
import { Button, Card, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalComponent = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          color: "white",
          fontWeight: "bold",
          fontSize: "18px",
          fontFamily: "lato",
          fontVariant: "normal",
        }}
      >
        {props.modal}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style} style={{ textAlign: "center" }}>
          <img
            src={props.image}
            alt=""
            width="150"
            height="150"
            style={{ borderRadius: "50%" }}
          />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold" }}
          >
            {props.nama}
          </Typography>
          <Typography id="modal-modal-description">{props.tipe}</Typography>
        </Card>
      </Modal>
    </div>
  );
};

export default ModalComponent;
