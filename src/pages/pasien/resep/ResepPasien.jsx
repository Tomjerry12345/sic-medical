import { Box, Stack, Typography } from "@mui/material";
import CardResep from "../../../component/card/CardResep";
import Logic from "./Logic";
import { log } from "values/Utilitas";

const ResepPasien = () => {
  const { value, func } = Logic();
  return (
    <Stack>
      <Typography fontSize="26px" marginTop="-12px">
        List Resep
      </Typography>

      <Box mt={3}>
        {value.data &&
          value.data.map((v, i) => {
            const output = new Date(v.timestamp.seconds * 1000);
            const date = `${output.getDate()}/${output.getMonth()}/${output.getFullYear()}`;
            return <CardResep key={i} nama={date} onPreview={() => func.previewResep(v)} />;
          })}
      </Box>
    </Stack>
  );
};

export default ResepPasien;
