// Track loaded fonts to avoid reloading
const loadedFonts = new Map();

// Elements
interface FontElements {
  headingFontDisplay: HTMLElement | null;
  bodyFontDisplay: HTMLElement | null;
  previewHeading: HTMLElement | null;
  previewBody: HTMLElement | null;
  shuffleHeadingBtn: HTMLElement | null;
  shuffleBodyBtn: HTMLElement | null;
  shuffleAllBtn: HTMLElement | null;
  headingFontSelect: HTMLSelectElement | null;
  bodyFontSelect: HTMLSelectElement | null;
  headingCategories: HTMLElement | null;
  bodyCategories: HTMLElement | null;
  status: HTMLElement | null;
}

let elements: FontElements = {
  headingFontDisplay: null,
  bodyFontDisplay: null,
  previewHeading: null,
  previewBody: null,
  shuffleHeadingBtn: null,
  shuffleBodyBtn: null,
  shuffleAllBtn: null,
  headingFontSelect: null,
  bodyFontSelect: null,
  headingCategories: null,
  bodyCategories: null,
  status: null
};

// State
interface FontState {
  headingFont: string;
  bodyFont: string;
  headingWeight: string;
  bodyWeight: string;
  headingCategory: string;
  bodyCategory: string;
}

const state: FontState = {
  headingFont: "Hubot Sans",
  bodyFont: "Hubot Sans",
  headingWeight: "700",
  bodyWeight: "400",
  headingCategory: "all",
  bodyCategory: "all"
};

// Font data - all available on Google Fonts
interface Fonts {
  [key: string]: string[];
}

const fonts: Fonts = {
  "sans-serif": [
    "Hubot Sans",
    "Inter",
    "Roboto",
    "Montserrat",
    "Poppins",
    "Open Sans",
    "Raleway",
    "Work Sans",
    "Nunito",
    "Quicksand",
    "DM Sans",
    "Manrope",
    "Karla",
    "Outfit",
    "Rubik",
    "Oxygen",
    "Exo",
    "Mulish",
    "Heebo",
    "Asap",
    "Barlow",
    "Catamaran",
    "Saira",
    "Titillium Web",
    "Yantramanav",
    "Hind",
    "Monda",
    "Chivo",
    "Varela Round",
    "Questrial",
    "Exo 2",
    "Urbanist",
    "Raleway Dots",
    "Red Hat Display"
  ],
  serif: [
    "Playfair Display",
    "Lora",
    "Merriweather",
    "Source Serif Pro",
    "Libre Baskerville",
    "Crimson Text",
    "EB Garamond",
    "Cormorant Garamond",
    "Bitter",
    "Spectral",
    "Noto Serif",
    "Cardo",
    "IBM Plex Serif",
    "Lusitana",
    "Zilla Slab",
    "Tinos",
    "Arvo",
    "Alegreya",
    "Neuton",
    "PT Serif",
    "Prata",
    "Gloock",
    "Alice",
    "Lustria",
    "Rosarivo",
    "Cormorant SC",
    "Neucha",
    "Tienne"
  ],
  display: [
    "Oswald",
    "Archivo Black",
    "Bebas Neue",
    "Righteous",
    "Anton",
    "Fjalla One",
    "Staatliches",
    "Alfa Slab One",
    "Comfortaa",
    "Josefin Sans",
    "Paytone One",
    "Secular One",
    "Shrikhand",
    "Ultra",
    "Sacramento",
    "Fredoka One",
    "Lilita One",
    "Fugaz One",
    "Bungee",
    "Bungee Shade",
    "Monoton",
    "Caveat",
    "Permanent Marker",
    "Satisfy",
    "Lobster",
    "Pacifico"
  ]
};

// Show status message
function showStatus(message: string): void {
  if (!elements.status) return;
  
  elements.status.textContent = message;
  elements.status.classList.add("active");

  // Remove active class after animation completes
  setTimeout(() => {
    elements.status?.classList.remove("active");
  }, 2500);
}

