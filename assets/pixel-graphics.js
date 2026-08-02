/**
 * Standalone retro SVG Pixel Art Generators
 * Color palette: Lavender Mist
 * Dark Violet: #26134B, Deep Teal: #125760, Muted Teal: #338794, Soft Lavender: #B3A3CE, Pale Lilac: #E4E0EA
 */

document.addEventListener('DOMContentLoaded', () => {
  renderHeaderCat();
  renderVictoryCat();
  renderStreetLamp();
  renderPurpleTree();
  renderSittingKitty();
});

// Helper to create crisp pixelated SVG elements
function renderHeaderCat() {
  const container = document.getElementById('headerCatIcon');
  if (!container) return;

  container.innerHTML = `
    <svg viewBox="0 0 24 24" width="36" height="36" style="image-rendering: pixelated;">
      <!-- Ears -->
      <path fill="#26134B" d="M4 2h4v4H4zM16 2h4v4h-4z"/>
      <path fill="#B3A3CE" d="M5 3h2v2H5zM17 3h2v2h-2z"/>
      <!-- Head Base -->
      <path fill="#26134B" d="M3 6h18v14H3z"/>
      <path fill="#E4E0EA" d="M4 7h16v12H4z"/>
      <!-- Eyes -->
      <path fill="#26134B" d="M7 10h3v4H7zM14 10h3v4h-3z"/>
      <!-- Cheeks -->
      <path fill="#B3A3CE" d="M5 14h2v2H5zM17 14h2v2h-2z"/>
      <!-- Mouth & Nose -->
      <path fill="#26134B" d="M11 13h2v1h-2zM10 15h4v1h-4z"/>
    </svg>
  `;
}

function renderVictoryCat() {
  const container = document.getElementById('victoryCatIllustration');
  if (!container) return;

  container.innerHTML = `
    <svg viewBox="0 0 48 48" width="120" height="120" style="image-rendering: pixelated;">
      <!-- Background Sparks -->
      <path fill="#B3A3CE" d="M4 6h2v2H4zM42 8h2v2h-2zM6 38h2v2H6zM40 40h2v2h-2z"/>
      <!-- Ears -->
      <path fill="#26134B" d="M10 8h8v8h-8zM30 8h8v8h-8z"/>
      <path fill="#B3A3CE" d="M12 10h4v4h-4zM32 10h4v4h-4z"/>
      <!-- Head -->
      <path fill="#26134B" d="M8 14h32v24H8z"/>
      <path fill="#E4E0EA" d="M10 16h28v20H10z"/>
      <!-- Eyes (Happy arcs ^ ^) -->
      <path fill="#26134B" d="M14 22h6v2h-6zM14 20h2v2h-2zM18 20h2v2h-2zM28 22h6v2h-6zM28 20h2v2h-2zM32 20h2v2h-2z"/>
      <!-- Pink Cheeks -->
      <path fill="#B3A3CE" d="M11 26h4v3h-4zM33 26h4v3h-4z"/>
      <!-- Nose & Happy Open Mouth -->
      <path fill="#26134B" d="M23 24h2v2h-2zM21 28h6v5h-6z"/>
      <path fill="#338794" d="M22 30h4v2h-4z"/>
      <!-- Paws -->
      <path fill="#26134B" d="M14 34h6v3h-6zM28 34h6v3h-6z"/>
      <path fill="#E4E0EA" d="M15 35h4v2h-4zM29 35h4v2h-4z"/>
    </svg>
  `;
}

function renderStreetLamp() {
  const container = document.getElementById('streetLampGraphic');
  if (!container) return;

  container.innerHTML = `
    <svg viewBox="0 0 20 60" width="30" height="90" style="image-rendering: pixelated;">
      <!-- Glow Aura -->
      <circle cx="10" cy="12" r="10" fill="#E4E0EA" opacity="0.3" />
      <circle cx="10" cy="12" r="6" fill="#B3A3CE" opacity="0.4" />
      <!-- Lamp Top Finial -->
      <path fill="#26134B" d="M9 2h2v2H9zM7 4h6v2H7z"/>
      <!-- Glass Fixture -->
      <path fill="#26134B" d="M5 6h10v2H5zM4 8h12v8H4z"/>
      <path fill="#E4E0EA" d="M6 9h8v6H6z"/>
      <path fill="#338794" d="M8 10h4v4H8z"/>
      <!-- Lamp Base -->
      <path fill="#26134B" d="M5 16h10v2H5zM8 18h4v34H8zM6 52h8v4H6zM4 56h12v4H4z"/>
    </svg>
  `;
}

function renderPurpleTree() {
  const container = document.getElementById('purpleTreeGraphic');
  if (!container) return;

  container.innerHTML = `
    <svg viewBox="0 0 50 70" width="80" height="110" style="image-rendering: pixelated;">
      <!-- Foliage Top (Soft Lavender & Dark Violet pixels) -->
      <path fill="#26134B" d="M15 4h20v6H15zM10 10h30v10H10zM5 20h40v20H5zM8 40h34v8H8z"/>
      <path fill="#B3A3CE" d="M18 6h14v4H18zM14 12h22v6H14zM8 22h34v14H8z"/>
      <path fill="#E4E0EA" d="M20 8h8v2h-8zM12 24h10v4H12zM28 26h10v4H28z"/>
      <!-- Trunk -->
      <path fill="#125760" d="M21 44h8v24h-8z"/>
      <path fill="#26134B" d="M19 64h12v6H19z"/>
    </svg>
  `;
}

function renderSittingKitty() {
  const container = document.getElementById('kittyGraphic');
  if (!container) return;

  container.innerHTML = `
    <svg viewBox="0 0 30 35" width="45" height="52" style="image-rendering: pixelated;">
      <!-- Tail -->
      <path fill="#26134B" d="M4 22h4v8H4zM2 20h4v4H2z"/>
      <path fill="#E4E0EA" d="M3 21h2v3H3zM5 23h2v6H5z"/>
      <!-- Cat Body sitting -->
      <path fill="#26134B" d="M8 14h16v18H8z"/>
      <path fill="#E4E0EA" d="M9 15h14v16H9z"/>
      <!-- Head -->
      <path fill="#26134B" d="M7 4h18v12H7z"/>
      <path fill="#E4E0EA" d="M8 5h16v10H8z"/>
      <!-- Ears -->
      <path fill="#26134B" d="M8 0h4v5H8zM20 0h4v5h-4z"/>
      <path fill="#B3A3CE" d="M9 2h2v3H9zM21 2h2v3h-2z"/>
      <!-- Eyes & Nose facing right/back -->
      <path fill="#26134B" d="M21 8h2v3h-2zM15 9h1v2h-1z"/>
    </svg>
  `;
}
