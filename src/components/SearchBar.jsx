import { useState } from "react";
import { Paper, InputBase, IconButton, Box, List, ListItem, ListItemText, Collapse, Button } from "@mui/material";
import { Search, MyLocation, Refresh } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onLocationSelect }) => {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const navigate = useNavigate();

  // Handle Places Autocomplete
  const handleSearchInput = async (value) => {
    setQuery(value);
    if (!value.trim()) {
      setPredictions([]);
      return;
    }

    try {
      const { PlacesService } = await google.maps.importLibrary("places");
      const autocompleteService = new google.maps.places.AutocompleteService();
      const results = await autocompleteService.getPlacePredictions({
        input: value,
      });
      setPredictions(results?.predictions || []);
      setShowPredictions(true);
    } catch (error) {
      console.error("Places API Error:", error);
      setPredictions([]);
    }
  };

  // Handle prediction selection
  const handlePredictionSelect = async (prediction) => {
    setQuery(prediction.description);
    setShowPredictions(false);

    try {
      const { PlacesService } = await google.maps.importLibrary("places");
      const geocoder = new google.maps.Geocoder();
      const result = await geocoder.geocode({ placeId: prediction.place_id });

      if (result.results[0]?.geometry?.location) {
        const location = result.results[0].geometry.location;
        onLocationSelect({
          lat: location.lat(),
          lng: location.lng(),
          altitude: 400,
        });
      }
    } catch (error) {
      console.error("Geocoding Error:", error);
    }
  };

  // Handle current location
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationSelect({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            altitude: 400,
          });
        },
        (error) => {
          console.error("Geolocation Error:", error);
        }
      );
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    window.location.reload();
  };

  // Handle logout
  const handleLogout = () => {
    navigate("/"); // Redirect to the login page
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 1002,
        width: 500,
        maxWidth: "90vw",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Search Bar */}
      <Paper
        elevation={3}
        sx={{
          p: "8px 12px",
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, rgba(34, 193, 195, 0.8), rgba(253, 187, 45, 0.8))",
          backdropFilter: "blur(10px)",
          borderRadius: "50px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "#ffffff",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          ":hover": {
            transform: "scale(1.02)",
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, color: "#ffffff" }}
          placeholder="Search locations..."
          value={query}
          onChange={(e) => handleSearchInput(e.target.value)}
          onFocus={() => setShowPredictions(true)}
        />
        <IconButton sx={{ p: "10px" }} onClick={() => handleSearchInput(query)}>
          <Search />
        </IconButton>
        <IconButton sx={{ p: "10px" }} onClick={handleCurrentLocation}>
          <MyLocation />
        </IconButton>
        <IconButton sx={{ p: "10px" }} onClick={handleRefresh}>
          <Refresh />
        </IconButton>
      </Paper>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        sx={{
          ml: 2,
          minWidth: "50px", // Increased from 40px
          height: "50px",   // Increased from 40px
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(34, 193, 195, 1), rgba(253, 187, 45, 1))",
          color: "#ffffff",
          fontWeight: "bold",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          ":hover": {
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
            transform: "scale(1.1)",
          },
        }}
      >
        <LogoutIcon sx={{ fontSize: "1.5rem" }} /> {/* Increased icon size */}
      </Button>
    </Box>
  );
};

export default SearchBar;
