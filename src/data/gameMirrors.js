// High-performance verified unblocked mirrors and embed fallbacks
// Allows users to switch mirrors with 1 click if any link is blocked by a school firewall.

export const VERIFIED_GAME_MIRRORS = {
  minecraft: [
    {
      name: 'Eaglercraft 1.8.8 (Full WebGL)',
      url: 'https://eaglercraft.com/mc/1.8.8/',
      type: 'webgl',
      tag: 'Recommended',
    },
    {
      name: 'Minecraft Classic Official',
      url: 'https://classic.minecraft.net/',
      type: 'official',
      tag: 'Mojang',
    },
    {
      name: 'Paper Minecraft 2D (TurboWarp)',
      url: 'https://turbowarp.org/10128407/embed',
      type: 'sandbox',
      tag: 'Fast',
    },
    {
      name: 'Bloxd.io 3D Voxel World',
      url: 'https://bloxd.io/',
      type: 'voxel',
      tag: 'Multiplayer',
    },
  ],
  roblox: [
    {
      name: 'Bloxd.io (Unblocked Roblox & Obby)',
      url: 'https://bloxd.io/',
      type: 'sandbox',
      tag: 'Recommended',
    },
    {
      name: 'Roblox Cloud Unblocked (Mirror 1)',
      url: 'https://nowgg.nl/play/roblox-corporation/5349/roblox.html',
      type: 'cloud',
      tag: 'Cloud Stream',
    },
    {
      name: 'Roblox Cloud Unblocked (Mirror 2)',
      url: 'https://nowgg.me/play/roblox-corporation/5349/roblox.html',
      type: 'cloud',
      tag: 'Backup',
    },
  ],
  'roblox-obby-3d': [
    {
      name: 'Tower of Hell 3D Parkour',
      url: 'https://bloxd.io/',
      type: 'parkour',
      tag: 'Recommended',
    },
    {
      name: 'Roblox Obby Web Stream',
      url: 'https://nowgg.nl/play/roblox-corporation/5349/roblox.html',
      type: 'cloud',
      tag: 'Cloud',
    },
  ],
  slope: [
    {
      name: 'Slope 3D GitHub High-Speed',
      url: 'https://kdata1.com/2020/05/slope/',
      type: 'unity',
      tag: 'Recommended',
    },
    {
      name: 'Slope Online Direct',
      url: 'https://slopegame.online/',
      type: 'html5',
      tag: 'Fast',
    },
    {
      name: 'Retro Arcade Spot Mirror',
      url: 'https://static.arcadespot.com/retro/slope/',
      type: 'retro',
      tag: 'Backup',
    },
  ],
  'run-3': [
    {
      name: 'Run 3 Cosmic Tunnel',
      url: 'https://run3.io/',
      type: 'html5',
      tag: 'Original',
    },
    {
      name: 'Run 3 GameDistribution CDN',
      url: 'https://html5.gamedistribution.com/rvvASMiM/655b357b98764ef1a08468b65313a362/',
      type: 'cdn',
      tag: 'High Speed',
    },
  ],
  '1v1-lol': [
    {
      name: '1v1.LOL Official Web',
      url: 'https://1v1.lol/',
      type: 'multiplayer',
      tag: 'Official',
    },
    {
      name: '1v1.LOL GitHub Pages Mirror',
      url: 'https://1v1-lol.github.io/',
      type: 'github',
      tag: 'Unblocked',
    },
  ],
  'retro-bowl': [
    {
      name: 'Retro Bowl High-Speed Host',
      url: 'https://game316009.host/',
      type: 'html5',
      tag: 'Recommended',
    },
    {
      name: 'Retro Bowl GitHub Mirror',
      url: 'https://retro-bowl.github.io/',
      type: 'github',
      tag: 'Unblocked',
    },
  ],
  'subway-surfers': [
    {
      name: 'Subway Surfers Online',
      url: 'https://subwaysurfersgame.online/',
      type: 'unity',
      tag: 'Recommended',
    },
    {
      name: 'Subway Surfers GitHub Mirror',
      url: 'https://subway-surfers.github.io/',
      type: 'github',
      tag: 'Unblocked',
    },
  ],
  'tunnel-rush': [
    {
      name: 'Tunnel Rush Official',
      url: 'https://tunnelrush.io/',
      type: 'html5',
      tag: 'Recommended',
    },
  ],
  'smash-karts': [
    {
      name: 'Smash Karts 3D Arena',
      url: 'https://smashkarts.io/',
      type: 'multiplayer',
      tag: 'Recommended',
    },
  ],
  'cookie-clicker': [
    {
      name: 'Cookie Clicker Orteil Web',
      url: 'https://orteil.dashnet.org/cookieclicker/',
      type: 'official',
      tag: 'Official',
    },
    {
      name: 'Cookie Clicker Mirror',
      url: 'https://cookieclicker.ee/',
      type: 'mirror',
      tag: 'Fast',
    },
  ],
  'geometry-dash': [
    {
      name: 'Geometry Dash Lite Web',
      url: 'https://geometrydashlite.io/',
      type: 'html5',
      tag: 'Recommended',
    },
    {
      name: 'Geometry Dash TurboWarp',
      url: 'https://turbowarp.org/105500895/embed',
      type: 'scratch',
      tag: 'Unblocked',
    },
  ],
  fnaf: [
    {
      name: 'FNAF 1 GitHub Unblocked',
      url: 'https://fnaf-unblocked.github.io/',
      type: 'horror',
      tag: 'Recommended',
    },
    {
      name: 'FNAF 2 GitHub Unblocked',
      url: 'https://fnaf2.github.io/',
      type: 'horror',
      tag: 'FNAF 2',
    },
  ],
  'superhot-web': [
    {
      name: 'Superhot 3D Time-Shift',
      url: 'https://superhot.online/',
      type: 'webgl',
      tag: 'Recommended',
    },
  ],
};

/**
 * Returns available mirrors for a game, defaulting to its primary URL
 */
export function getGameMirrors(game) {
  if (!game) return [];
  const key = (game.artKey || game.id || '').toLowerCase();
  
  // Look for direct key match or partial match
  let mirrors = null;
  if (VERIFIED_GAME_MIRRORS[key]) {
    mirrors = VERIFIED_GAME_MIRRORS[key];
  } else {
    for (const [k, list] of Object.entries(VERIFIED_GAME_MIRRORS)) {
      if (key.includes(k)) {
        mirrors = list;
        break;
      }
    }
  }

  if (mirrors && mirrors.length > 0) {
    return mirrors;
  }

  // Fallback to game's own URL
  return [
    {
      name: 'Primary Unblocked Host',
      url: game.url,
      type: 'direct',
      tag: 'Default',
    },
  ];
}
