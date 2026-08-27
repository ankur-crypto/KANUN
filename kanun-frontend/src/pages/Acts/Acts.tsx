import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import {
  getActs,
  type Act,
} from "../../api/actsApi";

const Acts = () => {
  const navigate = useNavigate();

  const [acts, setActs] =
    useState<Act[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadActs = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getActs();

        setActs(data);
      } catch (err) {
        console.error(
          "Unable to load Acts",
          err
        );

        setError(
          "Unable to load Acts. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadActs();
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
            LEGAL DATABASE
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
            Acts & Laws
          </Typography>

          <Typography
            sx={{
              color:
                "rgba(255,255,255,0.75)",
              maxWidth: 750,
              lineHeight: 1.8,
            }}
          >
            Browse the Acts available in the
            KANUN legal reference database and
            explore their sections and legal
            provisions.
          </Typography>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          py: 6,
          minHeight: "55vh",
        }}
      >
        {loading && (
          <Box
            sx={{
              minHeight: "40vh",
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
          acts.length === 0 && (
            <Box
              sx={{
                textAlign: "center",
                py: 10,
              }}
            >
              <MenuBookIcon
                sx={{
                  fontSize: 60,
                  color: "#B08D57",
                  mb: 2,
                }}
              />

              <Typography
                variant="h5"
                sx={{
                  color: "#123B5D",
                  fontWeight: 800,
                }}
              >
                No Acts available
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 1,
                }}
              >
                No legal Acts were found in
                the database.
              </Typography>
            </Box>
          )}

        {!loading &&
          !error &&
          acts.length > 0 && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: {
                    xs: "flex-start",
                    sm: "center",
                  },
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  gap: 2,
                  mb: 4,
                }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#123B5D",
                      fontWeight: 900,
                    }}
                  >
                    Available Acts
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 0.5,
                    }}
                  >
                    {acts.length} Act
                    {acts.length !== 1
                      ? "s"
                      : ""}{" "}
                    available
                  </Typography>
                </Box>

                <Chip
                  icon={<MenuBookIcon />}
                  label={`${acts.length} Acts`}
                  sx={{
                    fontWeight: 700,
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    lg: "1fr 1fr 1fr",
                  },
                  gap: 3,
                }}
              >
                {acts.map((act) => (
                  <Card
                    key={act.id}
                    onClick={() =>
                      navigate(
                        `/acts/${act.id}`
                      )
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
                        borderColor:
                          "#B08D57",
                        transform:
                          "translateY(-4px)",
                        boxShadow:
                          "0 12px 30px rgba(18,59,93,0.10)",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 3,
                        height: "100%",
                        display: "flex",
                        flexDirection:
                          "column",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems:
                            "flex-start",
                          justifyContent:
                            "space-between",
                          gap: 2,
                          mb: 3,
                        }}
                      >
                        <Box
                          sx={{
                            width: 52,
                            height: 52,
                            minWidth: 52,
                            borderRadius: 2,
                            backgroundColor:
                              "#EEF3F7",
                            color: "#123B5D",
                            display: "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                          }}
                        >
                          <MenuBookIcon
                            sx={{
                              fontSize: 28,
                            }}
                          />
                        </Box>

                        {act.actCode && (
                          <Chip
                            label={
                              act.actCode
                            }
                            size="small"
                            sx={{
                              backgroundColor:
                                "#F6EFE4",
                              color:
                                "#7A5A27",
                              fontWeight: 700,
                            }}
                          />
                        )}
                      </Box>

                      <Typography
                        variant="h5"
                        sx={{
                          color: "#123B5D",
                          fontWeight: 800,
                          mb: 1,
                        }}
                      >
                        {act.actName}
                      </Typography>

                      {act.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            lineHeight: 1.8,
                            display:
                              "-webkit-box",
                            WebkitLineClamp: 4,
                            WebkitBoxOrient:
                              "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {act.description}
                        </Typography>
                      )}

                      <Box
                        sx={{
                          mt: "auto",
                          pt: 3,
                          display: "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "space-between",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color:
                              "#6C7882",
                            fontWeight: 700,
                          }}
                        >
                          View Act Details
                        </Typography>

                        <ArrowForwardIcon
                          sx={{
                            color: "#123B5D",
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </>
          )}
      </Container>

      <Footer />
    </>
  );
};

export default Acts;