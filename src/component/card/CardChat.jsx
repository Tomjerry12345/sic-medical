import { Card, CardContent, Typography } from "@mui/material";

const CardChat = ({ nama, background }) => {
  return (
    <Card
      sx={{
        display: "inline-block",
        maxWidth: 500,
        background,
      }}
      style={{
        boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <CardContent>
        <Typography>{nama}</Typography>
      </CardContent>
    </Card>
  );
};

export default CardChat;
