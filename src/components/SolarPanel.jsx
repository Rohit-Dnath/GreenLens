import { Paper, Typography, Box, CircularProgress, Alert, Grid } from "@mui/material";
import { WbSunny } from "@mui/icons-material";
import { useState, useEffect } from "react";

const SolarPanel = ({ location, visible }) => {
  const [solarData, setSolarData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSolarData = async () => {
      if (!visible || !location) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${location.lat}&location.longitude=${location.lng}&key=${
            import.meta.env.VITE_GOOGLE_MAPS_API_KEY
          }`
        );

        if (!response.ok) throw new Error("Failed to fetch solar data");
        const data = await response.json();
        console.log("Solar Panel Data:", data);
        setSolarData(data);
      } catch (err) {
        setError("Failed to fetch solar potential data");
        console.error("Solar API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSolarData();
  }, [location, visible]);

  if (!visible) return null;

  const formatNumber = (num) => new Intl.NumberFormat().format(Math.round(num));

  const calculateTotalSolarPotential = (roofSegments) => {
    return roofSegments.reduce((total, segment) => {
      const avgSunshine = segment.stats.sunshineQuantiles.reduce((a, b) => a + b, 0) / segment.stats.sunshineQuantiles.length;
      return total + avgSunshine * segment.stats.areaMeters2;
    }, 0);
  };

  const calculateTotalArea = (roofSegments) => {
    return roofSegments.reduce((total, segment) => total + segment.stats.areaMeters2, 0);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: "absolute",
bottom: 20,
left: 20, // Keeps it anchored to the bottom-left corner
width: 350,
maxWidth: "90vw",
maxHeight: "80vh",
zIndex: 1000,
background: "linear-gradient(135deg, rgba(34, 193, 195, 0.95), rgba(253, 187, 45, 0.95))", // Green-tech gradient
backdropFilter: "blur(10px)", // Glassmorphism effect
borderRadius: "16px", // Smooth rounded corners
boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
padding: "16px", // Equivalent to p: 2
overflow: "hidden",
display: "flex",
flexDirection: "column",
border: "1px solid rgba(255, 255, 255, 0.3)", // Semi-transparent border
transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth animations

":focus-within": {
  outline: "2px solid rgba(253, 187, 45, 0.5)", // Focus glow effect
  boxShadow: "0 10px 30px rgba(253, 187, 45, 0.3)", // Glow on focus
},
color: "#ffffff", // White text for readability
fontWeight: "bold", // Adds a modern, bold typography
fontSize: "14px", // Standard readable font size

      }}
    >
      <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
        <WbSunny /> Solar Potential
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {solarData && solarData.solarPotential && (
        <Box sx={{ overflow: "auto" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: "rgba(255, 235, 59, 0.1)",
                  border: "1px solid rgba(255, 235, 59, 0.3)",
                }}
              >
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Total Solar Potential
                </Typography>
                <Typography variant="h4">{formatNumber(calculateTotalSolarPotential(solarData.solarPotential.roofSegmentStats))} kWh/year</Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Roof Area: {formatNumber(calculateTotalArea(solarData.solarPotential.roofSegmentStats))} m²
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Roof Segments
              </Typography>
              {solarData.solarPotential.roofSegmentStats.map((segment, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.03)",
                    borderRadius: 1,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Area
                      </Typography>
                      <Typography variant="body1">{formatNumber(segment.stats.areaMeters2)} m²</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Ground Area
                      </Typography>
                      <Typography variant="body1">{formatNumber(segment.stats.groundAreaMeters2)} m²</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Pitch
                      </Typography>
                      <Typography variant="body1">{segment.pitchDegrees.toFixed(1)}°</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Azimuth
                      </Typography>
                      <Typography variant="body1">{segment.azimuthDegrees.toFixed(1)}°</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Height at Center
                      </Typography>
                      <Typography variant="body1">{segment.planeHeightAtCenterMeters.toFixed(1)}m</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Solar Potential Range
                      </Typography>
                      <Typography variant="body1">
                        {formatNumber(segment.stats.sunshineQuantiles[0])} - {formatNumber(segment.stats.sunshineQuantiles[10])} kWh/m²/year
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Grid>
          </Grid>

          <Typography variant="caption" color="text.secondary" display="block" mt={2}>
            Based on Google Project Sunroof data
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default SolarPanel;
