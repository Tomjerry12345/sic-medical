import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const CardUser = ({ image, nama, spesialis, expireTime, onClick, showOnline = false }) => {
  return (
    <Card
      sx={{ maxWidth: 345 }}
      style={{
        boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
        width: "300px",
      }}
      onClick={onClick}
    >
      <CardActionArea>
        {/* image */}
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt=""
          style={{
            width: "140px",
            borderRadius: "50%",
            margin: "auto",
            marginTop: "20px",
            background: image === "" ? "#000" : "#fff",
          }}
        />
        <CardContent style={{ textAlign: "center" }}>
          <Typography gutterBottom variant="h5" fontWeight="600" component="div">
            {nama}
          </Typography>
          <Typography variant="body2" fontSize="24px" color="text.secondary">
            {spesialis}
          </Typography>
          {showOnline ? (
            expireTime < Date.now() ? (
              <Typography variant="body2" fontSize="24px" color="text.secondary">
                offline
              </Typography>
            ) : (
              <Typography variant="body2" fontSize="24px" color="text.secondary">
                online
              </Typography>
            )
          ) : null}
          {/* {expireTime < Date.now() ? (
            <Typography variant="body2" fontSize="24px" color="text.secondary">
              offline
            </Typography>
          ) : (
            <Typography variant="body2" fontSize="24px" color="text.secondary">
              online
            </Typography>
          )} */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardUser;
