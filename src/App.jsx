import { ThemeProvider, createTheme, CssBaseline, Box, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import Map3DComponent from "./components/Map3DComponent";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const Footer = () => (
  <Box
    sx={{
      position: "fixed",
      bottom: 20,
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(5px)",
      borderRadius: "24px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      padding: "8px 16px",
      display: "flex",
      alignItems: "center",
      gap: 1,
    
      ":hover": {
        transition: "transform 0.3s ease, box-shadow 0.3s ease", 
        transform: "translateX(-50%) translateY(-5px)", 
        boxShadow: "0 12px 36px rgba(0, 0, 0, 0.3)",
      },
    }}
  >
    <Typography
      variant="body2"
      sx={{
        fontWeight: 500,
        fontSize: "14px",
        color: theme.palette.text.primary,
        ":hover": {
          color: "green",
        },
      }}
    >
      🌿GreenLens built by Team Nalayak😈  |
    </Typography>
    <IconButton
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        padding: 0,
        marginLeft: "8px",
      }}
    >
      <GitHubIcon
        sx={{
         
          fontSize: "20px",
          color: theme.palette.text.primary,
          "&:hover": {
            color: "green",
          },
        }}
      />
    </IconButton>
  </Box>
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Map3DComponent />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
