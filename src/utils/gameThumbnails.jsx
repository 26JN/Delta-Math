import React from 'react';

/**
 * High-performance Canvas artwork renderer for 3D cartridge fronts
 * Creates recognizable, custom graphic game art matching each title.
 */
export function drawGameCoverArt(ctx, game, x, y, width, height, isVip = false) {
  ctx.save();
  ctx.translate(x, y);

  // Clip to inner cover boundaries with rounded corners
  const radius = 12;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(width - radius, 0);
  ctx.quadraticCurveTo(width, 0, width, radius);
  ctx.lineTo(width, height - radius);
  ctx.quadraticCurveTo(width, height, width - radius, height);
  ctx.lineTo(radius, height);
  ctx.quadraticCurveTo(0, height, 0, height - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.clip();

  const id = (game.artKey || game.id || '').toLowerCase();
  const primaryColor = game.color || (isVip ? '#fbbf24' : '#00ffcc');
  const accentColor = game.accent || (isVip ? '#f59e0b' : '#38bdf8');

  // Base background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  if (isVip) {
    bgGrad.addColorStop(0, '#1c1304');
    bgGrad.addColorStop(0.5, '#0a0802');
    bgGrad.addColorStop(1, '#180f02');
  } else {
    bgGrad.addColorStop(0, '#0c101a');
    bgGrad.addColorStop(0.5, '#06080d');
    bgGrad.addColorStop(1, '#030406');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Draw Specific Game Graphic Artworks
  if (id.includes('slope')) {
    drawSlopeArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('run-3') || id.includes('run3')) {
    drawRun3Art(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('tunnel-rush')) {
    drawTunnelRushArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('fnaf')) {
    drawFnafArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('superhot')) {
    drawSuperhotArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('baldi')) {
    drawBaldiArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('getting-over-it')) {
    drawGettingOverItArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('happy-wheels')) {
    drawHappyWheelsArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('1v1')) {
    draw1v1Art(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('retro-bowl')) {
    drawRetroBowlArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('moto-x3m')) {
    drawMotoX3MArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('subway-surfers')) {
    drawSubwaySurfersArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('cookie-clicker')) {
    drawCookieClickerArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('minecraft') || id.includes('mineclone')) {
    drawMinecraftArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('roblox') || id.includes('blox') || id.includes('obby')) {
    drawRobloxArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('tetris')) {
    drawTetrisArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('fireboy') || id.includes('watergirl')) {
    drawFireboyWatergirlArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('bloons')) {
    drawBloonsArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('drift')) {
    drawDriftArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('geometry-dash')) {
    drawGeometryDashArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('vex')) {
    drawVexArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('pokemon')) {
    drawPokemonArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('mario')) {
    drawMarioArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('sonic')) {
    drawSonicArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('zelda')) {
    drawZeldaArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('doom') || id.includes('wolfenstein')) {
    drawDoomArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('plants-vs-zombies')) {
    drawPlantsVsZombiesArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('undertale')) {
    drawUndertaleArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('cuphead')) {
    drawCupheadArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('shell-shockers')) {
    drawShellShockersArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('krunker')) {
    drawKrunkerArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('bad-ice-cream')) {
    drawBadIceCreamArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('cut-the-rope')) {
    drawCutTheRopeArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('worlds-hardest-game')) {
    drawWorldsHardestArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('tank-trouble')) {
    drawTankTroubleArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('chess')) {
    drawChessArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('basketball') || id.includes('basket-random')) {
    drawBasketballArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('stick-war')) {
    drawStickWarArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('smash-karts')) {
    drawSmashKartsArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('fall-boys') || id.includes('fall-guys')) {
    drawFallBoysArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('fnf') || id.includes('friday-night')) {
    drawFnfArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('duck-life')) {
    drawDuckLifeArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('portal')) {
    drawPortalArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('slither') || id.includes('snake')) {
    drawSlitherArt(ctx, width, height, primaryColor, accentColor);
  } else if (id.includes('paper-io')) {
    drawPaperIoArt(ctx, width, height, primaryColor, accentColor);
  } else {
    // Genre specific fallback artwork
    drawGenreFallbackArt(ctx, width, height, game.category, primaryColor, accentColor);
  }

  // Draw VIP Gold Sheen Ribbon if VIP
  if (isVip || game.vip) {
    drawVipRibbon(ctx, width, height);
  }

  // Outer border
  ctx.lineWidth = 3;
  ctx.strokeStyle = isVip ? 'rgba(251, 191, 36, 0.7)' : (primaryColor + '99');
  ctx.strokeRect(1, 1, width - 2, height - 2);

  ctx.restore();
}

// ----------------------------------------------------
// Specific Game Art Implementations
// ----------------------------------------------------

function drawSlopeArt(ctx, w, h, primary, accent) {
  // 3D Grid Slope Horizon
  ctx.save();
  ctx.strokeStyle = primary;
  ctx.lineWidth = 2;
  const horizonY = h * 0.45;

  // Vanishing perspective lines
  for (let i = -6; i <= 6; i++) {
    ctx.beginPath();
    ctx.moveTo(w / 2, horizonY);
    ctx.lineTo(w / 2 + i * (w * 0.18), h);
    ctx.stroke();
  }
  // Transverse horizontal grid lines
  for (let y = horizonY; y < h; y += (y - horizonY) * 0.45 + 10) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Glowing Green Speed Sphere
  const ballX = w * 0.5;
  const ballY = h * 0.68;
  const rad = w * 0.16;
  const grad = ctx.createRadialGradient(ballX - rad * 0.3, ballY - rad * 0.3, rad * 0.1, ballX, ballY, rad);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.3, primary);
  grad.addColorStop(0.8, '#059669');
  grad.addColorStop(1, '#022c22');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(ballX, ballY, rad, 0, Math.PI * 2);
  ctx.fill();

  // Speed streak particles
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 6; i++) {
    ctx.fillRect(ballX - rad * 1.2 + i * 14, ballY - rad * 0.5 - i * 6, 8, 2);
  }
  ctx.restore();
}

function drawRun3Art(ctx, w, h, primary, accent) {
  // Deep space tunnel hexagon rings
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;

  for (let r = w * 0.08; r < w * 0.65; r += w * 0.12) {
    ctx.strokeStyle = primary;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let a = 0; a < 6; a++) {
      const angle = (a / 6) * Math.PI * 2;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (a === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  // Little Alien Runner Silhouette (Yellow/White)
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(cx, cy + 30, 16, 0, Math.PI * 2);
  ctx.fill();
  // Body & legs
  ctx.fillRect(cx - 10, cy + 46, 20, 26);
  ctx.fillRect(cx - 14, cy + 72, 8, 18);
  ctx.fillRect(cx + 6, cy + 72, 8, 18);
  // Large Alien Eye
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(cx, cy + 30, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawTunnelRushArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h / 2;
  const colors = ['#ef4444', '#f97316', '#eab308', '#ec4899', '#3b82f6'];

  for (let i = 8; i >= 1; i--) {
    const r = i * (w * 0.06);
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  // Red obstacle bars cutting across
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(cx - w * 0.35, cy - 14, w * 0.7, 28);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(cx - w * 0.35, cy - 14, w * 0.7, 28);
  ctx.restore();
}

function drawFnafArt(ctx, w, h, primary, accent) {
  // Freddy Fazbear Dark Silhouette & Glowing Eyes
  ctx.save();
  ctx.fillStyle = '#1c1917';
  ctx.fillRect(0, 0, w, h);

  // Black and white checkered tile floor at bottom
  const tileH = 36;
  const tileW = 24;
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < w / tileW + 1; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#ffffff' : '#000000';
      ctx.fillRect(c * tileW, h - tileH * 2 + r * tileH, tileW, tileH);
    }
  }

  // Bear Head Silhouette
  const cx = w / 2;
  const cy = h * 0.42;
  ctx.fillStyle = '#451a03'; // Brown bear head
  ctx.beginPath();
  ctx.arc(cx, cy, 54, 0, Math.PI * 2);
  ctx.fill();

  // Round ears
  ctx.beginPath();
  ctx.arc(cx - 52, cy - 36, 22, 0, Math.PI * 2);
  ctx.arc(cx + 52, cy - 36, 22, 0, Math.PI * 2);
  ctx.fill();

  // Top hat
  ctx.fillStyle = '#0c0a09';
  ctx.fillRect(cx - 28, cy - 76, 56, 32);
  ctx.fillRect(cx - 40, cy - 46, 80, 10);
  ctx.fillStyle = '#dc2626'; // Red hat ribbon
  ctx.fillRect(cx - 28, cy - 52, 56, 6);

  // Piercing Glowing White/Yellow Eyes
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(cx - 22, cy - 4, 8, 0, Math.PI * 2);
  ctx.arc(cx + 22, cy - 4, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx - 22, cy - 4, 4, 0, Math.PI * 2);
  ctx.arc(cx + 22, cy - 4, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSuperhotArt(ctx, w, h, primary, accent) {
  // Stark white void with shattered red polygon warrior
  ctx.save();
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h * 0.48;

  // Red shattered crystalline torso and shards
  ctx.fillStyle = '#dc2626';
  // Head
  ctx.beginPath();
  ctx.moveTo(cx - 16, cy - 45);
  ctx.lineTo(cx + 16, cy - 45);
  ctx.lineTo(cx + 22, cy - 20);
  ctx.lineTo(cx, cy - 10);
  ctx.lineTo(cx - 22, cy - 20);
  ctx.closePath();
  ctx.fill();

  // Fractured red shards flying
  const shards = [
    [-35, -20, 20, 14],
    [30, -35, 18, 16],
    [-20, 20, 25, 18],
    [35, 15, 22, 24],
    [-10, 45, 18, 20],
    [25, 45, 16, 22],
  ];
  shards.forEach(([sx, sy, sw, sh]) => {
    ctx.beginPath();
    ctx.moveTo(cx + sx, cy + sy);
    ctx.lineTo(cx + sx + sw, cy + sy + 4);
    ctx.lineTo(cx + sx + sw * 0.6, cy + sy + sh);
    ctx.closePath();
    ctx.fill();
  });

  // "TIME MOVES ONLY WHEN YOU MOVE" text accent
  ctx.fillStyle = '#991b1b';
  ctx.font = 'bold 13px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SUPERHOT', cx, h * 0.88);
  ctx.restore();
}

function drawBaldiArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  // Green teacher shirt & wooden ruler
  ctx.fillStyle = '#15803d'; // Green shirt
  ctx.fillRect(cx - 40, h * 0.5, 80, 70);

  // Round Baldi bald head
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(cx, h * 0.35, 42, 0, Math.PI * 2);
  ctx.fill();

  // One curved brown hair strand
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, h * 0.22, 14, Math.PI, Math.PI * 1.8);
  ctx.stroke();

  // Eyes and eerie smile
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(cx - 14, h * 0.35, 5, 0, Math.PI * 2);
  ctx.arc(cx + 14, h * 0.35, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#dc2626'; // Red lips
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, h * 0.38, 16, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // Yellow Wooden Ruler held upright
  ctx.fillStyle = '#ca8a04';
  ctx.fillRect(cx + 42, h * 0.22, 16, 90);
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 2;
  ctx.strokeRect(cx + 42, h * 0.22, 16, 90);
  ctx.restore();
}

function drawGettingOverItArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  // Rocky cliff face
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(w * 0.45, h * 0.3);
  ctx.lineTo(w, h * 0.15);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // Black Iron Cauldron
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(cx, h * 0.65, 38, 0, Math.PI);
  ctx.fill();
  ctx.fillRect(cx - 38, h * 0.61, 76, 10);

  // Sledgehammer
  ctx.strokeStyle = '#ca8a04'; // Wood handle
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(cx, h * 0.58);
  ctx.lineTo(cx + 50, h * 0.32);
  ctx.stroke();

  // Steel hammer head
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(cx + 42, h * 0.26, 32, 18);
  ctx.restore();
}

function drawHappyWheelsArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.55;

  // Wheelchair large wheel
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(cx - 20, cy + 10, 32, 0, Math.PI * 2);
  ctx.stroke();

  // Wheel spokes
  ctx.lineWidth = 2;
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx - 20 + Math.cos(a) * 32, cy + 10 + Math.sin(a) * 32);
    ctx.lineTo(cx - 20 - Math.cos(a) * 32, cy + 10 - Math.sin(a) * 32);
    ctx.stroke();
  }

  // Rocket booster behind wheelchair with huge flames
  ctx.fillStyle = '#475569';
  ctx.fillRect(cx - 56, cy - 8, 28, 16);
  // Fire exhaust
  ctx.fillStyle = '#ea580c';
  ctx.beginPath();
  ctx.moveTo(cx - 56, cy - 8);
  ctx.lineTo(cx - 86, cy);
  ctx.lineTo(cx - 56, cy + 8);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.moveTo(cx - 56, cy - 4);
  ctx.lineTo(cx - 74, cy);
  ctx.lineTo(cx - 56, cy + 4);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function draw1v1Art(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;

  // Wood Ramp / Pyramid Blueprint
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.moveTo(cx - 60, cy + 40);
  ctx.lineTo(cx + 50, cy - 30);
  ctx.lineTo(cx + 70, cy - 10);
  ctx.lineTo(cx - 40, cy + 60);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = primary;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Sniper / Shotgun Crosshair
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, 32, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - 42, cy);
  ctx.lineTo(cx + 42, cy);
  ctx.moveTo(cx, cy - 42);
  ctx.lineTo(cx, cy + 42);
  ctx.stroke();

  // Center red dot
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawRetroBowlArt(ctx, w, h, primary, accent) {
  ctx.save();
  // Football Grass Green background
  ctx.fillStyle = '#15803d';
  ctx.fillRect(0, 0, w, h);

  // Yard lines
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  for (let y = 30; y < h; y += 45) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Yellow Goalpost uprights
  const cx = w / 2;
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(cx, h);
  ctx.lineTo(cx, h * 0.35);
  ctx.moveTo(cx - 45, h * 0.35);
  ctx.lineTo(cx + 45, h * 0.35);
  ctx.moveTo(cx - 45, h * 0.35);
  ctx.lineTo(cx - 45, h * 0.1);
  ctx.moveTo(cx + 45, h * 0.35);
  ctx.lineTo(cx + 45, h * 0.1);
  ctx.stroke();

  // Brown Football with White Laces
  ctx.save();
  ctx.translate(cx, h * 0.58);
  ctx.rotate(-0.35);
  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.ellipse(0, 0, 36, 22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Laces
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-16, 0);
  ctx.lineTo(16, 0);
  for (let lx = -12; lx <= 12; lx += 6) {
    ctx.moveTo(lx, -6);
    ctx.lineTo(lx, 6);
  }
  ctx.stroke();
  ctx.restore();
  ctx.restore();
}

