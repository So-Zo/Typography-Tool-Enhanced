// Typography Toolkit - JavaScript
document.addEventListener('DOMContentLoaded', initApp);

// DOM Elements
const elements = {
  // Navigation
  navButtons: document.querySelectorAll('.nav-btn'),
  toolSections: document.querySelectorAll('.tool-section'),
  
  // Font Pairing Elements
  headingFontDisplay: document.getElementById('heading-font-display'),
  bodyFontDisplay: document.getElementById('body-font-display'),
  previewHeading: document.querySelector('.preview-heading'),
  previewBody: document.querySelector('.preview-body'),
  preview: document.getElementById('preview'),
  shuffleHeadingBtn: document.getElementById('shuffle-heading'),
  shuffleBodyBtn: document.getElementById('shuffle-body'),
  shuffleAllBtn: document.getElementById('shuffle-all'),
  headingFontSelect: document.getElementById('heading-font-select'),
  bodyFontSelect: document.getElementById('body-font-select'),
  headingCategories: document.getElementById('heading-categories'),
  bodyCategories: document.getElementById('body-categories'),
  
  // Typography Control Elements
  headingWeight: document.getElementById('heading-weight'),
  bodyWeight: document.getElementById('body-weight'),
  headingWeightValue: document.getElementById('heading-weight-value'),
  bodyWeightValue: document.getElementById('body-weight-value'),
  
  headingLetterSpacing: document.getElementById('heading-letter-spacing'),
  bodyLetterSpacing: document.getElementById('body-letter-spacing'),
  headingLetterSpacingValue: document.getElementById('heading-letter-spacing-value'),
  bodyLetterSpacingValue: document.getElementById('body-letter-spacing-value'),
  
  headingWordSpacing: document.getElementById('heading-word-spacing'),
  bodyWordSpacing: document.getElementById('body-word-spacing'),
  headingWordSpacingValue: document.getElementById('heading-word-spacing-value'),
  bodyWordSpacingValue: document.getElementById('body-word-spacing-value'),
  
  headingLineHeight: document.getElementById('heading-line-height'),
  bodyLineHeight: document.getElementById('body-line-height'),
  headingLineHeightValue: document.getElementById('heading-line-height-value'),
  bodyLineHeightValue: document.getElementById('body-line-height-value'),
  
  headingSize: document.getElementById('heading-size'),
  bodySize: document.getElementById('body-size'),
  headingSizeValue: document.getElementById('heading-size-value'),
  bodySizeValue: document.getElementById('body-size-value'),
  
  headingTransform: document.getElementById('heading-transform'),
  bodyTransform: document.getElementById('body-transform'),
  
  alignmentButtons: document.querySelectorAll('.align-btn'),
  resetTypographyBtn: document.getElementById('reset-typography'),
  
  // Status message
  status: document.getElementById('status')
};

// Application State
const state = {
  // Core font settings
  headingFont: 'Hubot Sans',
  bodyFont: 'Hubot Sans',
  headingWeight: '700',
  bodyWeight: '400',
  headingCategory: 'all',
  bodyCategory: 'all',
  
  // Typography controls
  typography: {
    headingWeight: 700,
    bodyWeight: 400,
    headingLetterSpacing: 0,
    bodyLetterSpacing: 0,
    headingWordSpacing: 0,
    bodyWordSpacing: 0,
    headingLineHeight: 1.2,
    bodyLineHeight: 1.6,
    headingSize: 2.5,
    bodySize: 1.125,
    headingTransform: 'none',
    bodyTransform: 'none',
    textAlign: 'left'
  }
};

// Font Categories
const fonts = {
  'serif': [
    'Merriweather', 'Playfair Display', 'Lora', 'Libre Baskerville', 'Source Serif Pro',
    'EB Garamond', 'Crimson Text', 'Noto Serif', 'Bitter', 'Cormorant Garamond',
    'Crimson Pro', 'Literata', 'Spectral', 'Vollkorn', 'Arvo'
  ],
  'sans-serif': [
    'Hubot Sans', 'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Raleway', 'Source Sans Pro',
    'Nunito', 'Rubik', 'Work Sans', 'Poppins', 'Public Sans', 'DM Sans', 'Figtree',
    'IBM Plex Sans', 'Oxygen', 'PT Sans', 'Nunito Sans', 'Outfit'
  ],
  'display': [
    'Bebas Neue', 'Abril Fatface', 'Pacifico', 'Permanent Marker', 'Alfa Slab One', 'Lobster', 
    'Righteous', 'Bungee', 'Fredoka One', 'Secular One', 'Titan One', 'Satisfy', 
    'Patua One', 'Comfortaa', 'Shadows Into Light', 'Passion One'
  ]
};

