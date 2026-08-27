import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import GavelIcon from "@mui/icons-material/Gavel";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SearchIcon from "@mui/icons-material/Search";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const About = () => {
  const features = [
    {
      icon: <MenuBookIcon />,
      title: "Acts",
      description:
        "Browse available Acts and explore their legal provisions.",
    },
    {
      icon: <GavelIcon />,
      title: "Sections",
      description:
        "Explore individual sections and their associated legal details.",
    },
    {
      icon: <SearchIcon />,
      title: "Legal Search",
      description:
        "Search offences, sections and Acts using relevant keywords.",
    },
    {
      icon: <AccountBalanceIcon />,
      title: "Legal Reference",
      description:
        "View punishment, classification, court and other legal information.",
    },
  ];

  return (
    <>
      <Navbar />

      <Box
        sx={{
          backgroundColor: "#F6F8FA",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            background:
              "linear-gradient(135deg, #123B5D 0%, #0D304B 100%)",
            color: "#FFFFFF",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 420,
              height: 420,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.035)",
              right: -120,
              top: -180,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.025)",
              left: -160,
              bottom: -200,
            }}
          />

          <Container
            maxWidth="lg"
            sx={{
              position: "relative",
              zIndex: 1,
              py: {
                xs: 7,
                md: 9,
              },
            }}
          >
            <Typography
              sx={{
                color: "#E1C47A",
                fontWeight: 800,
                fontSize: "0.85rem",
                letterSpacing: 3,
                mb: 2.5,
                textTransform: "uppercase",
              }}
            >
              Indian Law & Legal Reference
            </Typography>

            <Typography
              sx={{
                fontWeight: 900,
                fontSize: {
                  xs: "3rem",
                  sm: "4rem",
                  md: "5.2rem",
                },
                lineHeight: {
                  xs: 1.05,
                  md: 1.02,
                },
                letterSpacing: -1.5,
                maxWidth: 900,
                mb: 3,
              }}
            >
              About KANUN.
            </Typography>

            <Typography
              sx={{
                color: "#E7EEF4",
                fontSize: {
                  xs: "1rem",
                  md: "1.15rem",
                },
                lineHeight: 1.8,
                maxWidth: 780,
              }}
            >
              KANUN is a legal reference platform designed to
              help users discover Acts, sections, offences,
              punishments and legal classifications in one place.
            </Typography>
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
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #E1E6EA",
              backgroundColor: "#FFFFFF",
              mb: 7,
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 3,
                  md: 5,
                },
              }}
            >
              <Typography
                sx={{
                  color: "#123B5D",
                  fontWeight: 900,
                  fontSize: {
                    xs: "1.6rem",
                    md: "2rem",
                  },
                  mb: 2,
                }}
              >
                About the Platform
              </Typography>

              <Typography
                sx={{
                  color: "#526574",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  mb: 2,
                }}
              >
                KANUN organizes legal information into Acts,
                Sections and Offence details, allowing users to
                navigate from a broader Act to its individual
                legal provisions and related information.
              </Typography>

              <Typography
                sx={{
                  color: "#526574",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                }}
              >
                The platform also provides a dedicated search
                facility that helps users find relevant legal
                information quickly instead of manually browsing
                through the complete collection.
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ mb: 7 }}>
            <Typography
              sx={{
                color: "#123B5D",
                fontWeight: 900,
                fontSize: {
                  xs: "1.6rem",
                  md: "2rem",
                },
                textAlign: "center",
                mb: 4,
              }}
            >
              Key Features
            </Typography>

            <Grid
              container
              spacing={3}
            >
              {features.map((feature) => (
                <Grid
                  key={feature.title}
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 3,
                  }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      border: "1px solid #E1E6EA",
                      backgroundColor: "#FFFFFF",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow:
                          "0 10px 28px rgba(18, 59, 93, 0.10)",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        textAlign: "center",
                        p: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: 58,
                          height: 58,
                          borderRadius: 2,
                          backgroundColor: "#EEF3F7",
                          color: "#123B5D",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 2,
                        }}
                      >
                        {feature.icon}
                      </Box>

                      <Typography
                        sx={{
                          color: "#123B5D",
                          fontWeight: 800,
                          fontSize: "1.05rem",
                          mb: 1,
                        }}
                      >
                        {feature.title}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#6C7882",
                          fontSize: "0.9rem",
                          lineHeight: 1.6,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid #E1E6EA",
              backgroundColor: "#FFFFFF",
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 3,
                  md: 5,
                },
              }}
            >
              <Typography
                sx={{
                  color: "#123B5D",
                  fontWeight: 900,
                  fontSize: {
                    xs: "1.6rem",
                    md: "2rem",
                  },
                  mb: 4,
                }}
              >
                Technology
              </Typography>

              <Grid
                container
                spacing={4}
              >
                <Grid
                  size={{
                    xs: 12,
                    md: 4,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#123B5D",
                      fontWeight: 800,
                      mb: 1,
                    }}
                  >
                    Frontend
                  </Typography>

                  <Typography
                    sx={{
                      color: "#6C7882",
                      lineHeight: 1.7,
                    }}
                  >
                    React, TypeScript and Material UI
                  </Typography>
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                    md: 4,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#123B5D",
                      fontWeight: 800,
                      mb: 1,
                    }}
                  >
                    Backend
                  </Typography>

                  <Typography
                    sx={{
                      color: "#6C7882",
                      lineHeight: 1.7,
                    }}
                  >
                    Spring Boot and REST APIs
                  </Typography>
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                    md: 4,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#123B5D",
                      fontWeight: 800,
                      mb: 1,
                    }}
                  >
                    Database
                  </Typography>

                  <Typography
                    sx={{
                      color: "#6C7882",
                      lineHeight: 1.7,
                    }}
                  >
                    PostgreSQL
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default About;