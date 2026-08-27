import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import GavelIcon from "@mui/icons-material/Gavel";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("md")
  );

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const menuItems = [
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

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#FFFFFF",
        color: "#123B5D",
        borderBottom: "1px solid #E5E9ED",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 70,
            justifyContent: "space-between",
          }}
        >
          <Box
            onClick={() => handleNavigate("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 1.5,
                backgroundColor: "#123B5D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GavelIcon
                sx={{
                  color: "#FFFFFF",
                  fontSize: 25,
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.35rem",
                  lineHeight: 1,
                  letterSpacing: 1,
                }}
              >
                KANUN
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.65rem",
                  color: "#6C7882",
                  letterSpacing: 0.5,
                }}
              >
                LAW & LEGAL REFERENCE
              </Typography>
            </Box>
          </Box>

          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              {menuItems.map((item) => {
                const active = isActive(item.path);

                return (
                  <Button
                    key={item.path}
                    onClick={() =>
                      handleNavigate(item.path)
                    }
                    sx={{
                      position: "relative",
                      color: "#123B5D",
                      px: 2,
                      fontWeight: active ? 800 : 500,
                      "&:hover": {
                        backgroundColor: "#EEF3F7",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 12,
                        right: 12,
                        bottom: 4,
                        height: 2,
                        borderRadius: 2,
                        backgroundColor: "#B08D57",
                        transform: active
                          ? "scaleX(1)"
                          : "scaleX(0)",
                        transition:
                          "transform 0.2s ease",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}

              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() =>
                  handleNavigate("/search")
                }
                sx={{
                  ml: 1,
                  backgroundColor: "#123B5D",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "#0D2D45",
                  },
                }}
              >
                Search
              </Button>
            </Box>
          )}

          {isMobile && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                color: "#123B5D",
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 270,
            p: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: "#123B5D",
              mb: 3,
            }}
          >
            KANUN
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {menuItems.map((item) => {
              const active = isActive(item.path);

              return (
                <Button
                  key={item.path}
                  onClick={() =>
                    handleNavigate(item.path)
                  }
                  sx={{
                    justifyContent: "flex-start",
                    color: "#123B5D",
                    py: 1.2,
                    px: 1.5,
                    fontWeight: active ? 800 : 500,
                    backgroundColor: active
                      ? "#EEF3F7"
                      : "transparent",
                    borderLeft: active
                      ? "3px solid #B08D57"
                      : "3px solid transparent",
                    "&:hover": {
                      backgroundColor: "#EEF3F7",
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}

            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={() =>
                handleNavigate("/search")
              }
              sx={{
                justifyContent: "flex-start",
                mt: 1,
                backgroundColor: "#123B5D",
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "#0D2D45",
                },
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;