import { Card, CardContent, Typography } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const CardResep = ({ nama }) => {
  return (
    <Card
      style={{
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25",
        backgroundColor: "#FAFAFA",
        marginTop: "20px",
      }}
    >
      <CardContent>
        <Typography
          display="flex"
          justifyContent="space-between"
          fontWeight="600"
        >
          {nama}
          <FileDownloadIcon />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardResep;
