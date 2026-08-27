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
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GavelIcon from "@mui/icons-material/Gavel";
import SecurityIcon from "@mui/icons-material/Security";
import DescriptionIcon from "@mui/icons-material/Description";

import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import { getSectionById } from "../../api/sectionApi";
import { getOffencesBySection } from "../../api/sectionOffenceApi";

interface Section {
  id: number;
  sectionNumber: string;
  sectionTitle: string;
  description?: string;
  punishment?: string;
  classification?: string;

  cognizable: boolean;
  bailable: boolean;
  compoundable: boolean;

  court?: string;
  status?: string;
  sourceReference?: string;

  actId?: number;
  actCode?: string;
  actName?: string;
}

interface Offence {
  id: number;
  offenceName: string;
  category?: string;
  description?: string;
  status?: string;
}

interface SectionOffenceResponse {
  id?: number;
  offence?: {
    id?: number;
    offenceName?: string;
    category?: string;
    description?: string;
    status?: string;
  };
}

const SectionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const sectionId = Number(id);

  const [section, setSection] =
    useState<Section | null>(null);

  const [offences, setOffences] =
    useState<Offence[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [offencesLoading, setOffencesLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [offencesError, setOffencesError] =
    useState("");

  useEffect(() => {
    const loadSection = async () => {
      if (!sectionId) {
        setError("Invalid section ID.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data =
          await getSectionById(sectionId);

        setSection(data);
      } catch (err) {
        console.error(
          "Unable to load section",
          err
        );

        setError(
          "Unable to load section information."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSection();
  }, [sectionId]);

  useEffect(() => {
    const loadOffences = async () => {
      if (!sectionId) {
        setOffencesLoading(false);
        return;
      }

      try {
        setOffencesLoading(true);
        setOffencesError("");

        const data =
          await getOffencesBySection(sectionId);

        const mappedOffences: Offence[] =
          (data as SectionOffenceResponse[]).map(
            (item) => ({
              id: item.offence?.id ?? 0,
              offenceName:
                item.offence?.offenceName ??
                "Unnamed offence",
              category:
                item.offence?.category,
              description:
                item.offence?.description,
              status:
                item.offence?.status,
            })
          );

        setOffences(mappedOffences);
      } catch (err) {
        console.error(
          "Unable to load offences",
          err
        );

        setOffencesError(
          "Unable to load related offences."
        );
      } finally {
        setOffencesLoading(false);
      }
    };

    loadOffences();
  }, [sectionId]);

  if (loading) {
    return (
      <>
        <Navbar />

        <Box
          sx={{
            minHeight: "65vh",
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

        <Footer />
      </>
    );
  }

  if (error || !section) {
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
            onClick={() => navigate(-1)}
            sx={{
              color: "#123B5D",
              fontWeight: 700,
              mb: 4,
            }}
          >
            Go Back
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
                  "Section not found."}
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
            onClick={() => navigate(-1)}
            sx={{
              color: "#FFFFFF",
              mb: 4,
              "&:hover": {
                backgroundColor:
                  "rgba(255,255,255,0.08)",
              },
            }}
          >
            Go Back
          </Button>

          <Typography
            variant="overline"
            sx={{
              color: "#D6B878",
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            SECTION DETAILS
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              mt: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: {
                  xs: "2.3rem",
                  md: "3.7rem",
                },
              }}
            >
              Section{" "}
              {section.sectionNumber}
            </Typography>

            {section.actCode && (
              <Chip
                label={section.actCode}
                sx={{
                  backgroundColor:
                    "#D6B878",
                  color: "#123B5D",
                  fontWeight: 800,
                }}
              />
            )}
          </Box>

          <Typography
            sx={{
              fontSize: {
                xs: "1.1rem",
                md: "1.3rem",
              },
              color:
                "rgba(255,255,255,0.78)",
              mt: 1.5,
              maxWidth: 800,
            }}
          >
            {section.sectionTitle}
          </Typography>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          py: 6,
        }}
      >
        <Card
          sx={{
            border:
              "1px solid #E1E6EB",
            boxShadow: "none",
            mb: 4,
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 3,
              }}
            >
              <DescriptionIcon
                sx={{
                  color: "#B08D57",
                }}
              />

              <Typography
                variant="h5"
                sx={{
                  color: "#123B5D",
                  fontWeight: 800,
                }}
              >
                Section Description
              </Typography>
            </Box>

            <Typography
              color="text.secondary"
              sx={{
                lineHeight: 2,
                whiteSpace: "pre-line",
              }}
            >
              {section.description ||
                "No description available."}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            border:
              "1px solid #E1E6EB",
            boxShadow: "none",
            mb: 4,
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 3,
              }}
            >
              <GavelIcon
                sx={{
                  color: "#B08D57",
                }}
              />

              <Typography
                variant="h5"
                sx={{
                  color: "#123B5D",
                  fontWeight: 800,
                }}
              >
                Offences
              </Typography>
            </Box>

            {offencesLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    "center",
                  py: 4,
                }}
              >
                <CircularProgress
                  size={30}
                  sx={{
                    color: "#123B5D",
                  }}
                />
              </Box>
            ) : offencesError ? (
              <Typography color="text.secondary">
                {offencesError}
              </Typography>
            ) : offences.length === 0 ? (
              <Typography color="text.secondary">
                No offences found for this
                section.
              </Typography>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {offences.map((offence) => (
                  <Box
                    key={offence.id}
                    sx={{
                      p: 2.5,
                      border:
                        "1px solid #E1E6EB",
                      borderRadius: 2,
                      backgroundColor:
                        "#FAFBFC",
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
                          width: 46,
                          height: 46,
                          minWidth: 46,
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
                        <GavelIcon />
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
                            fontWeight: 700,
                            mb: 0.5,
                          }}
                        >
                          {offence.offenceName}
                        </Typography>

                        {offence.category && (
                          <Chip
                            label={
                              offence.category
                            }
                            size="small"
                            sx={{
                              mb: 1,
                              backgroundColor:
                                "#F6EFE4",
                              color:
                                "#7A5A27",
                              fontWeight: 600,
                            }}
                          />
                        )}

                        {offence.description && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              lineHeight: 1.7,
                            }}
                          >
                            {
                              offence.description
                            }
                          </Typography>
                        )}

                        {offence.status && (
                          <Chip
                            label={
                              offence.status
                            }
                            size="small"
                            variant="outlined"
                            sx={{
                              mt: 1,
                              color:
                                "#123B5D",
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>

        <Card
          sx={{
            border:
              "1px solid #E1E6EB",
            boxShadow: "none",
            mb: 4,
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 3,
              }}
            >
              <SecurityIcon
                sx={{
                  color: "#B08D57",
                }}
              />

              <Typography
                variant="h5"
                sx={{
                  color: "#123B5D",
                  fontWeight: 800,
                }}
              >
                Legal Classification
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "repeat(3, 1fr)",
                },
                gap: 2,
              }}
            >
              <Card
                sx={{
                  backgroundColor:
                    "#F7F9FA",
                  boxShadow: "none",
                  border:
                    "1px solid #E8EDF1",
                }}
              >
                <CardContent>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontWeight: 800,
                    }}
                  >
                    COGNIZABLE
                  </Typography>

                  <Typography
                    sx={{
                      color: "#123B5D",
                      fontWeight: 800,
                      mt: 0.5,
                    }}
                  >
                    {section.cognizable
                      ? "Yes"
                      : "No"}
                  </Typography>
                </CardContent>
              </Card>

              <Card
                sx={{
                  backgroundColor:
                    "#F7F9FA",
                  boxShadow: "none",
                  border:
                    "1px solid #E8EDF1",
                }}
              >
                <CardContent>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontWeight: 800,
                    }}
                  >
                    BAILABLE
                  </Typography>

                  <Typography
                    sx={{
                      color: "#123B5D",
                      fontWeight: 800,
                      mt: 0.5,
                    }}
                  >
                    {section.bailable
                      ? "Yes"
                      : "No"}
                  </Typography>
                </CardContent>
              </Card>

              <Card
                sx={{
                  backgroundColor:
                    "#F7F9FA",
                  boxShadow: "none",
                  border:
                    "1px solid #E8EDF1",
                }}
              >
                <CardContent>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontWeight: 800,
                    }}
                  >
                    COMPOUNDABLE
                  </Typography>

                  <Typography
                    sx={{
                      color: "#123B5D",
                      fontWeight: 800,
                      mt: 0.5,
                    }}
                  >
                    {section.compoundable
                      ? "Yes"
                      : "No"}
                  </Typography>
                </CardContent>
              </Card>

              {section.classification && (
                <Card
                  sx={{
                    backgroundColor:
                      "#F7F9FA",
                    boxShadow: "none",
                    border:
                      "1px solid #E8EDF1",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontWeight: 800,
                      }}
                    >
                      CLASSIFICATION
                    </Typography>

                    <Typography
                      sx={{
                        color: "#123B5D",
                        fontWeight: 800,
                        mt: 0.5,
                      }}
                    >
                      {section.classification}
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {section.court && (
                <Card
                  sx={{
                    backgroundColor:
                      "#F7F9FA",
                    boxShadow: "none",
                    border:
                      "1px solid #E8EDF1",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontWeight: 800,
                      }}
                    >
                      COURT
                    </Typography>

                    <Typography
                      sx={{
                        color: "#123B5D",
                        fontWeight: 800,
                        mt: 0.5,
                      }}
                    >
                      {section.court}
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {section.status && (
                <Card
                  sx={{
                    backgroundColor:
                      "#F7F9FA",
                    boxShadow: "none",
                    border:
                      "1px solid #E8EDF1",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontWeight: 800,
                      }}
                    >
                      STATUS
                    </Typography>

                    <Typography
                      sx={{
                        color: "#123B5D",
                        fontWeight: 800,
                        mt: 0.5,
                      }}
                    >
                      {section.status}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            border:
              "1px solid #E1E6EB",
            boxShadow: "none",
            mb: 4,
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 3,
              }}
            >
              <GavelIcon
                sx={{
                  color: "#B08D57",
                }}
              />

              <Typography
                variant="h5"
                sx={{
                  color: "#123B5D",
                  fontWeight: 800,
                }}
              >
                Punishment
              </Typography>
            </Box>

            <Box
              sx={{
                backgroundColor:
                  "#F7F9FA",
                border:
                  "1px solid #E8EDF1",
                borderRadius: 2,
                p: 3,
              }}
            >
              <Typography
                sx={{
                  color: "#123B5D",
                  fontWeight: 600,
                  lineHeight: 1.9,
                }}
              >
                {section.punishment ||
                  "Punishment information not available."}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            border:
              "1px solid #E1E6EB",
            boxShadow: "none",
            mb: 4,
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 3,
              }}
            >
              <MenuBookIcon
                sx={{
                  color: "#B08D57",
                }}
              />

              <Typography
                variant="h5"
                sx={{
                  color: "#123B5D",
                  fontWeight: 800,
                }}
              >
                Related Act
              </Typography>
            </Box>

            {section.actId ? (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#123B5D",
                    fontWeight: 800,
                  }}
                >
                  {section.actName || "Act"}
                </Typography>

                {section.actCode && (
                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 0.5,
                    }}
                  >
                    Act Code: {section.actCode}
                  </Typography>
                )}

                <Divider
                  sx={{
                    my: 3,
                  }}
                />

                <Button
                  variant="contained"
                  onClick={() =>
                    navigate(
                      `/acts/${section.actId}`
                    )
                  }
                  sx={{
                    backgroundColor:
                      "#123B5D",
                    fontWeight: 700,
                    "&:hover": {
                      backgroundColor:
                        "#0D2D45",
                    },
                  }}
                >
                  View Full Act
                </Button>
              </>
            ) : (
              <Typography color="text.secondary">
                Related Act information not
                available.
              </Typography>
            )}
          </CardContent>
        </Card>

        {section.sourceReference && (
          <Card
            sx={{
              border:
                "1px solid #E1E6EB",
              boxShadow: "none",
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
                variant="h6"
                sx={{
                  color: "#123B5D",
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Source Reference
              </Typography>

              <Typography
                color="text.secondary"
              >
                {section.sourceReference}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default SectionDetails;