// Preview text options
const previewMessages = [
  {
    heading: 'Typography is what language looks like.',
    body: 'Good typography establishes a visual hierarchy for meaning by contrasting styles and sizes. A great font combination creates harmony between elements while ensuring readability and appropriate emphasis.'
  },
  {
    heading: 'Design is intelligence made visible.',
    body: 'Typography is a fundamental design element that shapes how users perceive your content. Proper font pairings enhance readability and establish information hierarchy. Design choices affect how users interpret and engage with information.'
  },
  {
    heading: 'Readability is accessibility.',
    body: 'When choosing fonts, consider legibility across different screen sizes and contexts. Proper font pairing improves user experience and helps convey your message effectively. Good typography ensures that your content is accessible to all users.'
  },
  {
    heading: 'Typography is to literature what musical performance is to composition.',
    body: 'Just as a musician interprets a score, typography gives visual form to written content. Well-paired fonts create rhythm and harmony that enhance the reading experience. The choices you make with typography can transform how your message is received.'
  }
];

// Typography default values (for reset)
const typographyDefaults = {
  headingWeight: 700,
  bodyWeight: 400,
  headingLetterSpacing: 0,
  bodyLetterSpacing: 0,
  headingWordSpacing: 0,
  bodyWordSpacing: 0,
  headingLineHeight: 1.2,
  bodyLineHeight: 1.6,
  headingSize: 2.5,
  bodySize: 1.125,
  headingTransform: 'none',
  bodyTransform: 'none',
  textAlign: 'left'
};

// Functions

/**
 * Shows a status message
 * @param {string} message - The message to display
 */
function showStatus(message) {
  elements.status.textContent = message;
  elements.status.classList.add('active');
  
  setTimeout(() => {
    elements.status.classList.remove('active');
  }, 2500);
}

/**
 * Loads a Google Font
 * @param {string} fontName - The name of the font to load
 * @param {string} weight - Font weights to load (comma-separated)
 * @returns {Promise} - Promise that resolves when font is loaded
 */
