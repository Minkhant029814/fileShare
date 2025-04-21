import { Box, Container, Snackbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useApp } from "./ThemedApp";
import Header from "./components/Header";
import AppDrawer from "./components/AppDrawer";

export default function Template() {
  const { globalMsg, setGlobalMsg } = useApp();
  return (
    <Box>
      <Header />
      <AppDrawer />

      <Container maxwidth="sm" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
      <Snackbar
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        open={Boolean(globalMsg)}
        autoHideDuration={6000}
        onClose={() => setGlobalMsg(null)}
        message={globalMsg}
      />
    </Box>
  );
}
