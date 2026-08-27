import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import GavelIcon from "@mui/icons-material/Gavel";
import DescriptionIcon from "@mui/icons-material/Description";

import { useEffect, useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import {
  getStatistics,
  type Statistics as StatisticsData,
} from "../../api/statisticsApi";

const Statistics = () => {
  const [statistics, setStatistics] =
    useState<StatisticsData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getStatistics();

        setStatistics(data);
      } catch (err) {
        console.error(
          "Unable to load statistics",
          err
        );

        setError(
          "Unable to load statistics."
        );
      } finally {
        setLoading(false);
      }
    };

    loadStatistics();
  }, []);

  return (
    <>
      <Navbar />

      <Box
        sx={{
          background:
            "linear-gradient(135deg, #123B5D 0%, #0D2D45 100%)",
          color: "#FFFFFF",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: {
              xs: 6,
              md: 8,
            },
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "#D6B878",
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            KANUN DATABASE
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: {
                xs: "2.3rem",
                md: "3.7rem",
              },
              mt: 1,
              mb: 2,
            }}
          >
            Statistics
          </Typography>

          <Typography
            sx={{
              color:
                "rgba(255,255,255,0.75)",
              maxWidth: 750,
              lineHeight: 1.8,
            }}
          >
            Overview of the legal information
            currently available in the KANUN
            database.
          </Typography>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          py: 7,
          minHeight: "55vh",
        }}
      >
        {loading && (
          <Box
            sx={{
              minHeight: "35vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              sx={{
                color: "#123B5D",
              }}
            />
          </Box>
        )}

        {!loading && error && (
          <Card
            sx={{
              border:
                "1px solid #E1C4C4",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  color: "#A33A3A",
                  fontWeight: 600,
                }}
              >
                {error}
              </Typography>
            </CardContent>
          </Card>
        )}

        {!loading &&
          !error &&
          statistics && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "repeat(3, 1fr)",
                },
                gap: 3,
              }}
            >
              <Card
                sx={{
                  border:
                    "1px solid #E1E6EB",
                  boxShadow: "none",
                }}
              >
                <CardContent
                  sx={{
                    p: 4,
                    textAlign: "center",
                  }}
                >
                  <MenuBookIcon
                    sx={{
                      fontSize: 45,
                      color: "#B08D57",
                      mb: 2,
                    }}
                  />

                  <Typography
                    variant="h2"
                    sx={{
                      color: "#123B5D",
                      fontWeight: 900,
                    }}
                  >
                    {statistics.acts}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      color: "#123B5D",
                      fontWeight: 700,
                      mt: 1,
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
                }}
              >
                <CardContent
                  sx={{
                    p: 4,
                    textAlign: "center",
                  }}
                >
                  <DescriptionIcon
                    sx={{
                      fontSize: 45,
                      color: "#B08D57",
                      mb: 2,
                    }}
                  />

                  <Typography
                    variant="h2"
                    sx={{
                      color: "#123B5D",
                      fontWeight: 900,
                    }}
                  >
                    {statistics.sections}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      color: "#123B5D",
                      fontWeight: 700,
                      mt: 1,
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
                }}
              >
                <CardContent
                  sx={{
                    p: 4,
                    textAlign: "center",
                  }}
                >
                  <GavelIcon
                    sx={{
                      fontSize: 45,
                      color: "#B08D57",
                      mb: 2,
                    }}
                  />

                  <Typography
                    variant="h2"
                    sx={{
                      color: "#123B5D",
                      fontWeight: 900,
                    }}
                  >
                    {statistics.offences}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      color: "#123B5D",
                      fontWeight: 700,
                      mt: 1,
                    }}
                  >
                    Offences
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
      </Container>

      <Footer />
    </>
  );
};

export default Statistics;