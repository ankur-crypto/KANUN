import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import GavelIcon from "@mui/icons-material/Gavel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import {
  searchKanun,
  type SearchResult,
  type SearchType,
} from "../../api/searchApi";

const Search = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const [searchType, setSearchType] =
    useState<SearchType>("all");

  const [results, setResults] =
    useState<SearchResult[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [searched, setSearched] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSearch = async () => {
    const value = query.trim();

    if (!value) {
      setResults([]);
      setSearched(false);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSearched(true);

      const data = await searchKanun(
        value,
        searchType
      );

      setResults(data);
    } catch (err) {
      console.error(err);

      setResults([]);

      setError(
        "Unable to perform the search. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent
  ) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearchTypeChange = (
    event: SelectChangeEvent
  ) => {
    setSearchType(
      event.target.value as SearchType
    );
  };

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
            KANUN LEGAL SEARCH
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: {
                xs: "2.3rem",
                md: "3.5rem",
              },
              mt: 1,
              mb: 2,
            }}
          >
            Find the Relevant Law
          </Typography>

          <Typography
            sx={{
              color:
                "rgba(255,255,255,0.75)",
              maxWidth: 700,
              lineHeight: 1.8,
              mb: 4,
            }}
          >
            Search offences, sections and Acts
            to discover the relevant legal
            provisions and associated details.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "190px 1fr 140px",
              },
              gap: 1.5,
              maxWidth: 950,
            }}
          >
            <Select
              value={searchType}
              onChange={
                handleSearchTypeChange
              }
              fullWidth
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: 1,
                color: "#123B5D",
                fontWeight: 600,
                "& .MuiOutlinedInput-notchedOutline":
                  {
                    border: "none",
                  },
              }}
            >
              <MenuItem value="all">
                Search All
              </MenuItem>

              <MenuItem value="offence">
                Offence
              </MenuItem>

              <MenuItem value="section">
                Section
              </MenuItem>

              <MenuItem value="act">
                Act
              </MenuItem>
            </Select>

            <TextField
              fullWidth
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder={
                searchType === "offence"
                  ? "Enter offence name..."
                  : searchType === "section"
                  ? "Enter section number..."
                  : searchType === "act"
                  ? "Enter Act name or code..."
                  : "Search offence, section or Act..."
              }
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          color: "#123B5D",
                        }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={loading}
              sx={{
                backgroundColor: "#D6B878",
                color: "#123B5D",
                fontWeight: 800,
                "&:hover": {
                  backgroundColor: "#C5A75D",
                },
              }}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "#123B5D",
                  }}
                />
              ) : (
                "Search"
              )}
            </Button>
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
        {error && (
          <Card
            sx={{
              border:
                "1px solid #E1C4C4",
              boxShadow: "none",
              mb: 4,
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

        {searched &&
          !loading &&
          !error &&
          results.length === 0 && (
            <Box
              sx={{
                textAlign: "center",
                py: 10,
              }}
            >
              <SearchIcon
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
                No matching records found
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 1,
                }}
              >
                Try another offence, section
                number or Act.
              </Typography>
            </Box>
          )}

        {results.length > 0 && (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: {
                  xs: "flex-start",
                  sm: "center",
                },
                justifyContent:
                  "space-between",
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
                  Search Results
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 0.5,
                  }}
                >
                  {results.length} result
                  {results.length !== 1
                    ? "s"
                    : ""}{" "}
                  found for "{query}"
                </Typography>
              </Box>

              <Chip
                icon={<SearchIcon />}
                label={
                  searchType === "all"
                    ? "All"
                    : searchType
                }
                sx={{
                  fontWeight: 700,
                  textTransform:
                    "capitalize",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {results.map(
                (result, index) => (
                  <Card
                    key={`${result.offenceId ?? "none"}-${result.sectionId}-${index}`}
                    sx={{
                      border:
                        "1px solid #E1E6EB",
                      boxShadow: "none",
                      overflow: "hidden",
                      transition:
                        "all 0.25s ease",
                      "&:hover": {
                        borderColor:
                          "#B08D57",
                        boxShadow:
                          "0 12px 30px rgba(18,59,93,0.08)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: 5,
                        backgroundColor:
                          "#123B5D",
                      }}
                    />

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
                          gap: 2,
                          alignItems:
                            "flex-start",
                        }}
                      >
                        <Box
                          sx={{
                            width: 54,
                            height: 54,
                            minWidth: 54,
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
                            minWidth: 0,
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              color:
                                "#123B5D",
                              fontWeight: 800,
                              mb: 1,
                            }}
                          >
                            {result.offenceName ||
                              "Legal Provision"}
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              flexWrap:
                                "wrap",
                              mb: 2,
                            }}
                          >
                            {result.actCode && (
                              <Chip
                                icon={
                                  <AccountBalanceIcon />
                                }
                                label={
                                  result.actCode
                                }
                                size="small"
                                sx={{
                                  fontWeight:
                                    700,
                                }}
                              />
                            )}

                            {result.offenceCategory && (
                              <Chip
                                label={
                                  result.offenceCategory
                                }
                                size="small"
                                sx={{
                                  backgroundColor:
                                    "#F6EFE4",
                                  color:
                                    "#7A5A27",
                                  fontWeight:
                                    700,
                                }}
                              />
                            )}
                          </Box>

                          <Divider
                            sx={{
                              mb: 3,
                            }}
                          />

                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns:
                                {
                                  xs: "1fr",
                                  sm: "1fr 1fr",
                                },
                              gap: 3,
                            }}
                          >
                            <Box>
                              <Box
                                sx={{
                                  display:
                                    "flex",
                                  alignItems:
                                    "center",
                                  gap: 1,
                                  mb: 0.8,
                                }}
                              >
                                <AccountBalanceIcon
                                  sx={{
                                    fontSize:
                                      18,
                                    color:
                                      "#B08D57",
                                  }}
                                />

                                <Typography
                                  variant="caption"
                                  sx={{
                                    color:
                                      "#6C7882",
                                    fontWeight:
                                      800,
                                    letterSpacing:
                                      1,
                                  }}
                                >
                                  ACT
                                </Typography>
                              </Box>

                              <Typography
                                sx={{
                                  color:
                                    "#123B5D",
                                  fontWeight:
                                    700,
                                }}
                              >
                                {result.actName ||
                                  "Not specified"}
                              </Typography>

                              {result.actCode && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    mt: 0.3,
                                  }}
                                >
                                  {
                                    result.actCode
                                  }
                                </Typography>
                              )}
                            </Box>

                            <Box>
                              <Box
                                sx={{
                                  display:
                                    "flex",
                                  alignItems:
                                    "center",
                                  gap: 1,
                                  mb: 0.8,
                                }}
                              >
                                <DescriptionIcon
                                  sx={{
                                    fontSize:
                                      18,
                                    color:
                                      "#B08D57",
                                  }}
                                />

                                <Typography
                                  variant="caption"
                                  sx={{
                                    color:
                                      "#6C7882",
                                    fontWeight:
                                      800,
                                    letterSpacing:
                                      1,
                                  }}
                                >
                                  SECTION
                                </Typography>
                              </Box>

                              <Typography
                                sx={{
                                  color:
                                    "#123B5D",
                                  fontWeight:
                                    700,
                                }}
                              >
                                Section{" "}
                                {
                                  result.sectionNumber
                                }
                              </Typography>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {
                                  result.sectionTitle
                                }
                              </Typography>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              mt: 3,
                              p: 2.5,
                              backgroundColor:
                                "#F7F9FA",
                              borderRadius: 2,
                              border:
                                "1px solid #E8EDF1",
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                color:
                                  "#6C7882",
                                fontWeight:
                                  800,
                                letterSpacing:
                                  1,
                              }}
                            >
                              PUNISHMENT
                            </Typography>

                            <Typography
                              variant="body2"
                              sx={{
                                color:
                                  "#123B5D",
                                fontWeight:
                                  600,
                                mt: 0.8,
                                lineHeight:
                                  1.8,
                              }}
                            >
                              {result.punishment ||
                                "Not specified"}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display:
                                "flex",
                              gap: 1,
                              flexWrap:
                                "wrap",
                              mt: 2.5,
                            }}
                          >
                            <Chip
                              size="small"
                              label={
                                result.cognizable
                                  ? "Cognizable"
                                  : "Non-Cognizable"
                              }
                              variant={
                                result.cognizable
                                  ? "filled"
                                  : "outlined"
                              }
                            />

                            <Chip
                              size="small"
                              label={
                                result.bailable
                                  ? "Bailable"
                                  : "Non-Bailable"
                              }
                              variant={
                                result.bailable
                                  ? "filled"
                                  : "outlined"
                              }
                            />

                            <Chip
                              size="small"
                              label={
                                result.compoundable
                                  ? "Compoundable"
                                  : "Non-Compoundable"
                              }
                              variant={
                                result.compoundable
                                  ? "filled"
                                  : "outlined"
                              }
                            />

                            {result.classification && (
                              <Chip
                                size="small"
                                label={
                                  result.classification
                                }
                                variant="outlined"
                              />
                            )}

                            {result.court && (
                              <Chip
                                size="small"
                                label={`Court: ${result.court}`}
                                variant="outlined"
                              />
                            )}
                          </Box>

                          <Box
                            sx={{
                              display:
                                "flex",
                              justifyContent:
                                "flex-end",
                              mt: 3,
                            }}
                          >
                            <Button
                              variant="contained"
                              endIcon={
                                <ArrowForwardIcon />
                              }
                              onClick={() =>
                                navigate(
                                  `/sections/${result.sectionId}`
                                )
                              }
                              sx={{
                                backgroundColor:
                                  "#123B5D",
                                fontWeight:
                                  700,
                                px: 2.5,
                                "&:hover":
                                  {
                                    backgroundColor:
                                      "#0D2D45",
                                  },
                              }}
                            >
                              View Full Section
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                )
              )}
            </Box>
          </>
        )}

        {!searched && (
          <Box
            sx={{
              textAlign: "center",
              py: 10,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 3,
                borderRadius: 3,
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
              <GavelIcon
                sx={{
                  fontSize: 42,
                }}
              />
            </Box>

            <Typography
              variant="h5"
              sx={{
                color: "#123B5D",
                fontWeight: 800,
              }}
            >
              Search the KANUN database
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                maxWidth: 600,
                mx: "auto",
                mt: 1.5,
                lineHeight: 1.8,
              }}
            >
              Search by offence, section number,
              Act name or Act code to discover
              connected legal information.
            </Typography>
          </Box>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default Search;