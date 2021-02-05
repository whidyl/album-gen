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
  INVERT: "Invert", 
  POSTERIZE: "Posterize", 
  POSTERIZE2: "Posterize 2", 
  SOLARIZE: "Solarize",
  EMBOSS: "Emboss",
  GAUSSIAN: "Gaussian Blur",
  FIND_EDGES: "Find Edges",
  NONE: "None"
};

export const SizeEnum = {
  _1280x1280: "1280x1280", 
  _1024x768: "1024x768", 
  _768x1024: "768x1024",
  _1600x900: "1600x900",
  none: "any"
};

export const goodSearchTerms = ['fire', 'lightning', 'rapper', 'explosion', 'abstract', 'painting', 'portrait', 'aesthetic',
'rainbow', 'colorful', 'texture', 'landscape', 'trees', 'nature texture', 'fire-texture', 'crowd',
'architecture', 'industrial', 'fractal', 'aesthetic texture', 'stunning space', 'psychedelic',
'abstract dark', 'wallpaper', 'light streaks', 'gradient', 'overlay texture', 'sunset', 'sky',
'water texture', 'statue', 'urban', 'floral',
'streetwear', 'wildlife', 'cyberpunk', 'night city', 'liquid', 'fireworks', 'galaxy', 'spider web',
'pattern', 'fabric', 'microscopic', 'stars', 'jellyfish', 'optical illusion', 'lightning storm',
'waterfall', 'grunge', 'incredible view', 'festival night', 'fire breather', 'iridescent sky',
'abstract wallpaper', 'ice', 'fractal patterns', 'flower', 'bikini', 'earth', 'shark',
'reptile eye', 'bokeh', 'light show', 'drawing', 'black and white',
'purple', 'white', 'black']

Object.freeze(BlendingModeEnum);
Object.freeze(FilterEnum);
Object.freeze(SizeEnum);

export default BlendingModeEnum;
