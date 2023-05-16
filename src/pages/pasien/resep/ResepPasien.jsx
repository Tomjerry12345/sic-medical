import { Box, Stack, Typography } from "@mui/material";
import CardResep from "../../../component/card/CardResep";

const ResepPasien = () => {
  return (
    <Stack>
      <Typography fontSize="26px" marginTop="-12px">
        List Resep
      </Typography>

      <Box mt={3}>
        <CardResep nama="19/07/2023" />
        <CardResep nama="19/07/2023" />
      </Box>
    </Stack>
  );
};

export default ResepPasien;
