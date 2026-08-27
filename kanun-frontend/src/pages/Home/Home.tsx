import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import GavelIcon from "@mui/icons-material/Gavel";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import {
  getStatistics,
  type Statistics,
} from "../../api/statisticsApi";

const Home = () => {
  const navigate = useNavigate();

  const [statistics, setStatistics] =
    useState<Statistics | null>(null);

  const [statisticsLoading, setStatisticsLoading] =
    useState(true);

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const data = await getStatistics();

        setStatistics(data);
      } catch (error) {
        console.error(
          "Unable to load statistics",
          error
        );
      } finally {
        setStatisticsLoading(false);
      }
    };

    loadStatistics();
  }, []);

  const features = [
    {
      icon: <GavelIcon />,
      title: "Search Offences",
      description:
        "Find relevant legal offences and discover the sections associated with them.",
      path: "/search",
    },
    {
      icon: <MenuBookIcon />,
      title: "Browse Acts",
      description:
        "Explore Acts and browse their associated legal sections.",
      path: "/acts",
    },
    {
      icon: <AccountBalanceIcon />,
      title: "Understand the Law",
      description:
        "View punishment, classification, bailability, cognizability and court information.",
      path: "/search",
    },
  ];

  return (
    <>
      <Navbar />

      <Box
        sx={{
          background:
            "linear-gradient(135deg, #123B5D 0%, #0D2D45 100%)",
          color: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 450,
            height: 450,
            borderRadius: "50%",
            backgroundColor:
              "rgba(214,184,120,0.08)",
            top: -220,
            right: -120,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            backgroundColor:
              "rgba(255,255,255,0.03)",
            bottom: -160,
            left: -100,
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            py: {
              xs: 8,
              md: 12,
            },
          }}
        >
          <Box
            sx={{
              maxWidth: 850,
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "#D6B878",
                fontWeight: 800,
                letterSpacing: 2.5,
              }}
            >
              INDIAN LAW & LEGAL REFERENCE
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                fontSize: {
                  xs: "2.8rem",
                  sm: "3.8rem",
                  md: "5rem",
                },
                lineHeight: 1.05,
                mt: 1,
                mb: 3,
              }}
            >
              Understand the Law.
              <br />
              Find the Right Section.
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                color:
                  "rgba(255,255,255,0.76)",
                maxWidth: 700,
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              KANUN is a legal reference portal
              designed to help users discover
              offences, relevant sections, Acts,
              punishments and legal classifications
              in one place.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<SearchIcon />}
                onClick={() =>
                  navigate("/search")
                }
                sx={{
                  backgroundColor: "#D6B878",
                  color: "#123B5D",
                  px: 3,
                  py: 1.5,
                  fontWeight: 800,
                  "&:hover": {
                    backgroundColor: "#C5A75D",
                  },
                }}
              >
                Search the Law
              </Button>

              <Button
                variant="outlined"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() =>
                  navigate("/acts")
                }
                sx={{
                  color: "#FFFFFF",
                  borderColor:
                    "rgba(255,255,255,0.4)",
                  px: 3,
                  py: 1.5,
                  fontWeight: 700,
                  "&:hover": {
                    borderColor: "#FFFFFF",
                    backgroundColor:
                      "rgba(255,255,255,0.06)",
                  },
                }}
              >
                Browse Acts
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderBottom:
            "1px solid #E5E9ED",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: 4,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(3, 1fr)",
              },
              gap: 2,
            }}
          >
            <Card
              sx={{
                border:
                  "1px solid #E1E6EB",
                boxShadow: "none",
                textAlign: "center",
              }}
            >
              <CardContent sx={{ py: 3 }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: "#123B5D",
                    fontWeight: 900,
                  }}
                >
                  {statisticsLoading
                    ? "—"
                    : statistics?.acts ?? 0}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    fontWeight: 600,
                    mt: 0.5,
                  }}
                >
                  Acts
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                border:
                  "1px solid #E1E6EB",
                boxShadow: "none",
                textAlign: "center",
              }}
            >
              <CardContent sx={{ py: 3 }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: "#123B5D",
                    fontWeight: 900,
                  }}
                >
                  {statisticsLoading
                    ? "—"
                    : statistics?.sections ?? 0}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    fontWeight: 600,
                    mt: 0.5,
                  }}
                >
                  Sections
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                border:
                  "1px solid #E1E6EB",
                boxShadow: "none",
                textAlign: "center",
              }}
            >
              <CardContent sx={{ py: 3 }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: "#123B5D",
                    fontWeight: 900,
                  }}
                >
                  {statisticsLoading
                    ? "—"
                    : statistics?.offences ?? 0}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    fontWeight: 600,
                    mt: 0.5,
                  }}
                >
                  Offences
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          py: {
            xs: 6,
            md: 8,
          },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            maxWidth: 720,
            mx: "auto",
            mb: 6,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "#B08D57",
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            KANUN FEATURES
          </Typography>

          <Typography
            variant="h3"
            sx={{
              color: "#123B5D",
              fontWeight: 800,
              mt: 1,
              mb: 2,
              fontSize: {
                xs: "2rem",
                md: "2.8rem",
              },
            }}
          >
            Everything connected in one place
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              lineHeight: 1.8,
            }}
          >
            Search an offence, identify its
            section and understand the associated
            legal provisions.
          </Typography>
        </Box>

        <Grid
          container
          spacing={3}
        >
          {features.map((feature) => (
            <Grid
              key={feature.title}
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Card
                onClick={() =>
                  navigate(feature.path)
                }
                sx={{
                  height: "100%",
                  border:
                    "1px solid #E1E6EB",
                  boxShadow: "none",
                  cursor: "pointer",
                  transition:
                    "all 0.25s ease",
                  "&:hover": {
                    transform:
                      "translateY(-5px)",
                    borderColor:
                      "#B08D57",
                    boxShadow:
                      "0 15px 35px rgba(18,59,93,0.08)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 4,
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      backgroundColor:
                        "#EEF3F7",
                      color: "#123B5D",
                      display: "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      mb: 3,
                    }}
                  >
                    {feature.icon}
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      color: "#123B5D",
                      fontWeight: 750,
                      mb: 1.5,
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.8,
                      mb: 2,
                    }}
                  >
                    {feature.description}
                  </Typography>

                  <Button
                    endIcon={
                      <ArrowForwardIcon />
                    }
                    sx={{
                      px: 0,
                      color: "#123B5D",
                      fontWeight: 700,
                    }}
                  >
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        sx={{
          backgroundColor: "#F5F7F9",
          borderTop:
            "1px solid #E5E9ED",
          borderBottom:
            "1px solid #E5E9ED",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: {
              xs: 6,
              md: 7,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: {
                xs: "flex-start",
                md: "center",
              },
              justifyContent:
                "space-between",
              gap: 4,
              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  color: "#123B5D",
                  fontWeight: 800,
                  mb: 1,
                }}
              >
                Looking for a specific offence?
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  lineHeight: 1.8,
                  maxWidth: 650,
                }}
              >
                Use the KANUN search engine to
                find the relevant offence, Act,
                section and legal details.
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={<SearchIcon />}
              onClick={() =>
                navigate("/search")
              }
              sx={{
                backgroundColor: "#123B5D",
                px: 3,
                py: 1.5,
                whiteSpace: "nowrap",
                "&:hover": {
                  backgroundColor: "#0D2D45",
                },
              }}
            >
              Start Searching
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default Home;