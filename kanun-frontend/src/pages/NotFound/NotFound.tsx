import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";

import ErrorIcon from "@mui/icons-material/Error";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <Container
        maxWidth="lg"
        sx={{
          minHeight: "65vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          <ErrorIcon
            sx={{
              fontSize: 90,
              color: "#B08D57",
              mb: 2,
            }}
          />

          <Typography
            variant="h1"
            sx={{
              color: "#123B5D",
              fontWeight: 900,
              fontSize: {
                xs: "4rem",
                md: "6rem",
              },
              lineHeight: 1,
            }}
          >
            404
          </Typography>

          <Typography
            variant="h4"
            sx={{
              color: "#123B5D",
              fontWeight: 800,
              mt: 2,
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1.5,
              lineHeight: 1.8,
            }}
          >
            The page you are looking for does not
            exist or may have been moved.
          </Typography>

          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              mt: 4,
              backgroundColor: "#123B5D",
              fontWeight: 700,
              px: 3,
              py: 1.3,
              "&:hover": {
                backgroundColor: "#0D2D45",
              },
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default NotFound;