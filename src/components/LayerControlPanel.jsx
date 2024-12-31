import { Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Switch, Box } from "@mui/material";
import { Air, WbSunny, DirectionsWalk, Park, DirectionsTransit } from "@mui/icons-material";

export const LAYER_TYPES = {
  AIR_QUALITY: "airQuality",
  SOLAR: "solar",
  WALKABILITY: "walkability",
  GREEN_SPACES: "greenSpaces",
  TRANSIT: "transit",
};

const LayerControlPanel = ({ activeLayers, onToggleLayer, onSelectPanel, selectedPanel, onLayerSelect, visibleMapLayer }) => {
  const layers = [
    {
      id: LAYER_TYPES.AIR_QUALITY,
      icon: <Air size={20} />,
      name: "Air Quality",
      description: "Real-time AQI data",
    },
    {
      id: LAYER_TYPES.SOLAR,
      icon: <WbSunny size={20} />,
      name: "Solar Potential",
      description: "Rooftop solar analysis",
    },
    {
      id: LAYER_TYPES.WALKABILITY,
      icon: <DirectionsWalk size={20} />,
      name: "Walkability",
      description: "Walkability score",
    },
    {
      id: LAYER_TYPES.GREEN_SPACES,
      icon: <Park size={20} />,
      name: "Green Spaces",
      description: "Parks and natural areas",
    },
    {
      id: LAYER_TYPES.TRANSIT,
      icon: <DirectionsTransit size={20} />,
      name: "Transit Access",
      description: "Public transportation",
    },
  ];

  const handleToggleLayer = (layerId) => {
    onToggleLayer(layerId);
    if (!activeLayers[layerId]) {
      onSelectPanel(layerId);
    }
  };

  const handleLayerClick = (layerId) => {
    if (activeLayers[layerId]) {
      onSelectPanel(layerId);
      onLayerSelect(layerId);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: "absolute",
bottom: 20,
right: 20,
width: 300,
zIndex: 1000,
background: "linear-gradient(135deg, rgba(34, 193, 195, 0.8), rgba(253, 187, 45, 0.8))",
backdropFilter: "blur(10px)",
borderRadius: "16px",
boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
padding: "16px",
border: "2px solid rgba(255, 255, 255, 0.5)", // Distinct white border for contrast
outline: "3px solid rgba(34, 193, 195, 0.3)", // Subtle glow effect for prominence
color: "#ffffff", // Text color for readability
fontWeight: "bold",
textAlign: "center",
transition: "transform 0.3s ease, box-shadow 0.3s ease, outline 0.3s ease",
":hover": {
  transform: "scale(1.04)",
  boxShadow: "0 12px 36px rgba(0, 0, 0, 0.25)",
  outline: "3px solid rgba(253, 187, 45, 0.5)", // Glow changes to match hover gradient

},

      }}
    >
      <Box sx={{ p: 0 }}> {/* Minimal padding for compact layout */}
  <Typography 
    variant="subtitle2" 
    gutterBottom 
    sx={{ fontSize:20, fontWeight: 600, textAlign: "center", mb: 1.5 }}
  > {/* Smaller and centered title */}
    Sustainability Layers
  </Typography>
  <List dense sx={{ p: 0 }}> {/* Dense and padding-less list */}
    {layers.map((layer) => (
      <ListItem
        key={layer.id}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: activeLayers[layer.id] ? "pointer" : "default",
          bgcolor: visibleMapLayer === layer.id ? "rgba(0, 128, 0, 0.08)" : "transparent", // Subtle green highlight
          borderRadius: "8px", // Rounded corners for a modern look
          py: 0.25, // Tight vertical padding
          px: 0.5, // Tight horizontal padding
          mb: 0.5, // Small margin between items
          "&:hover": {
            bgcolor: "rgba(0, 128, 0, 0.1)", // Slightly darker hover effect
          },
        }}
        onClick={(e) => {
          if (!e.target.closest(".MuiSwitch-root") && activeLayers[layer.id]) {
            handleLayerClick(layer.id);
          }
        }}
      >
        <ListItemIcon sx={{ minWidth: 28, color: "rgb(255, 255, 255)" }}> {/* Smaller and themed icon */}
          {layer.icon}
        </ListItemIcon>
        <ListItemText
          primary={layer.name}
          primaryTypographyProps={{
            variant: "body2", // Compact text size
            sx: { color: "#333", fontWeight: 500 },
          }}
        />
        <Switch
          className="MuiSwitch-root"
          edge="end"
          size="small" // Compact switch
          checked={activeLayers[layer.id]}
          onChange={() => handleToggleLayer(layer.id)}
          sx={{
            "& .MuiSwitch-thumb": { backgroundColor: "#22C1C3" }, // Vibrant thumb color
            "& .MuiSwitch-track": { backgroundColor: "rgba(34, 193, 195, 0.4)" }, // Soft gradient track
          }}
        />
      </ListItem>
    ))}
  </List>
</Box>

    </Paper>
  );
};

export default LayerControlPanel;