function loadFont(fontName, weight = '400,700') {
  return new Promise((resolve) => {
    const formattedName = fontName.replace(/\s+/g, '+');
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${formattedName}:wght@${weight}&display=swap`;
    link.rel = 'stylesheet';
    
    link.onload = () => {
      // Give browser some time to process the font
      setTimeout(resolve, 100);
    };
    
    link.onerror = () => {
      console.error(`Failed to load font: ${fontName}`);
      resolve(); // Resolve anyway to prevent blocking
    };
    
    document.head.appendChild(link);
  });
}

/**
 * Populates select dropdowns with font options
 * @param {HTMLSelectElement} selectElement - The select element to populate
 * @param {string} category - The font category to filter by
 */
function populateSelectOptions(selectElement, category = 'all') {
  if (!selectElement) return;
  
  // Clear existing options
  selectElement.innerHTML = '';
  
  // Get fonts based on category
  let fontList = [];
  if (category === 'all') {
    Object.values(fonts).forEach(list => {
      fontList = [...fontList, ...list];
    });
  } else {
    fontList = fonts[category] || [];
  }
  
  // Sort alphabetically
  fontList.sort();
  
  // Add options to select element
  fontList.forEach(font => {
    const option = document.createElement('option');
    option.value = font;
    option.textContent = font;
    selectElement.appendChild(option);
  });
}

/**
 * Gets a random font from a specific category
 * @param {string} category - The font category
 * @returns {string} - A random font name
 */
function getRandomFont(category = 'all') {
  let fontList = [];
  
  if (category === 'all') {
    Object.values(fonts).forEach(list => {
      fontList = [...fontList, ...list];
    });
  } else {
    fontList = fonts[category] || [];
  }
  
  const randomIndex = Math.floor(Math.random() * fontList.length);
  return fontList[randomIndex] || 'Inter'; // Fallback to Inter if something goes wrong
}

/**
 * Updates the preview with current fonts and typography settings
 */
async function updatePreview() {
  // Load fonts if needed
  await Promise.all([
    loadFont(state.headingFont, state.headingWeight),
    loadFont(state.bodyFont, state.bodyWeight)
  ]);
  
  // Update font displays
  if (elements.headingFontDisplay) {
    elements.headingFontDisplay.textContent = state.headingFont;
  }
  
  if (elements.bodyFontDisplay) {
    elements.bodyFontDisplay.textContent = state.bodyFont;
  }
  
  // Update CSS variables for font families
  document.documentElement.style.setProperty('--heading-font', `"${state.headingFont}", ${getGenericFamily(state.headingFont)}`);
  document.documentElement.style.setProperty('--body-font', `"${state.bodyFont}", ${getGenericFamily(state.bodyFont)}`);
  
  // Update typography properties for heading
  if (elements.previewHeading) {
    elements.previewHeading.style.fontWeight = state.typography.headingWeight;
    elements.previewHeading.style.letterSpacing = `${state.typography.headingLetterSpacing}em`;
    elements.previewHeading.style.wordSpacing = `${state.typography.headingWordSpacing}em`;
    elements.previewHeading.style.lineHeight = state.typography.headingLineHeight;
    elements.previewHeading.style.fontSize = `${state.typography.headingSize}rem`;
    elements.previewHeading.style.textTransform = state.typography.headingTransform;
  }
  
  // Update typography properties for body
  if (elements.previewBody) {
    elements.previewBody.style.fontWeight = state.typography.bodyWeight;
    elements.previewBody.style.letterSpacing = `${state.typography.bodyLetterSpacing}em`;
    elements.previewBody.style.wordSpacing = `${state.typography.bodyWordSpacing}em`;
    elements.previewBody.style.lineHeight = state.typography.bodyLineHeight;
    elements.previewBody.style.fontSize = `${state.typography.bodySize}rem`;
    elements.previewBody.style.textTransform = state.typography.bodyTransform;
  }
  
  // Update text alignment for preview
  if (elements.preview) {
    elements.preview.style.textAlign = state.typography.textAlign;
  }
  
  // Update select values
  if (elements.headingFontSelect) {
    const headingOption = Array.from(elements.headingFontSelect.options).find(opt => opt.value === state.headingFont);
    if (headingOption) {
      elements.headingFontSelect.value = state.headingFont;
    }
  }
  
  if (elements.bodyFontSelect) {
    const bodyOption = Array.from(elements.bodyFontSelect.options).find(opt => opt.value === state.bodyFont);
    if (bodyOption) {
      elements.bodyFontSelect.value = state.bodyFont;
    }
  }
}

/**
 * Gets the generic font family for a font
 * @param {string} fontName - The name of the font
 * @returns {string} - The generic font family (serif, sans-serif, etc.)
 */
function getGenericFamily(fontName) {
  if (fonts['serif'].includes(fontName)) return 'serif';
  if (fonts['sans-serif'].includes(fontName)) return 'sans-serif';
  if (fonts['display'].includes(fontName)) return 'cursive';
  return 'sans-serif'; // Default fallback
}

/**
 * Shuffles the heading font
 */
async function shuffleHeadingFont() {
  const prevFont = state.headingFont;
  
  // Get a random font that's different from current
  do {
    state.headingFont = getRandomFont(state.headingCategory);
  } while (state.headingFont === prevFont && Object.values(fonts).flat().length > 1);
  
  await updatePreview();
  showStatus(`Heading font: ${state.headingFont}`);
}

/**
 * Shuffles the body font
 */
async function shuffleBodyFont() {
  const prevFont = state.bodyFont;
  
  // Get a random font that's different from current
  do {
    state.bodyFont = getRandomFont(state.bodyCategory);
  } while (state.bodyFont === prevFont && Object.values(fonts).flat().length > 1);
  
  await updatePreview();
  showStatus(`Body font: ${state.bodyFont}`);
}

/**
 * Shuffles both heading and body fonts
 */
async function shuffleBothFonts() {
  // Changing simultaneously so we don't need to check if they're the same
  state.headingFont = getRandomFont(state.headingCategory);
  state.bodyFont = getRandomFont(state.bodyCategory);
  
  await updatePreview();
  cyclePreviewText();
  showStatus(`Fonts updated: ${state.headingFont} + ${state.bodyFont}`);
}

/**
 * Cycles through preview text options
 */
function cyclePreviewText() {
  const randomIndex = Math.floor(Math.random() * previewMessages.length);
  const message = previewMessages[randomIndex];
  
  if (elements.previewHeading && elements.previewBody) {
    // Reset animations
    elements.previewHeading.style.animation = 'none';
    elements.previewBody.style.animation = 'none';
    
    // Force reflow
    void elements.previewHeading.offsetWidth;
    void elements.previewBody.offsetWidth;
    
    // Set content
    elements.previewHeading.textContent = message.heading;
    elements.previewBody.textContent = message.body;
    
    // Restore animations
    elements.previewHeading.style.animation = 'fadeUp 0.5s ease forwards';
    elements.previewBody.style.animation = 'fadeUp 0.5s 0.1s ease forwards';
  }
}

/**
 * Preloads common fonts for faster rendering
 */
async function preloadCommonFonts() {
  const commonFonts = [
    'Inter', 'Roboto', 'Playfair Display', 'Lora', 'Merriweather',
    'Source Serif Pro', 'Montserrat', 'Hubot Sans'
  ];
  
  await Promise.all(commonFonts.map(font => loadFont(font)));
  console.log('Common fonts preloaded');
}

/**
 * Sets up category selection event listeners
 */
function setupCategoryEventListeners() {
  // Heading category buttons
  if (elements.headingCategories) {
    elements.headingCategories.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        elements.headingCategories.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update state and repopulate dropdown
        state.headingCategory = btn.dataset.category;
        populateSelectOptions(elements.headingFontSelect, state.headingCategory);
        
        // Update preview with a font from the new category
        shuffleHeadingFont();
      });
    });
  }
  
  // Body category buttons
  if (elements.bodyCategories) {
    elements.bodyCategories.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        elements.bodyCategories.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update state and repopulate dropdown
        state.bodyCategory = btn.dataset.category;
        populateSelectOptions(elements.bodyFontSelect, state.bodyCategory);
        
        // Update preview with a font from the new category
        shuffleBodyFont();
      });
    });
  }
}

/**
 * Updates the value display for a given input element
 * @param {HTMLInputElement} input - The input element
 * @param {HTMLElement} display - The display element
 * @param {string} unit - The unit to append (optional)
 */
function updateValueDisplay(input, display, unit = '') {
  if (input && display) {
    display.textContent = `${input.value}${unit}`;
  }
}

/**
 * Sets up typography control event listeners
 */
function setupTypographyControls() {
  // Font Weight Controls
  if (elements.headingWeight) {
    elements.headingWeight.addEventListener('input', () => {
      state.typography.headingWeight = elements.headingWeight.value;
      updateValueDisplay(elements.headingWeight, elements.headingWeightValue);
      updatePreview();
    });
  }
  
  if (elements.bodyWeight) {
    elements.bodyWeight.addEventListener('input', () => {
      state.typography.bodyWeight = elements.bodyWeight.value;
      updateValueDisplay(elements.bodyWeight, elements.bodyWeightValue);
      updatePreview();
    });
  }
  
  // Letter Spacing Controls
  if (elements.headingLetterSpacing) {
    elements.headingLetterSpacing.addEventListener('input', () => {
      state.typography.headingLetterSpacing = elements.headingLetterSpacing.value;
      updateValueDisplay(elements.headingLetterSpacing, elements.headingLetterSpacingValue, 'em');
      updatePreview();
    });
  }
  
  if (elements.bodyLetterSpacing) {
    elements.bodyLetterSpacing.addEventListener('input', () => {
      state.typography.bodyLetterSpacing = elements.bodyLetterSpacing.value;
      updateValueDisplay(elements.bodyLetterSpacing, elements.bodyLetterSpacingValue, 'em');
      updatePreview();
    });
  }
  
  // Word Spacing Controls
  if (elements.headingWordSpacing) {
    elements.headingWordSpacing.addEventListener('input', () => {
      state.typography.headingWordSpacing = elements.headingWordSpacing.value;
      updateValueDisplay(elements.headingWordSpacing, elements.headingWordSpacingValue, 'em');
      updatePreview();
    });
  }
  
  if (elements.bodyWordSpacing) {
    elements.bodyWordSpacing.addEventListener('input', () => {
      state.typography.bodyWordSpacing = elements.bodyWordSpacing.value;
      updateValueDisplay(elements.bodyWordSpacing, elements.bodyWordSpacingValue, 'em');
      updatePreview();
    });
  }
  
  // Line Height Controls
  if (elements.headingLineHeight) {
    elements.headingLineHeight.addEventListener('input', () => {
      state.typography.headingLineHeight = elements.headingLineHeight.value;
      updateValueDisplay(elements.headingLineHeight, elements.headingLineHeightValue);
      updatePreview();
    });
  }
  
  if (elements.bodyLineHeight) {
    elements.bodyLineHeight.addEventListener('input', () => {
      state.typography.bodyLineHeight = elements.bodyLineHeight.value;
      updateValueDisplay(elements.bodyLineHeight, elements.bodyLineHeightValue);
      updatePreview();
    });
  }
  
  // Font Size Controls
  if (elements.headingSize) {
    elements.headingSize.addEventListener('input', () => {
      state.typography.headingSize = elements.headingSize.value;
      updateValueDisplay(elements.headingSize, elements.headingSizeValue, 'rem');
      updatePreview();
    });
  }
  
  if (elements.bodySize) {
    elements.bodySize.addEventListener('input', () => {
      state.typography.bodySize = elements.bodySize.value;
      updateValueDisplay(elements.bodySize, elements.bodySizeValue, 'rem');
      updatePreview();
    });
  }
  
  // Text Transform Controls
  if (elements.headingTransform) {
    elements.headingTransform.addEventListener('change', () => {
      state.typography.headingTransform = elements.headingTransform.value;
      updatePreview();
    });
  }
  
  if (elements.bodyTransform) {
    elements.bodyTransform.addEventListener('change', () => {
      state.typography.bodyTransform = elements.bodyTransform.value;
      updatePreview();
    });
  }
  
  // Text Alignment Controls
  if (elements.alignmentButtons) {
    elements.alignmentButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        elements.alignmentButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update state and preview
        state.typography.textAlign = btn.dataset.align;
        updatePreview();
      });
    });
  }
  
  // Reset Typography Button
  if (elements.resetTypographyBtn) {
    elements.resetTypographyBtn.addEventListener('click', resetTypographyControls);
  }
}

/**
 * Resets all typography controls to default values
 */
function resetTypographyControls() {
  // Reset state
  state.typography = { ...typographyDefaults };
  
  // Reset control values
  if (elements.headingWeight) {
    elements.headingWeight.value = state.typography.headingWeight;
    updateValueDisplay(elements.headingWeight, elements.headingWeightValue);
  }
  
  if (elements.bodyWeight) {
    elements.bodyWeight.value = state.typography.bodyWeight;
    updateValueDisplay(elements.bodyWeight, elements.bodyWeightValue);
  }
  
  if (elements.headingLetterSpacing) {
    elements.headingLetterSpacing.value = state.typography.headingLetterSpacing;
    updateValueDisplay(elements.headingLetterSpacing, elements.headingLetterSpacingValue, 'em');
  }
  
  if (elements.bodyLetterSpacing) {
    elements.bodyLetterSpacing.value = state.typography.bodyLetterSpacing;
    updateValueDisplay(elements.bodyLetterSpacing, elements.bodyLetterSpacingValue, 'em');
  }
  
  if (elements.headingWordSpacing) {
    elements.headingWordSpacing.value = state.typography.headingWordSpacing;
    updateValueDisplay(elements.headingWordSpacing, elements.headingWordSpacingValue, 'em');
  }
  
  if (elements.bodyWordSpacing) {
    elements.bodyWordSpacing.value = state.typography.bodyWordSpacing;
    updateValueDisplay(elements.bodyWordSpacing, elements.bodyWordSpacingValue, 'em');
  }
  
  if (elements.headingLineHeight) {
    elements.headingLineHeight.value = state.typography.headingLineHeight;
    updateValueDisplay(elements.headingLineHeight, elements.headingLineHeightValue);
  }
  
  if (elements.bodyLineHeight) {
    elements.bodyLineHeight.value = state.typography.bodyLineHeight;
    updateValueDisplay(elements.bodyLineHeight, elements.bodyLineHeightValue);
  }
  
  if (elements.headingSize) {
    elements.headingSize.value = state.typography.headingSize;
    updateValueDisplay(elements.headingSize, elements.headingSizeValue, 'rem');
  }
  
  if (elements.bodySize) {
    elements.bodySize.value = state.typography.bodySize;
    updateValueDisplay(elements.bodySize, elements.bodySizeValue, 'rem');
  }
  
  if (elements.headingTransform) {
    elements.headingTransform.value = state.typography.headingTransform;
  }
  
  if (elements.bodyTransform) {
    elements.bodyTransform.value = state.typography.bodyTransform;
  }
  
  // Reset alignment buttons
  if (elements.alignmentButtons) {
    elements.alignmentButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.align === state.typography.textAlign) {
        btn.classList.add('active');
      }
    });
  }
  
  // Update preview
  updatePreview();
  showStatus('Typography settings reset to defaults');
}

/**
 * Sets up navigation between tool sections
 */
function setupNavigation() {
  if (elements.navButtons && elements.toolSections) {
    elements.navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTool = btn.dataset.tool;
        
        // Update active button
        elements.navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show target section, hide others
        elements.toolSections.forEach(section => {
          section.classList.remove('active');
          if (section.id === targetTool) {
            section.classList.add('active');
          }
        });
      });
    });
  }
}

/**
 * Initialize the application
 */
function initApp() {
  // Set up navigation
  setupNavigation();
  
  // Font Pairing Functionality
  populateSelectOptions(elements.headingFontSelect);
  populateSelectOptions(elements.bodyFontSelect);
  
  // Set up font pairing event listeners
  if (elements.shuffleHeadingBtn) {
    elements.shuffleHeadingBtn.addEventListener('click', shuffleHeadingFont);
  }
  
  if (elements.shuffleBodyBtn) {
    elements.shuffleBodyBtn.addEventListener('click', shuffleBodyFont);
  }
  
  if (elements.shuffleAllBtn) {
    elements.shuffleAllBtn.addEventListener('click', shuffleBothFonts);
  }
  
  // Font select dropdowns
  if (elements.headingFontSelect) {
    elements.headingFontSelect.addEventListener('change', (e) => {
      state.headingFont = e.target.value;
      updatePreview();
      showStatus(`Heading font: ${state.headingFont}`);
    });
  }
  
  if (elements.bodyFontSelect) {
    elements.bodyFontSelect.addEventListener('change', (e) => {
      state.bodyFont = e.target.value;
      updatePreview();
      showStatus(`Body font: ${state.bodyFont}`);
    });
  }
  
  // Set up category buttons
  setupCategoryEventListeners();
  
  // Set up typography controls
  setupTypographyControls();
  
  // Initialize typography control displays
  updateValueDisplay(elements.headingWeight, elements.headingWeightValue);
  updateValueDisplay(elements.bodyWeight, elements.bodyWeightValue);
  updateValueDisplay(elements.headingLetterSpacing, elements.headingLetterSpacingValue, 'em');
  updateValueDisplay(elements.bodyLetterSpacing, elements.bodyLetterSpacingValue, 'em');
  updateValueDisplay(elements.headingWordSpacing, elements.headingWordSpacingValue, 'em');
  updateValueDisplay(elements.bodyWordSpacing, elements.bodyWordSpacingValue, 'em');
  updateValueDisplay(elements.headingLineHeight, elements.headingLineHeightValue);
  updateValueDisplay(elements.bodyLineHeight, elements.bodyLineHeightValue);
  updateValueDisplay(elements.headingSize, elements.headingSizeValue, 'rem');
  updateValueDisplay(elements.bodySize, elements.bodySizeValue, 'rem');
  
  // Set up keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Only trigger if not in an input or textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
      return;
    }
    
    switch (e.key.toLowerCase()) {
      case 's':
        shuffleBothFonts();
        break;
      case 'h':
        shuffleHeadingFont();
        break;
      case 'b':
        shuffleBodyFont();
        break;
      case 'r':
        resetTypographyControls();
        break;
    }
  });
  
  // Preload common fonts and initialize preview
  preloadCommonFonts().then(() => {
    updatePreview();
    
    // Load default fonts for initial rendering
    loadFont(state.headingFont, state.headingWeight);
    loadFont(state.bodyFont, state.bodyWeight);
  });
}