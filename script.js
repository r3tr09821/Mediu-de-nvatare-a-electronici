const safeStorage = {
  get(key, fallback) {
    try {
      return window.localStorage.getItem(key) || fallback;
    } catch (error) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      return;
    }
  }
};

const THEME_KEY = "robo-theme";
const COLOR_ONE_KEY = "robo-color-one";
const COLOR_TWO_KEY = "robo-color-two";
const THEME_CHOICES = ["dark", "light"];
const COLOR_PALETTE = [
  { id: "lime", label: "Lime", hex: "#b7ff3c" },
  { id: "yellow", label: "Galben", hex: "#ffd84d" },
  { id: "orange", label: "Portocaliu", hex: "#ff9b54" },
  { id: "red", label: "Rosu", hex: "#ff5d73" },
  { id: "pink", label: "Roz", hex: "#ff82c8" },
  { id: "violet", label: "Violet", hex: "#9b7bff" },
  { id: "purple", label: "Mov", hex: "#7c5cff" },
  { id: "gray", label: "Gri", hex: "#a7b4c5" },
  { id: "black", label: "Negru", hex: "#0b0f15" },
  { id: "white", label: "Alb", hex: "#f6fbff" },
  { id: "sky", label: "Albastru deschis", hex: "#38aef5" },
  { id: "mint", label: "Verde deschis", hex: "#8df3c0" },
  { id: "green", label: "Verde", hex: "#31c46d" },
  { id: "cyan", label: "Turcoaz", hex: "#31d6d0" },
  { id: "blue", label: "Albastru", hex: "#1b67d2" }
];

const getStoredColor = (key, fallback) => {
  const stored = safeStorage.get(key, fallback);
  return COLOR_PALETTE.some((color) => color.id === stored) ? stored : fallback;
};

const appState = {
  theme: THEME_CHOICES.includes(safeStorage.get(THEME_KEY, "dark"))
    ? safeStorage.get(THEME_KEY, "dark")
    : "dark",
  colorOne: getStoredColor(COLOR_ONE_KEY, "sky"),
  colorTwo: getStoredColor(COLOR_TWO_KEY, "lime")
};

const hasColor = (colorId) => COLOR_PALETTE.some((color) => color.id === colorId);
const findColor = (colorId) => COLOR_PALETTE.find((color) => color.id === colorId) || COLOR_PALETTE[0];

const hexToRgb = (hex) => {
  const normalized = hex.replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((char) => char + char).join("")
    : normalized;

  const numeric = Number.parseInt(value, 16);
  return {
    r: (numeric >> 16) & 255,
    g: (numeric >> 8) & 255,
    b: numeric & 255
  };
};

const toRgba = (hex, alpha) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const applyTheme = (theme) => {
  appState.theme = THEME_CHOICES.includes(theme) ? theme : "dark";
  document.body.dataset.theme = appState.theme;
  safeStorage.set(THEME_KEY, appState.theme);
  applyBackgroundColors();
  syncSettingsState();
  window.dispatchEvent(new CustomEvent("robo:appearance"));
};

const applyBackgroundColors = () => {
  const first = findColor(appState.colorOne).hex;
  const second = findColor(appState.colorTwo).hex;
  const isLight = appState.theme === "light";

  document.body.style.setProperty("--accent-1", first);
  document.body.style.setProperty("--accent-2", second);
  document.body.style.setProperty("--accent-1-soft", toRgba(first, isLight ? 0.18 : 0.22));
  document.body.style.setProperty("--accent-2-soft", toRgba(second, isLight ? 0.16 : 0.18));
  document.body.style.setProperty("--accent-1-faint", toRgba(first, isLight ? 0.07 : 0.09));
  document.body.style.setProperty("--accent-2-faint", toRgba(second, isLight ? 0.06 : 0.08));
  document.body.style.setProperty("--cursor-text-a", isLight ? "#000000" : "#ffffff");
  document.body.style.setProperty("--cursor-text-b", isLight ? "#000000" : "#ffffff");
};