function drawMotoX3MArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;

  // Dirt ramp & flames
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(w * 0.6, h * 0.65);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // Roaring flames
  ctx.fillStyle = '#ea580c';
  for (let fx = 15; fx < w; fx += 25) {
    ctx.beginPath();
    ctx.moveTo(fx, h * 0.75);
    ctx.lineTo(fx + 12, h * 0.55);
    ctx.lineTo(fx + 24, h * 0.75);
    ctx.closePath();
    ctx.fill();
  }

  // Stunt Dirt Bike Silhouette flying in air
  ctx.save();
  ctx.translate(cx, cy - 15);
  ctx.rotate(-0.4);

  // Wheels
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(-35, 15, 18, 0, Math.PI * 2);
  ctx.arc(35, 15, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Bike Frame & Rider Helmet
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-35, 15);
  ctx.lineTo(0, -5);
  ctx.lineTo(35, 15);
  ctx.lineTo(15, -15);
  ctx.stroke();

  // Neon rider helmet
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.arc(0, -28, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.restore();
}

function drawSubwaySurfersArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  // Train railway track perspective
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx, h * 0.25);
  ctx.lineTo(w * 0.15, h);
  ctx.moveTo(cx, h * 0.25);
  ctx.lineTo(w * 0.85, h);
  ctx.stroke();

  // Wooden railroad ties
  for (let y = h * 0.35; y < h; y += (y - h * 0.25) * 0.45 + 12) {
    ctx.beginPath();
    ctx.moveTo(cx - (y - h * 0.25) * 0.9, y);
    ctx.lineTo(cx + (y - h * 0.25) * 0.9, y);
    ctx.stroke();
  }

  // Subway Train Front Silhouette (Blue & Red)
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(cx - 38, h * 0.3, 76, 70);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(cx - 38, h * 0.85, 76, 15);

  // Train windshields
  ctx.fillStyle = '#facc15';
  ctx.fillRect(cx - 30, h * 0.36, 26, 26);
  ctx.fillRect(cx + 4, h * 0.36, 26, 26);

  // Colorful Graffiti Spray Can
  ctx.fillStyle = '#ec4899';
  ctx.fillRect(w * 0.72, h * 0.5, 20, 36);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(w * 0.72 + 5, h * 0.5 - 6, 10, 6);
  ctx.restore();
}

function drawCookieClickerArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.5;
  const rad = w * 0.35;

  // Giant Golden Cookie
  const cookieGrad = ctx.createRadialGradient(cx - 20, cy - 20, 10, cx, cy, rad);
  cookieGrad.addColorStop(0, '#fef08a');
  cookieGrad.addColorStop(0.4, '#d97706');
  cookieGrad.addColorStop(1, '#78350f');
  ctx.fillStyle = cookieGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, rad, 0, Math.PI * 2);
  ctx.fill();

  // Rich Dark Chocolate Chips
  ctx.fillStyle = '#291807';
  const chips = [
    [-25, -28, 11],
    [15, -34, 10],
    [-42, 10, 12],
    [32, -8, 12],
    [2, 5, 14],
    [-18, 38, 13],
    [28, 32, 11],
  ];
  chips.forEach(([ox, oy, cr]) => {
    ctx.beginPath();
    ctx.arc(cx + ox, cy + oy, cr, 0, Math.PI * 2);
    ctx.fill();
  });

  // Sparkles
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(cx + rad * 0.75, cy - rad * 0.75, 7, 0, Math.PI * 2);
  ctx.arc(cx - rad * 0.8, cy + rad * 0.6, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawMinecraftArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.46;
  const s = 72; // Block size

  // Isometric 3D Grass Dirt Block
  // Top Face (Grass)
  ctx.fillStyle = '#16a34a'; // Vibrant green
  ctx.beginPath();
  ctx.moveTo(cx, cy - s * 0.55);
  ctx.lineTo(cx + s * 0.7, cy - s * 0.15);
  ctx.lineTo(cx, cy + s * 0.25);
  ctx.lineTo(cx - s * 0.7, cy - s * 0.15);
  ctx.closePath();
  ctx.fill();

  // Left Face (Dirt)
  ctx.fillStyle = '#78350f'; // Dark dirt
  ctx.beginPath();
  ctx.moveTo(cx - s * 0.7, cy - s * 0.15);
  ctx.lineTo(cx, cy + s * 0.25);
  ctx.lineTo(cx, cy + s * 0.85);
  ctx.lineTo(cx - s * 0.7, cy + s * 0.45);
  ctx.closePath();
  ctx.fill();

  // Right Face (Dirt)
  ctx.fillStyle = '#92400e'; // Lighter dirt
  ctx.beginPath();
  ctx.moveTo(cx, cy + s * 0.25);
  ctx.lineTo(cx + s * 0.7, cy - s * 0.15);
  ctx.lineTo(cx + s * 0.7, cy + s * 0.45);
  ctx.lineTo(cx, cy + s * 0.85);
  ctx.closePath();
  ctx.fill();

  // Pixel Diamond Pickaxe
  ctx.strokeStyle = '#38bdf8'; // Diamond Cyan
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(cx + 35, cy - 40);
  ctx.lineTo(cx + 70, cy - 35);
  ctx.lineTo(cx + 65, cy);
  ctx.stroke();

  ctx.strokeStyle = '#ca8a04'; // Wooden handle
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx + 60, cy - 30);
  ctx.lineTo(cx + 15, cy + 15);
  ctx.stroke();
  ctx.restore();
}

function drawRobloxArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.44;

  // Dark crimson cyber background
  const bg = ctx.createRadialGradient(cx, cy, 10, cx, cy, w * 0.7);
  bg.addColorStop(0, '#450a0a');
  bg.addColorStop(0.7, '#1c0508');
  bg.addColorStop(1, '#050102');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Modern tilted Roblox 'O' Logo block
  ctx.save();
  ctx.translate(cx, cy - 22);
  ctx.rotate(-0.25); // signature tilt

  const size = 66;
  const half = size / 2;

  // Red block body
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(-half, -half, size, size);

  // Highlight border
  ctx.strokeStyle = '#f87171';
  ctx.lineWidth = 3;
  ctx.strokeRect(-half, -half, size, size);

  // Center square cutout
  const holeSize = 22;
  const halfHole = holeSize / 2;
  ctx.fillStyle = '#1c0508';
  ctx.fillRect(-halfHole, -halfHole, holeSize, holeSize);
  ctx.strokeStyle = '#7f1d1d';
  ctx.lineWidth = 2;
  ctx.strokeRect(-halfHole, -halfHole, holeSize, holeSize);

  ctx.restore();

  // Roblox Iconic Noob Character
  const charX = cx;
  const charY = cy + 42;

  // Yellow head
  ctx.fillStyle = '#facc15';
  ctx.fillRect(charX - 12, charY - 24, 24, 18);
  // Eyes & smile
  ctx.fillStyle = '#111827';
  ctx.fillRect(charX - 8, charY - 18, 4, 4);
  ctx.fillRect(charX + 4, charY - 18, 4, 4);
  ctx.fillRect(charX - 5, charY - 11, 10, 2.5);

  // Blue Torso
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(charX - 16, charY - 6, 32, 24);

  // Yellow Arms
  ctx.fillStyle = '#facc15';
  ctx.fillRect(charX - 25, charY - 6, 9, 22);
  ctx.fillRect(charX + 16, charY - 6, 9, 22);

  // Green Legs
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(charX - 15, charY + 18, 14, 26);
  ctx.fillRect(charX + 1, charY + 18, 14, 26);

  // Roblox bold title badge
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 17px "Chakra Petch", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ROBLOX', cx, h - 34);

  ctx.fillStyle = '#f87171';
  ctx.font = 'bold 10px monospace';
  ctx.fillText('UNBLOCKED 3D', cx, h - 18);

  ctx.restore();
}