// Load font using WebFontLoader to ensure proper font loading
function loadFont(fontName: string, weight = "400,700"): Promise<void> {
  return new Promise((resolve) => {
    // Don't reload already loaded fonts
    if (loadedFonts.has(fontName)) {
      return resolve();
    }

    // Handle Hubot Sans specially
    if (fontName === "Hubot Sans") {
      loadedFonts.set(fontName, true);
      return resolve();
    }

    // Format font name for Google Fonts
    const formattedName = fontName.replace(/\s+/g, "+");

    // Load new font
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${formattedName}:wght@${weight}&display=swap`;
    document.head.appendChild(link);

    // Create a test element to check when font is loaded
    const testElement = document.createElement("span");
    testElement.style.fontFamily = `'${fontName}', sans-serif`;
    testElement.style.position = "absolute";
    testElement.style.visibility = "hidden";
    testElement.textContent = "Font Test";
    document.body.appendChild(testElement);

    // Check if font is loaded - simple timeout approach
    setTimeout(() => {
      document.body.removeChild(testElement);
      loadedFonts.set(fontName, true);
      resolve();
    }, 500); // Allow 500ms for font to load
  });
}

// Populate font select options
function populateSelectOptions(selectElement: HTMLSelectElement | null, category = "all"): void {
  if (!selectElement) return;
  
  // Clear existing options
  selectElement.innerHTML = "";

  // Add default Hubot Sans option
  const defaultOption = document.createElement("option");
  defaultOption.value = "Hubot Sans";
  defaultOption.textContent = "Hubot Sans";
  selectElement.appendChild(defaultOption);

  // Determine which fonts to show based on category
  let fontsToAdd: string[] = [];
  if (category === "all") {
    // Combine all font categories
    Object.values(fonts).forEach(fontArray => {
      fontsToAdd = [...fontsToAdd, ...fontArray];
    });
  } else {
    fontsToAdd = fonts[category] || [];
  }

  // Remove Hubot Sans if it's in the list to avoid duplication
  fontsToAdd = fontsToAdd.filter(font => font !== "Hubot Sans");

  // Sort alphabetically
  fontsToAdd.sort();

  // Add options
  fontsToAdd.forEach(font => {
    const option = document.createElement("option");
    option.value = font;
    option.textContent = font;
    selectElement.appendChild(option);
  });
}

// Get random font based on category
function getRandomFont(category = "all"): string {
  if (category === "all") {
    const categories = Object.keys(fonts);
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const fontList = fonts[randomCategory];
    return fontList[Math.floor(Math.random() * fontList.length)];
  } else {
    const fontList = fonts[category] || [];
    if (fontList.length === 0) return "Hubot Sans";
    return fontList[Math.floor(Math.random() * fontList.length)];
  }
}

// Update preview
async function updatePreview(): Promise<void> {
  // Show loading status
  showStatus("Loading fonts...");

  try {
    // Load fonts if needed
    await Promise.all([
      loadFont(state.headingFont),
      loadFont(state.bodyFont)
    ]);

    // Update CSS variables - critical fix for applying fonts
    document.documentElement.style.setProperty(
      "--heading-font",
      `'${state.headingFont}', sans-serif`
    );
    document.documentElement.style.setProperty(
      "--body-font",
      `'${state.bodyFont}', sans-serif`
    );

    // Update font displays
    if (elements.headingFontDisplay) {
      elements.headingFontDisplay.textContent = state.headingFont;
      elements.headingFontDisplay.style.fontFamily = `'${state.headingFont}', sans-serif`;
    }

    if (elements.bodyFontDisplay) {
      elements.bodyFontDisplay.textContent = state.bodyFont;
      elements.bodyFontDisplay.style.fontFamily = `'${state.bodyFont}', sans-serif`;
    }

    // Update preview text styling directly
    if (elements.previewHeading) {
      elements.previewHeading.style.fontFamily = `'${state.headingFont}', sans-serif`;
    }
    
    if (elements.previewBody) {
      elements.previewBody.style.fontFamily = `'${state.bodyFont}', sans-serif`;
    }

    // Animation reset
    if (elements.previewHeading && elements.previewBody) {
      elements.previewHeading.style.animation = "none";
      elements.previewBody.style.animation = "none";
      void document.getElementById("preview")?.offsetWidth; // Force reflow
      elements.previewHeading.style.animation = "fadeUp 0.5s ease forwards";
      elements.previewBody.style.animation =
        "fadeUp 0.5s 0.1s ease forwards";
    }

    // Update font selects to match current state
    if (elements.headingFontSelect && elements.bodyFontSelect) {
      elements.headingFontSelect.value = state.headingFont;
      elements.bodyFontSelect.value = state.bodyFont;
    }

    showStatus("Fonts updated successfully");
  } catch (error) {
    console.error("Error updating fonts:", error);
    showStatus("Error loading fonts. Using fallback.");
  }
}

// Shuffle functions with visual feedback
export async function shuffleHeadingFont(): Promise<void> {
  const oldFont = state.headingFont;
  state.headingFont = getRandomFont(state.headingCategory);

  // Ensure we get a different font
  if (
    state.headingFont === oldFont &&
    fonts[state.headingCategory || "sans-serif"].length > 1
  ) {
    state.headingFont = getRandomFont(state.headingCategory);
  }

  showStatus(`Heading font: ${state.headingFont}`);
  await updatePreview();
}

export async function shuffleBodyFont(): Promise<void> {
  const oldFont = state.bodyFont;
  state.bodyFont = getRandomFont(state.bodyCategory);

  // Ensure we get a different font
  if (
    state.bodyFont === oldFont &&
    fonts[state.bodyCategory || "sans-serif"].length > 1
  ) {
    state.bodyFont = getRandomFont(state.bodyCategory);
  }

  showStatus(`Body font: ${state.bodyFont}`);
  await updatePreview();
}

export async function shuffleBothFonts(): Promise<void> {
  const oldHeadingFont = state.headingFont;
  const oldBodyFont = state.bodyFont;

  state.headingFont = getRandomFont(state.headingCategory);
  state.bodyFont = getRandomFont(state.bodyCategory);

  // Ensure we get different fonts
  if (
    state.headingFont === oldHeadingFont &&
    fonts[state.headingCategory || "sans-serif"].length > 1
  ) {
    state.headingFont = getRandomFont(state.headingCategory);
  }

  if (
    state.bodyFont === oldBodyFont &&
    fonts[state.bodyCategory || "sans-serif"].length > 1
  ) {
    state.bodyFont = getRandomFont(state.bodyCategory);
  }

  showStatus(`New pair: ${state.headingFont} + ${state.bodyFont}`);
  await updatePreview();

  // Change text occasionally
  if (Math.random() > 0.5) {
    cyclePreviewText();
  }
}

// Preview text messages
interface PreviewMessage {
  heading: string;
  body: string;
}

const previewMessages: PreviewMessage[] = [
  {
    heading: "Typography is what language looks like.",
    body: "Good typography establishes a visual hierarchy for meaning by contrasting styles and sizes. A great font combination creates harmony between elements."
  },
  {
    heading: "Font pairing is both art and science.",
    body: "Finding the perfect balance between fonts is about creating contrast while maintaining harmony. Your headings and body text should complement each other."
  },
  {
    heading: "Great design begins with typography.",
    body: "The fonts you choose set the tone for your entire design. They convey personality, establish brand identity, and guide the reader's eye through your content."
  },
  {
    heading: "Clear typography makes clear thoughts.",
    body: "When fonts are paired well, the reader's mind can focus on the content rather than the form. Good typography becomes invisible in service of the message."
  },
  {
    heading: "Type is a voice that can speak in any language.",
    body: "The character of a typeface communicates as much as the words themselves. Choose fonts that express the right tone for your message."
  }
];

// Cycle preview text
function cyclePreviewText(): void {
  if (!elements.previewHeading || !elements.previewBody) return;
  
  const randomMessage =
    previewMessages[Math.floor(Math.random() * previewMessages.length)];
  elements.previewHeading.textContent = randomMessage.heading;
  elements.previewBody.textContent = randomMessage.body;
}

// Preload commonly used fonts
async function preloadCommonFonts(): Promise<void> {
  const commonFonts = [
    "Inter",
    "Roboto",
    "Montserrat",
    "Playfair Display",
    "Lora"
  ];

  try {
    await Promise.all(commonFonts.map(font => loadFont(font)));
    console.log("Common fonts preloaded");
  } catch (error) {
    console.error("Failed to preload some fonts:", error);
  }
}

// Set up event listeners for category buttons
export function setupCategoryEventListeners(): void {
  // Event listeners for heading categories
  if (elements.headingCategories) {
    Array.from(elements.headingCategories.children).forEach(button => {
      button.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        
        if (elements.headingCategories) {
          Array.from(elements.headingCategories.children).forEach(btn => {
            btn.classList.remove("active");
          });
        }
        
        target.classList.add("active");
        state.headingCategory = target.dataset.category || "all";
        
        if (elements.headingFontSelect) {
          populateSelectOptions(
            elements.headingFontSelect,
            state.headingCategory
          );
        }
        
        showStatus(`Category: ${state.headingCategory}`);
      });
    });
  }

  // Event listeners for body categories
  if (elements.bodyCategories) {
    Array.from(elements.bodyCategories.children).forEach(button => {
      button.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        
        if (elements.bodyCategories) {
          Array.from(elements.bodyCategories.children).forEach(btn => {
            btn.classList.remove("active");
          });
        }
        
        target.classList.add("active");
        state.bodyCategory = target.dataset.category || "all";
        
        if (elements.bodyFontSelect) {
          populateSelectOptions(
            elements.bodyFontSelect,
            state.bodyCategory
          );
        }
        
        showStatus(`Category: ${state.bodyCategory}`);
      });
    });
  }
}

// Initialize
export function initFontPair(): void {
  // Initialize element references
  elements = {
    headingFontDisplay: document.getElementById("heading-font-display"),
    bodyFontDisplay: document.getElementById("body-font-display"),
    previewHeading: document.querySelector(".preview-heading"),
    previewBody: document.querySelector(".preview-body"),
    shuffleHeadingBtn: document.getElementById("shuffle-heading"),
    shuffleBodyBtn: document.getElementById("shuffle-body"),
    shuffleAllBtn: document.getElementById("shuffle-all"),
    headingFontSelect: document.getElementById("heading-font-select") as HTMLSelectElement,
    bodyFontSelect: document.getElementById("body-font-select") as HTMLSelectElement,
    headingCategories: document.getElementById("heading-categories"),
    bodyCategories: document.getElementById("body-categories"),
    status: document.getElementById("status")
  };

  // Populate select options
  populateSelectOptions(elements.headingFontSelect);
  populateSelectOptions(elements.bodyFontSelect);

  // Event listener for heading font select
  elements.headingFontSelect?.addEventListener("change", e => {
    const target = e.target as HTMLSelectElement;
    state.headingFont = target.value;
    updatePreview();
  });

  // Event listener for body font select
  elements.bodyFontSelect?.addEventListener("change", e => {
    const target = e.target as HTMLSelectElement;
    state.bodyFont = target.value;
    updatePreview();
  });

  // Event listeners for shuffle buttons
  elements.shuffleHeadingBtn?.addEventListener(
    "click",
    shuffleHeadingFont
  );
  elements.shuffleBodyBtn?.addEventListener("click", shuffleBodyFont);
  elements.shuffleAllBtn?.addEventListener("click", shuffleBothFonts);

  // Preload common fonts
  preloadCommonFonts();
}
