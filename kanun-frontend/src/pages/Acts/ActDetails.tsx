import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DescriptionIcon from "@mui/icons-material/Description";

import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import {
  getActById,
  type ActDetails as ActDetailsType,
} from "../../api/actsApi";

const ActDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [act, setAct] =
    useState<ActDetailsType | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadAct = async () => {
      if (!id) {
        setError("Invalid Act ID.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getActById(
          Number(id)
        );

        setAct(data);
      } catch (error) {
        console.error(
          "Unable to load Act",
          error
        );

        setError(
          "Unable to load this Act."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />

        <Container
          maxWidth="lg"
          sx={{
            py: 12,
            minHeight: "65vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            sx={{
              color: "#123B5D",
            }}
          />
        </Container>

        <Footer />
      </>
    );
  }

  if (error || !act) {
    return (
      <>
        <Navbar />

        <Container
          maxWidth="lg"
          sx={{
            py: 10,
            minHeight: "65vh",
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() =>
              navigate("/acts")
            }
            sx={{
              color: "#123B5D",
              fontWeight: 700,
              mb: 4,
            }}
          >
            Back to Acts
          </Button>

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
                {error ||
                  "Act not found."}
              </Typography>
            </CardContent>
          </Card>
        </Container>

        <Footer />
      </>
    );
  }

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
              xs: 5,
              md: 7,
            },
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() =>
              navigate("/acts")
            }
            sx={{
              color: "#FFFFFF",
              mb: 4,
              "&:hover": {
                backgroundColor:
                  "rgba(255,255,255,0.08)",
              },
            }}
          >
            Back to Acts
          </Button>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                minWidth: 64,
                borderRadius: 2,
                backgroundColor:
                  "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MenuBookIcon
                sx={{
                  fontSize: 34,
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: "#D6B878",
                  fontWeight: 800,
                  letterSpacing: 2,
                }}
              >
                ACT DETAILS
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  fontSize: {
                    xs: "2.1rem",
                    md: "3.2rem",
                  },
                  mt: 0.5,
                }}
              >
                {act.actName}
              </Typography>

              {act.actCode && (
                <Chip
                  label={act.actCode}
                  sx={{
                    mt: 2,
                    color: "#123B5D",
                    backgroundColor:
                      "#D6B878",
                    fontWeight: 800,
                  }}
                />
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          py: 6,
          minHeight: "55vh",
        }}
      >
        <Card
          sx={{
            border:
              "1px solid #E1E6EB",
            boxShadow: "none",
            mb: 5,
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 3,
                md: 4,
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#123B5D",
                fontWeight: 800,
                mb: 2,
              }}
            >
              About this Act
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                lineHeight: 1.9,
              }}
            >
              {act.description ||
                "No description available for this Act."}
            </Typography>
          </CardContent>
        </Card>

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
            gap: 2,
            mb: 4,
            flexDirection: {
              xs: "column",
              sm: "row",
            },
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
              Sections
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 0.5,
              }}
            >
              Sections contained in this Act.
            </Typography>
          </Box>

          <Chip
            label={`${act.sections.length} Section${
              act.sections.length !== 1
                ? "s"
                : ""
            }`}
            sx={{
              fontWeight: 700,
            }}
          />
        </Box>

        {act.sections.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
            }}
          >
            <DescriptionIcon
              sx={{
                fontSize: 55,
                color: "#B08D57",
                mb: 2,
              }}
            />

            <Typography
              variant="h6"
              sx={{
                color: "#123B5D",
                fontWeight: 800,
              }}
            >
              No sections available
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {act.sections.map(
              (section) => (
                <Card
                  key={section.id}
                  onClick={() =>
                    navigate(
                      `/sections/${section.id}`
                    )
                  }
                  sx={{
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
                        "translateX(4px)",
                      boxShadow:
                        "0 8px 25px rgba(18,59,93,0.07)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: {
                        xs: 2.5,
                        md: 3,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems:
                          "flex-start",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          minWidth: 58,
                          height: 58,
                          borderRadius: 2,
                          backgroundColor:
                            "#EEF3F7",
                          color:
                            "#123B5D",
                          display: "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          fontWeight: 900,
                          fontSize:
                            "0.9rem",
                        }}
                      >
                        {section.sectionNumber}
                      </Box>

                      <Box
                        sx={{
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color:
                              "#123B5D",
                            fontWeight:
                              800,
                          }}
                        >
                          Section{" "}
                          {
                            section.sectionNumber
                          }
                        </Typography>

                        <Typography
                          sx={{
                            color:
                              "#123B5D",
                            fontWeight:
                              600,
                            mt: 0.4,
                          }}
                        >
                          {
                            section.sectionTitle
                          }
                        </Typography>

                        {section.description && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mt: 1,
                              lineHeight:
                                1.7,
                            }}
                          >
                            {
                              section.description
                            }
                          </Typography>
                        )}
                      </Box>

                      <ArrowForwardIcon
                        sx={{
                          color: "#B08D57",
                          mt: 1,
                        }}
                      />
                    </Box>

                    <Divider
                      sx={{
                        mt: 2.5,
                      }}
                    />
                  </CardContent>
                </Card>
              )
            )}
          </Box>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default ActDetails;