const applyColorSelection = (slot, colorId) => {
  if (!hasColor(colorId)) {
    return;
  }

  if (slot === "one") {
    appState.colorOne = colorId;
    safeStorage.set(COLOR_ONE_KEY, colorId);
  } else {
    appState.colorTwo = colorId;
    safeStorage.set(COLOR_TWO_KEY, colorId);
  }

  applyBackgroundColors();
  syncSettingsState();
  window.dispatchEvent(new CustomEvent("robo:appearance"));
};

document.body.dataset.theme = appState.theme;
applyBackgroundColors();

const currentYear = document.querySelectorAll("[data-year]");
currentYear.forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("open");
  });
}

const challengeIdeas = [
  "Construieste un mini-robot care aprinde un LED cand detecteaza lumina.",
  "Fa un robot care se opreste cand un obstacol apare in fata lui.",
  "Gandeste un proiect cu doua LED-uri care arata directia de mers.",
  "Porneste de la un buton si adauga o reactie simpla cu motor sau buzzer.",
  "Creeaza un robot de birou care saluta prin lumini cand apesi un buton."
];

const challengeTrigger = document.querySelector("[data-challenge-trigger]");
const challengeText = document.querySelector("[data-challenge-text]");

if (challengeTrigger && challengeText) {
  challengeTrigger.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * challengeIdeas.length);
    challengeText.textContent = challengeIdeas[randomIndex];
  });
}

const counters = document.querySelectorAll("[data-counter]");

const animateCounter = (counter) => {
  const target = Number(counter.dataset.counter);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 24));

  const tick = () => {
    current += step;
    if (current >= target) {
      counter.textContent = String(target);
      return;
    }

    counter.textContent = String(current);
    window.requestAnimationFrame(tick);
  };

  tick();
};

if (counters.length > 0 && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      animateCounter(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  counters.forEach((counter) => observer.observe(counter));
} else {
  counters.forEach((counter) => {
    counter.textContent = counter.dataset.counter;
  });
}

const accordionTriggers = document.querySelectorAll(".accordion-trigger");
accordionTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".accordion-item");
    const content = item?.querySelector(".accordion-content");
    if (!content) {
      return;
    }

    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".accordion-item").forEach((accordionItem) => {
      accordionItem.classList.remove("open");
      const panel = accordionItem.querySelector(".accordion-content");
      if (panel) {
        panel.style.maxHeight = "";
      }
    });

    if (!isOpen) {
      item.classList.add("open");
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  });
});

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const level = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const cardLevel = card.dataset.level;
      const shouldShow = level === "all" || cardLevel === level;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const quizAnswers = document.querySelectorAll(".quiz-answer");
const quizFeedback = document.querySelector("[data-quiz-feedback]");

quizAnswers.forEach((answer) => {
  answer.addEventListener("click", () => {
    const isCorrect = answer.dataset.correct === "true";

    quizAnswers.forEach((button) => {
      button.classList.remove("correct", "wrong");
    });

    answer.classList.add(isCorrect ? "correct" : "wrong");

    if (!quizFeedback) {
      return;
    }

    quizFeedback.textContent = isCorrect
      ? "Corect. Rezistorul limiteaza curentul si protejeaza LED-ul."
      : "Nu chiar. Gandeste-te la componenta care limiteaza curentul prin LED.";
  });
});

let settingsRoot = null;

