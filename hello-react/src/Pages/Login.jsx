import { useNavigate } from "react-router-dom";
import { useApp } from "../ThemedApp";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useApp();
  return (
    <Box>
      <Typography variant="h3">Login</Typography>
      <Alert severity="warning" sx={{ mt: 2 }}>
        All Fields required!
      </Alert>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setAuth(true);
          navigate("/");
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: 2,
          }}
        >
          <TextField placeholder="UserName" fullWidth />
          <TextField type="password" placeholder="Password" fullWidth />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}
