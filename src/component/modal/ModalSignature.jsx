import { Box, Button, Modal, Typography } from "@mui/material";
import ReactSignatureCanvas from "react-signature-canvas";

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

const ModalSignature = ({ open, handleClose, sigCanvas, saveSignature }) => {
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
          Tanda Tangan
        </Typography>
        <Box backgroundColor="aliceblue">
          <ReactSignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{ height: 150, className: "sigCanvas" }}
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            variant="outlined"
            style={{
              width: "250px",
              borderRadius: "8px",
              borderColor: "green",
              fontFamily: "lato",
              color: "green",
              marginTop: 8,
            }}
            onClick={saveSignature}
          >
            Simpan
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalSignature;