const syncSettingsState = () => {
  if (!settingsRoot) {
    return;
  }

  settingsRoot.querySelectorAll("[data-theme-choice]").forEach((button) => {
    const isActive = button.dataset.themeChoice === appState.theme;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  settingsRoot.querySelectorAll("[data-color-slot]").forEach((button) => {
    const slot = button.dataset.colorSlot;
    const value = button.dataset.colorValue;
    const selectedValue = slot === "one" ? appState.colorOne : appState.colorTwo;
    const isActive = value === selectedValue;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const createPaletteRow = (slot, title) => {
  const buttons = COLOR_PALETTE.map((color) => `
    <button
      class="palette-chip"
      type="button"
      data-color-slot="${slot}"
      data-color-value="${color.id}"
      aria-label="${title}: ${color.label}"
    >
      <span class="palette-chip__swatch" style="--swatch:${color.hex}"></span>
      <span class="palette-chip__label">${color.label}</span>
    </button>
  `).join("");

  return `
    <div class="floating-settings__group">
      <strong>${title}</strong>
      <div class="palette-grid">${buttons}</div>
    </div>
  `;
};

const initSettingsPanel = () => {
  settingsRoot = document.createElement("aside");
  settingsRoot.className = "floating-settings";
  settingsRoot.innerHTML = `
    <button class="floating-settings__toggle" type="button" aria-expanded="false" aria-controls="floating-settings-panel">
      Aspect
    </button>
    <section id="floating-settings-panel" class="floating-settings__panel" hidden>
      <span class="floating-settings__eyebrow">Panou flotant</span>
      <h2>Personalizeaza fundalul</h2>
      <p>Alege tema si combina doua culori dintr-o paleta extinsa pentru fundalul site-ului.</p>
      <div class="floating-settings__group">
        <strong>Modul paginii</strong>
        <div class="floating-settings__options">
          <button class="settings-chip" type="button" data-theme-choice="dark">Mod intunecat</button>
          <button class="settings-chip" type="button" data-theme-choice="light">Mod luminat</button>
        </div>
      </div>
      ${createPaletteRow("one", "Culoare 1")}
      ${createPaletteRow("two", "Culoare 2")}
    </section>
  `;

  document.body.append(settingsRoot);

  const toggle = settingsRoot.querySelector(".floating-settings__toggle");
  const panel = settingsRoot.querySelector(".floating-settings__panel");

  if (!toggle || !panel) {
    return;
  }

  const closePanel = () => {
    toggle.setAttribute("aria-expanded", "false");
    panel.hidden = true;
  };

  const openPanel = () => {
    toggle.setAttribute("aria-expanded", "true");
    panel.hidden = false;
  };

  toggle.addEventListener("click", () => {
    if (panel.hidden) {
      openPanel();
    } else {
      closePanel();
    }
  });

  settingsRoot.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      applyTheme(button.dataset.themeChoice || "dark");
    });
  });

  settingsRoot.querySelectorAll("[data-color-slot]").forEach((button) => {
    button.addEventListener("click", () => {
      const slot = button.dataset.colorSlot || "one";
      const value = button.dataset.colorValue || "sky";
      applyColorSelection(slot, value);
    });
  });

  document.addEventListener("click", (event) => {
    if (!settingsRoot?.contains(event.target)) {
      closePanel();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePanel();
    }
  });

  syncSettingsState();
};

const initCursorFog = () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  if (prefersReducedMotion || !finePointer) {
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.className = "cursor-fog";
  document.body.prepend(canvas);

  const context = canvas.getContext("2d");
  if (!context) {
    canvas.remove();
    return;
  }

  const activeCells = new Map();
  const cellSize = 20;
  const activationRadius = 78;
  let lastPointerX = window.innerWidth / 2;
  let lastPointerY = window.innerHeight / 2;
  let symbolColor = appState.theme === "light" ? "#000000" : "#ffffff";
  let lastTime = 0;
  let frameId = 0;
  let viewportWidth = window.innerWidth;
  let viewportHeight = window.innerHeight;

  const refreshPalette = () => {
    const styles = window.getComputedStyle(document.body);
    symbolColor = styles.getPropertyValue("--cursor-text-a").trim() || (appState.theme === "light" ? "#000000" : "#ffffff");
  };

  const resizeCanvas = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    canvas.width = Math.floor(viewportWidth * dpr);
    canvas.height = Math.floor(viewportHeight * dpr);
    canvas.style.width = `${viewportWidth}px`;
    canvas.style.height = `${viewportHeight}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    refreshPalette();
  };

  const getDirectionGlyph = (deltaX, deltaY) => {
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return "^";
    }

    return deltaX >= 0 ? ">" : "<";
  };

  const activateCell = (column, row, distanceRatio, directionGlyph) => {
    const key = `${column}:${row}`;
    const x = column * cellSize + cellSize / 2;
    const y = row * cellSize + cellSize / 2;
    const existing = activeCells.get(key);
    const life = 42 + Math.random() * 14;
    const stageOneAt = 12 + Math.random() * 5;
    const stageTwoAt = stageOneAt + 11 + Math.random() * 6;

    if (existing) {
      existing.age = 0;
      existing.life = life;
      existing.stageOneAt = stageOneAt;
      existing.stageTwoAt = stageTwoAt;
      existing.glyph = "o";
      existing.directionGlyph = directionGlyph;
      existing.size = 11 + (1 - distanceRatio) * 7 + Math.random() * 2;
      existing.phase = 0;
      return;
    }

    activeCells.set(key, {
      x,
      y,
      age: 0,
      life,
      stageOneAt,
      stageTwoAt,
      glyph: "o",
      directionGlyph,
      size: 11 + (1 - distanceRatio) * 7 + Math.random() * 2,
      phase: 0
    });

    if (!frameId) {
      frameId = window.requestAnimationFrame(render);
    }
  };

  const activateGridArea = (cursorX, cursorY, burst = false, directionGlyph = ">") => {
    const radius = burst ? activationRadius * 1.28 : activationRadius;
    const minColumn = Math.floor((cursorX - radius) / cellSize);
    const maxColumn = Math.floor((cursorX + radius) / cellSize);
    const minRow = Math.floor((cursorY - radius) / cellSize);
    const maxRow = Math.floor((cursorY + radius) / cellSize);

    for (let column = minColumn; column <= maxColumn; column += 1) {
      for (let row = minRow; row <= maxRow; row += 1) {
        const centerX = column * cellSize + cellSize / 2;
        const centerY = row * cellSize + cellSize / 2;
        const distance = Math.hypot(centerX - cursorX, centerY - cursorY);

        if (distance > radius) {
          continue;
        }

        const distanceRatio = distance / radius;
        const chance = burst ? 1 : 0.985 - distanceRatio * 0.08;

        if (Math.random() < chance) {
          activateCell(column, row, distanceRatio, directionGlyph);
        }
      }
    }
  };

  const drawCell = (cell) => {
    context.save();
    context.globalAlpha = 1;
    context.fillStyle = symbolColor;
    context.font = `${cell.size}px "Space Grotesk", sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(cell.glyph, cell.x, cell.y);
    context.restore();
  };

  const render = (time) => {
    frameId = 0;
    const delta = Math.min(26, time - lastTime || 16);
    lastTime = time;

    context.clearRect(0, 0, viewportWidth, viewportHeight);

    activeCells.forEach((cell, key) => {
      const speed = delta / 16.67;
      cell.age += speed;

      if (cell.phase === 0 && cell.age >= cell.stageOneAt) {
        cell.glyph = cell.directionGlyph;
        cell.phase = 1;
      }

      if (cell.phase === 1 && cell.age >= cell.stageTwoAt) {
        cell.glyph = "_";
        cell.phase = 2;
      }

      if (cell.age >= cell.life) {
        activeCells.delete(key);
        return;
      }

      drawCell(cell);
    });

    if (activeCells.size > 0) {
      frameId = window.requestAnimationFrame(render);
    }
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("robo:appearance", refreshPalette);
  window.addEventListener("pointermove", (event) => {
    const deltaX = event.clientX - lastPointerX;
    const deltaY = event.clientY - lastPointerY;
    const directionGlyph = getDirectionGlyph(deltaX, deltaY);
    activateGridArea(event.clientX, event.clientY, false, directionGlyph);

    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
  }, { passive: true });
  window.addEventListener("click", (event) => {
    const deltaX = event.clientX - lastPointerX;
    const deltaY = event.clientY - lastPointerY;
    const directionGlyph = getDirectionGlyph(deltaX, deltaY);
    activateGridArea(event.clientX, event.clientY, true, directionGlyph);

    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
  });
};

initSettingsPanel();
syncSettingsState();
initCursorFog();
