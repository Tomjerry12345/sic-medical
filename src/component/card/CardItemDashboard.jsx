import { Stack } from "@mui/material";

const CarditemDashboard = ({ text, icon }) => {
  return (
    <Stack
      sx={{
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        width: {
          sm: "200px",
          md: "200px",
          lg: "300px",
        },
        height: "calc(100vh - 579px)",
      }}
    >
      {icon}
      <h3
        style={{
          textAlign: "center",
          marginTop: "-10px",
          fontFamily: "lato",
          margin: "auto",
        }}
      >
        {text}
      </h3>
    </Stack>
  );
};

export default CarditemDashboard;
