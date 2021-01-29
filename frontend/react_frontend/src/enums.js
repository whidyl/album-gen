export const BlendingModeEnum = {
    DODGE: "Dodge", 
    ADDITION: "Addition", 
    OVERLAY: "Overlay", 
    GRAIN_EXTRACT: "Grain Extract", 
    DARKEN_ONLY: "Darken Only",
    SCREEN: "Screen",
    DIVIDE: "Divide",
    GRAIN_MERGE: "Grain Merge",
    DIFFERENCE: "Difference",
    MULTIPLY: "Multiply",
    SOFT_LIGHT: "Soft Light",
    HARD_LIGHT: "Hard Light",
    LIGHTEN_ONLY: "Lighten Only",
    NONE:"None"
  };

  
export const FilterEnum = {
  BRIGHT: "Bright", 
  BLACK_AND_WHITE: "blackAndWhite", 
  EDGE_DETECTOR: "edgeDetector", 
  NONE: "none"
};

export const SizeEnum = {
  _1280x1280: "1280x1280", 
  _1024x768: "1024x768", 
  _768x1024: "768x1024", 
};

Object.freeze(BlendingModeEnum);
Object.freeze(FilterEnum);
Object.freeze(SizeEnum);

export default BlendingModeEnum;
