import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import GavelIcon from "@mui/icons-material/Gavel";

import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const quickLinks = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Acts",
      path: "/acts",
    },
    {
      label: "Search",
      path: "/search",
    },
    {
      label: "Statistics",
      path: "/statistics",
    },
    {
      label: "About",
      path: "/about",
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#102F48",
        color: "#FFFFFF",
        mt: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={5}
          sx={{
            py: 6,
          }}
        >
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <GavelIcon />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  letterSpacing: 1,
                }}
              >
                KANUN
              </Typography>
            </Box>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.8,
                maxWidth: 500,
              }}
            >
              A legal information and crime-section reference
              platform designed to make legal information easier
              to discover and understand.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Quick Links
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {quickLinks.map((item) => (
                <Typography
                  key={item.path}
                  component="button"
                  onClick={() =>
                    navigate(item.path)
                  }
                  sx={{
                    border: 0,
                    background: "transparent",
                    padding: 0,
                    margin: 0,
                    textAlign: "left",
                    color:
                      "rgba(255,255,255,0.7)",
                    cursor: "pointer",
                    font: "inherit",
                    width: "fit-content",
                    transition:
                      "color 0.2s ease",
                    "&:hover": {
                      color: "#D6B878",
                    },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Important Notice
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.7,
              }}
            >
              KANUN is intended as an informational reference
              platform. Legal information should always be
              verified against official legislation and applicable
              government sources.
            </Typography>
          </Grid>
        </Grid>

        <Divider
          sx={{
            borderColor:
              "rgba(255,255,255,0.15)",
          }}
        />

        <Box
          sx={{
            py: 2.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color:
                "rgba(255,255,255,0.55)",
            }}
          >
            © {new Date().getFullYear()} KANUN
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color:
                "rgba(255,255,255,0.55)",
            }}
          >
            Legal Information & Reference Portal
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;