function drawTetrisArt(ctx, w, h, primary, accent) {
  ctx.save();
  const bs = 28; // Block size
  const cx = w / 2;
  const cy = h * 0.45;

  // Purple T-piece
  ctx.fillStyle = '#a855f7';
  ctx.fillRect(cx - bs * 1.5, cy, bs, bs);
  ctx.fillRect(cx - bs * 0.5, cy, bs, bs);
  ctx.fillRect(cx + bs * 0.5, cy, bs, bs);
  ctx.fillRect(cx - bs * 0.5, cy - bs, bs, bs);

  // Cyan Line piece
  ctx.fillStyle = '#06b6d4';
  ctx.fillRect(cx - bs * 2, cy + bs * 1.2, bs * 4, bs * 0.9);

  // Yellow O-piece
  ctx.fillStyle = '#eab308';
  ctx.fillRect(cx - bs * 1.8, cy - bs * 2.2, bs * 1.8, bs * 1.8);

  // Grid outline
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 2;
  ctx.strokeRect(cx - bs * 1.5, cy, bs, bs);
  ctx.strokeRect(cx - bs * 0.5, cy, bs, bs);
  ctx.strokeRect(cx + bs * 0.5, cy, bs, bs);
  ctx.restore();
}

function drawFireboyWatergirlArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;

  // Fireboy (Red flame teardrop on left)
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.moveTo(cx - 35, cy - 40);
  ctx.bezierCurveTo(cx - 15, cy - 20, cx - 10, cy + 30, cx - 35, cy + 30);
  ctx.bezierCurveTo(cx - 60, cy + 30, cx - 55, cy - 20, cx - 35, cy - 40);
  ctx.fill();

  // Watergirl (Cyan water droplet on right)
  ctx.fillStyle = '#06b6d4';
  ctx.beginPath();
  ctx.moveTo(cx + 35, cy - 40);
  ctx.bezierCurveTo(cx + 55, cy - 20, cx + 60, cy + 30, cx + 35, cy + 30);
  ctx.bezierCurveTo(cx + 10, cy + 30, cx + 15, cy - 20, cx + 35, cy - 40);
  ctx.fill();

  // Glowing eyes
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx - 40, cy, 5, 0, Math.PI * 2);
  ctx.arc(cx - 28, cy, 5, 0, Math.PI * 2);
  ctx.arc(cx + 28, cy, 5, 0, Math.PI * 2);
  ctx.arc(cx + 40, cy, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawBloonsArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.45;

  // Colorful bunch of balloons
  const balloons = [
    [-30, -15, 24, '#ef4444'],
    [0, -32, 26, '#3b82f6'],
    [32, -18, 25, '#22c55e'],
    [10, 8, 23, '#eab308'],
  ];

  balloons.forEach(([bx, by, br, col]) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.ellipse(cx + bx, cy + by, br * 0.85, br * 1.1, 0, 0, Math.PI * 2);
    ctx.fill();
    // Shading highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.ellipse(cx + bx - br * 0.3, cy + by - br * 0.35, br * 0.25, br * 0.35, -0.3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Ninja Dart Flying through
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx - 50, cy + 50);
  ctx.lineTo(cx + 40, cy - 20);
  ctx.stroke();

  // Dart Red Feather Fletching
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.moveTo(cx - 50, cy + 50);
  ctx.lineTo(cx - 65, cy + 60);
  ctx.lineTo(cx - 55, cy + 40);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawDriftArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.5;

  // Tire skid smoke clouds
  ctx.fillStyle = 'rgba(203, 213, 225, 0.35)';
  ctx.beginPath();
  ctx.arc(cx - 45, cy + 25, 28, 0, Math.PI * 2);
  ctx.arc(cx - 20, cy + 30, 22, 0, Math.PI * 2);
  ctx.fill();

  // Sleek Sports Car drifting sideways
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-0.25);

  // Car Body
  ctx.fillStyle = primary;
  ctx.fillRect(-50, -14, 100, 28);
  // Cabin
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-22, -26, 50, 14);
  // Wheels
  ctx.fillStyle = '#000000';
  ctx.fillRect(-38, 12, 22, 10);
  ctx.fillRect(20, 12, 22, 10);
  // Headlights
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(48, -10, 6, 8);
  ctx.restore();

  // Curved skid marks
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx - 10, cy + 65, 45, Math.PI * 0.9, Math.PI * 1.5);
  ctx.stroke();
  ctx.restore();
}

function drawGeometryDashArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.52;

  // Ground Line
  ctx.strokeStyle = primary;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, cy + 32);
  ctx.lineTo(w, cy + 32);
  ctx.stroke();

  // Spikes
  ctx.fillStyle = '#ef4444';
  for (let sx = cx - 30; sx <= cx + 45; sx += 32) {
    ctx.beginPath();
    ctx.moveTo(sx, cy + 32);
    ctx.lineTo(sx + 14, cy + 4);
    ctx.lineTo(sx + 28, cy + 32);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Jumping Neon Square
  ctx.save();
  ctx.translate(cx - 40, cy - 15);
  ctx.rotate(0.4);
  ctx.fillStyle = '#facc15';
  ctx.fillRect(-20, -20, 40, 40);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 4;
  ctx.strokeRect(-20, -20, 40, 40);

  // Icon face
  ctx.fillStyle = '#000000';
  ctx.fillRect(-12, -10, 8, 8);
  ctx.fillRect(4, -10, 8, 8);
  ctx.fillRect(-10, 4, 20, 6);
  ctx.restore();
  ctx.restore();
}

function drawVexArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.45;

  // Spinning Red Buzzsaw
  ctx.save();
  ctx.translate(cx + 35, cy + 35);
  ctx.fillStyle = '#ef4444';
  for (let i = 0; i < 8; i++) {
    ctx.rotate((Math.PI * 2) / 8);
    ctx.beginPath();
    ctx.moveTo(-8, -26);
    ctx.lineTo(8, -26);
    ctx.lineTo(0, -38);
    ctx.closePath();
    ctx.fill();
  }
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.arc(0, 0, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Stickman parkour leaping
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  // Head
  ctx.beginPath();
  ctx.arc(cx - 30, cy - 25, 12, 0, Math.PI * 2);
  ctx.stroke();
  // Spine & limbs
  ctx.beginPath();
  ctx.moveTo(cx - 30, cy - 13);
  ctx.lineTo(cx - 25, cy + 15);
  // Legs jumping
  ctx.lineTo(cx - 45, cy + 35);
  ctx.moveTo(cx - 25, cy + 15);
  ctx.lineTo(cx - 10, cy + 30);
  // Arms
  ctx.moveTo(cx - 28, cy);
  ctx.lineTo(cx - 45, cy - 10);
  ctx.moveTo(cx - 28, cy);
  ctx.lineTo(cx - 5, cy);
  ctx.stroke();
  ctx.restore();
}

function drawPokemonArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;
  const r = 48;

  // Top Red Half
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI, 0, false);
  ctx.closePath();
  ctx.fill();

  // Bottom White Half
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI, false);
  ctx.closePath();
  ctx.fill();

  // Black Dividers & Outer Ring
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - r, cy - 4, r * 2, 8);

  // Center Button
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(cx, cy, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawMarioArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.45;

  // Mario Red Cap
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(cx, cy - 10, 42, Math.PI * 0.9, Math.PI * 2.1);
  ctx.fill();
  ctx.fillRect(cx - 52, cy - 10, 104, 18);

  // White Emblem with red 'M'
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy - 16, 18, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#dc2626';
  ctx.font = 'bold 22px "Chakra Petch", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('M', cx, cy - 8);

  // Classic Yellow ? Block
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(cx - 24, cy + 30, 48, 48);
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 4;
  ctx.strokeRect(cx - 24, cy + 30, 48, 48);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 30px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('?', cx, cy + 65);
  ctx.restore();
}

function drawSonicArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.46;

  // Golden Ring
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(cx, cy, 52, 0, Math.PI * 2);
  ctx.stroke();

  // Blue Sonic Head Silhouette with Spikes
  ctx.fillStyle = '#2563eb';
  ctx.beginPath();
  ctx.arc(cx, cy, 32, 0, Math.PI * 2);
  ctx.fill();

  // Spikes pointing back
  ctx.beginPath();
  ctx.moveTo(cx - 20, cy - 25);
  ctx.lineTo(cx - 58, cy - 40);
  ctx.lineTo(cx - 30, cy - 5);
  ctx.lineTo(cx - 62, cy + 5);
  ctx.lineTo(cx - 28, cy + 15);
  ctx.lineTo(cx - 50, cy + 35);
  ctx.lineTo(cx - 15, cy + 28);
  ctx.closePath();
  ctx.fill();

  // Tan mouth muzzle
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(cx + 14, cy + 8, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawZeldaArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.42;

  // Golden Triforce
  ctx.fillStyle = '#fbbf24';
  const s = 34;

  // Top triangle
  drawTriangle(ctx, cx, cy - s * 0.86, s);
  // Bottom-left triangle
  drawTriangle(ctx, cx - s * 0.5, cy, s);
  // Bottom-right triangle
  drawTriangle(ctx, cx + s * 0.5, cy, s);

  // Master Sword Blade
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(cx, cy + 20);
  ctx.lineTo(cx, cy + 85);
  ctx.stroke();

  // Sword Crossguard (Blue Wing)
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(cx - 24, cy + 30);
  ctx.lineTo(cx + 24, cy + 30);
  ctx.stroke();
  ctx.restore();
}

function drawTriangle(ctx, x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y - size * 0.577);
  ctx.lineTo(x + size * 0.5, y + size * 0.288);
  ctx.lineTo(x - size * 0.5, y + size * 0.288);
  ctx.closePath();
  ctx.fill();
}

function drawDoomArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  // Red hellish background glow
  ctx.fillStyle = '#7f1d1d';
  ctx.fillRect(0, 0, w, h);

  // Double-barrel Shotgun Barrels
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 28, h * 0.45, 24, 70);
  ctx.fillRect(cx + 4, h * 0.45, 24, 70);

  // Muzzle Openings
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(cx - 16, h * 0.45, 11, 0, Math.PI * 2);
  ctx.arc(cx + 16, h * 0.45, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Demon horns in background
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(cx - 45, h * 0.35);
  ctx.quadraticCurveTo(cx - 60, h * 0.15, cx - 35, h * 0.1);
  ctx.moveTo(cx + 45, h * 0.35);
  ctx.quadraticCurveTo(cx + 60, h * 0.15, cx + 35, h * 0.1);
  ctx.stroke();
  ctx.restore();
}

function drawPlantsVsZombiesArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;

  // Green Lawn
  ctx.fillStyle = '#16a34a';
  ctx.fillRect(0, 0, w, h);

  // Peashooter Head
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(cx - 15, cy, 32, 0, Math.PI * 2);
  ctx.fill();

  // Peashooter Snout
  ctx.fillRect(cx + 10, cy - 14, 30, 28);
  ctx.beginPath();
  ctx.arc(cx + 40, cy, 14, 0, Math.PI * 2);
  ctx.fill();

  // Big Eye
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(cx - 10, cy - 8, 6, 0, Math.PI * 2);
  ctx.fill();

  // Flying Pea Pod projectile
  ctx.fillStyle = '#86efac';
  ctx.beginPath();
  ctx.arc(cx + 65, cy, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawUndertaleArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.46;

  // Battle Box (White border, black interior)
  ctx.fillStyle = '#000000';
  ctx.fillRect(cx - 60, cy - 45, 120, 90);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.strokeRect(cx - 60, cy - 45, 120, 90);

  // Red Heart Soul dodging
  ctx.fillStyle = '#ef4444';
  drawHeart(ctx, cx, cy, 18);

  // Sans bone attack spears
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 45, cy - 40, 8, 40);
  ctx.fillRect(cx + 35, cy, 8, 40);

  // Glowing Cyan/Blue eye
  ctx.fillStyle = '#06b6d4';
  ctx.beginPath();
  ctx.arc(cx + 40, cy - 65, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawHeart(ctx, x, y, size) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y + size * 0.3);
  ctx.bezierCurveTo(x - size, y - size * 0.5, x - size * 0.5, y - size, x, y - size * 0.3);
  ctx.bezierCurveTo(x + size * 0.5, y - size, x + size, y - size * 0.5, x, y + size * 0.3);
  ctx.fill();
  ctx.restore();
}

function drawCupheadArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.46;

  // White porcelain cup head
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(cx, cy, 40, 0, Math.PI);
  ctx.fill();
  ctx.fillRect(cx - 40, cy - 10, 80, 10);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Striped Red/White Straw
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(cx + 10, cy - 10);
  ctx.lineTo(cx + 30, cy - 50);
  ctx.lineTo(cx + 50, cy - 45);
  ctx.stroke();

  // Big pie cartoon eyes
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.ellipse(cx - 16, cy + 8, 10, 16, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 16, cy + 8, 10, 16, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawShellShockersArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;

  // Egg Character
  ctx.fillStyle = '#fef3c7';
  ctx.beginPath();
  ctx.ellipse(cx, cy, 38, 48, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Military Green Helmet
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.ellipse(cx, cy - 25, 42, 26, 0, Math.PI, 0);
  ctx.fill();

  // Twin tactical pistols
  ctx.fillStyle = '#334155';
  ctx.fillRect(cx - 52, cy + 8, 20, 10);
  ctx.fillRect(cx + 32, cy + 8, 20, 10);
  ctx.restore();
}

function drawKrunkerArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;

  // Blocky voxel weapon and scope
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, 42, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx - 55, cy);
  ctx.lineTo(cx + 55, cy);
  ctx.moveTo(cx, cy - 55);
  ctx.lineTo(cx, cy + 55);
  ctx.stroke();

  // Voxel Block
  ctx.fillStyle = '#ca8a04';
  ctx.fillRect(cx - 16, cy - 16, 32, 32);
  ctx.restore();
}

function drawBadIceCreamArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.46;

  // Ice block labyrinth tiles
  ctx.fillStyle = '#bae6fd';
  ctx.fillRect(cx - 60, cy + 30, 36, 36);
  ctx.fillRect(cx + 24, cy + 30, 36, 36);

  // Vanilla Ice Cream Scoop
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(cx, cy, 38, 0, Math.PI * 2);
  ctx.fill();

  // Eyes and cherry on top
  ctx.fillStyle = '#ef4444'; // Cherry
  ctx.beginPath();
  ctx.arc(cx, cy - 38, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(cx - 12, cy, 4, 0, Math.PI * 2);
  ctx.arc(cx + 12, cy, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawCutTheRopeArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;

  // Hanging Twine Rope
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w * 0.2, 0);
  ctx.quadraticCurveTo(cx - 20, cy * 0.5, cx, cy - 10);
  ctx.stroke();

  // Swirling Peppermint Candy
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(cx, cy - 10, 26, 0, Math.PI * 2);
  ctx.fill();

  // White peppermint spirals
  ctx.fillStyle = '#ffffff';
  for (let a = 0; a < 4; a++) {
    ctx.beginPath();
    ctx.arc(cx, cy - 10, 26, a * 1.57, a * 1.57 + 0.78);
    ctx.lineTo(cx, cy - 10);
    ctx.fill();
  }

  // Om Nom's green mouth waiting below
  ctx.fillStyle = '#16a34a';
  ctx.beginPath();
  ctx.arc(cx, cy + 55, 38, Math.PI, 0);
  ctx.fill();
  ctx.restore();
}

function drawWorldsHardestArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;

  // Green Safe Zones
  ctx.fillStyle = '#86efac';
  ctx.fillRect(cx - 65, cy - 45, 30, 90);
  ctx.fillRect(cx + 35, cy - 45, 30, 90);

  // Red Precision Square
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(cx - 15, cy - 15, 30, 30);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3;
  ctx.strokeRect(cx - 15, cy - 15, 30, 30);

  // Blue Bouncing Orbs
  ctx.fillStyle = '#2563eb';
  ctx.beginPath();
  ctx.arc(cx - 2, cy - 34, 10, 0, Math.PI * 2);
  ctx.arc(cx - 2, cy + 34, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawTankTroubleArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;

  // Green Tank
  ctx.fillStyle = '#16a34a';
  ctx.fillRect(cx - 50, cy - 16, 32, 32);
  ctx.fillRect(cx - 30, cy - 4, 25, 8); // Cannon barrel

  // Red Tank
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(cx + 18, cy - 16, 32, 32);
  ctx.fillRect(cx + 5, cy - 4, 25, 8);

  // Bouncing Cannonball with speed trail
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawChessArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;

  // Checkerboard mini section
  const cs = 26;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#e2e8f0' : '#475569';
      ctx.fillRect(cx - cs * 1.5 + c * cs, cy - cs * 1.5 + r * cs, cs, cs);
    }
  }

  // White Knight piece silhouette
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 64px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('♞', cx, cy);
  ctx.restore();
}

function drawBasketballArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.46;

  // Orange Pebble Basketball
  ctx.fillStyle = '#ea580c';
  ctx.beginPath();
  ctx.arc(cx, cy, 42, 0, Math.PI * 2);
  ctx.fill();

  // Basketball black rib lines
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - 42, cy);
  ctx.lineTo(cx + 42, cy);
  ctx.moveTo(cx, cy - 42);
  ctx.lineTo(cx, cy + 42);
  ctx.arc(cx, cy, 42, 0, Math.PI * 2);
  ctx.stroke();

  // Hoop Rim & Net below
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.ellipse(cx, cy + 45, 45, 12, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawStickWarArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.45;

  // Golden Spartan Shield
  ctx.fillStyle = '#ca8a04';
  ctx.beginPath();
  ctx.arc(cx, cy, 40, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 6;
  ctx.stroke();

  // Lambda Greek Symbol on shield
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(cx - 18, cy + 20);
  ctx.lineTo(cx, cy - 20);
  ctx.lineTo(cx + 18, cy + 20);
  ctx.stroke();

  // Spear crossing
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx - 45, cy + 45);
  ctx.lineTo(cx + 45, cy - 45);
  ctx.stroke();
  ctx.restore();
}

function drawSmashKartsArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;

  // Red Go-Kart Body
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(cx - 42, cy - 15, 84, 30);

  // Wheels
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cx - 38, cy - 28, 16, 12);
  ctx.fillRect(cx + 22, cy - 28, 16, 12);
  ctx.fillRect(cx - 38, cy + 16, 16, 12);
  ctx.fillRect(cx + 22, cy + 16, 16, 12);

  // Rocket mounted on roof
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(cx - 20, cy - 8, 40, 16);
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.moveTo(cx + 20, cy - 8);
  ctx.lineTo(cx + 34, cy);
  ctx.lineTo(cx + 20, cy + 8);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawFallBoysArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;

  // Pink Jellybean Bean Character
  ctx.fillStyle = '#ec4899';
  ctx.beginPath();
  ctx.ellipse(cx, cy, 34, 46, 0, 0, Math.PI * 2);
  ctx.fill();

  // White Faceplate
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(cx, cy - 10, 20, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyes
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(cx - 8, cy - 10, 4, 0, Math.PI * 2);
  ctx.arc(cx + 8, cy - 10, 4, 0, Math.PI * 2);
  ctx.fill();

  // Gold Crown on head
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.moveTo(cx - 20, cy - 42);
  ctx.lineTo(cx - 12, cy - 32);
  ctx.lineTo(cx, cy - 45);
  ctx.lineTo(cx + 12, cy - 32);
  ctx.lineTo(cx + 20, cy - 42);
  ctx.lineTo(cx + 16, cy - 28);
  ctx.lineTo(cx - 16, cy - 28);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawFnfArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.45;

  // Neon Rhythm Arrow Keys: Left (Purple), Down (Cyan), Up (Green), Right (Red)
  const arrows = [
    [-36, '#a855f7', '←'],
    [-12, '#06b6d4', '↓'],
    [12, '#22c55e', '↑'],
    [36, '#ef4444', '→'],
  ];

  arrows.forEach(([ox, col, sym]) => {
    ctx.fillStyle = col;
    ctx.font = 'bold 36px "Chakra Petch", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(sym, cx + ox, cy - 10);
  });

  // Microphone
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.arc(cx, cy + 40, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(cx - 5, cy + 45, 10, 25);
  ctx.restore();
}

function drawDuckLifeArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;

  // Yellow Duckling
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.arc(cx, cy + 8, 30, 0, Math.PI * 2); // Body
  ctx.arc(cx + 16, cy - 20, 22, 0, Math.PI * 2); // Head
  ctx.fill();

  // Orange Beak
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.moveTo(cx + 34, cy - 22);
  ctx.lineTo(cx + 52, cy - 18);
  ctx.lineTo(cx + 34, cy - 12);
  ctx.closePath();
  ctx.fill();

  // Eye
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(cx + 25, cy - 22, 4, 0, Math.PI * 2);
  ctx.fill();

  // Blue Champion Headband
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(cx + 5, cy - 28, 24, 6);
  ctx.restore();
}

function drawPortalArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;

  // Blue Portal Oval
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.ellipse(cx - 30, cy, 22, 44, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Orange Portal Oval
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.ellipse(cx + 30, cy, 22, 44, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawSlitherArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;

  // Glowing segmented neon snake
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = primary;
    ctx.beginPath();
    ctx.arc(cx - 35 + i * 11, cy + Math.sin(i * 0.7) * 18, 14 - i * 0.8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Snake Glowing Eyes
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx + 42, cy - 4, 4, 0, Math.PI * 2);
  ctx.arc(cx + 42, cy + 4, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPaperIoArt(ctx, w, h, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;

  // Colored territory fill
  ctx.fillStyle = primary + '44';
  ctx.fillRect(cx - 50, cy - 40, 100, 80);

  // Moving Origami Cube
  ctx.fillStyle = primary;
  ctx.fillRect(cx - 16, cy - 16, 32, 32);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.strokeRect(cx - 16, cy - 16, 32, 32);
  ctx.restore();
}

function drawGenreFallbackArt(ctx, w, h, category, primary, accent) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.48;

  // Elegant stylized geometric backdrop
  const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 80);
  grad.addColorStop(0, primary + '55');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, 80, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px "Chakra Petch", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const catLower = (category || '').toLowerCase();
  let icon = '▶';
  if (catLower.includes('action')) icon = '⚔️';
  else if (catLower.includes('driv') || catLower.includes('car')) icon = '🏎️';
  else if (catLower.includes('puzz')) icon = '🧩';
  else if (catLower.includes('strat')) icon = '🛡️';
  else if (catLower.includes('sport')) icon = '⚡';
  else if (catLower.includes('retro')) icon = '👾';
  else icon = '🕹️';

  ctx.fillText(icon, cx, cy);
  ctx.restore();
}

function drawVipRibbon(ctx, w, h) {
  ctx.save();
  // Corner VIP Golden Badge
  ctx.translate(w - 70, 0);
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(70, 0);
  ctx.lineTo(70, 70);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#000000';
  ctx.font = '900 13px "Chakra Petch", sans-serif';
  ctx.save();
  ctx.translate(46, 24);
  ctx.rotate(Math.PI / 4);
  ctx.textAlign = 'center';
  ctx.fillText('VIP', 0, 0);
  ctx.restore();
  ctx.restore();
}

/**
 * React Component for rendering game thumbnails in HUD & Menus
 */
export const GameThumbnail = ({ game, isVip = false, className = 'w-16 h-16' }) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGameCoverArt(ctx, game, 0, 0, canvas.width, canvas.height, isVip || game?.vip);
      }
    }
  }, [game, isVip]);

  return (
    <canvas
      ref={canvasRef}
      width={128}
      height={128}
      className={`rounded-lg object-cover shadow-md ${className}`}
    />
  );
};
