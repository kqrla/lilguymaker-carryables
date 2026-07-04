// lilguymaker · carryables · asset registry
// the asset system is the foundation — every piece is defined here
// with its connection points so future categories can reuse the same library

const CARRYABLES = [
  { id: 'keychain',         label: 'keychain',          emoji: '🗝️',  color: '#FFF0A0' },
  { id: 'keyring',          label: 'keyring',           emoji: '⭕',   color: '#EAE0FF' },
  { id: 'carabiner',        label: 'carabiner',         emoji: '🔗',   color: '#C8EAD8' },
  { id: 'bag-charm',        label: 'bag charm',         emoji: '🎀',   color: '#FFD6E4' },
  { id: 'zipper-pull',      label: 'zipper pull',       emoji: '🪡',   color: '#FFE8C0' },
  { id: 'phone-charm',      label: 'phone charm',       emoji: '📱',   color: '#C0E8F8' },
  { id: 'wrist-strap',      label: 'wrist strap',       emoji: '⌚',   color: '#F0DCC8' },
  { id: 'lanyard',          label: 'lanyard',           emoji: '🏷️',  color: '#C8F0E0' },
  { id: 'id-holder',        label: 'id holder',         emoji: '🪪',   color: '#FFD8B0' },
  { id: 'badge-reel',       label: 'badge reel',        emoji: '🔘',   color: '#E0E0E0' },
  { id: 'luggage-tag',      label: 'luggage tag',       emoji: '🏷️',  color: '#F8E8A0' },
  { id: 'airtag-holder',    label: 'airtag holder',     emoji: '📡',   color: '#E0E0FF' },
  { id: 'camera-strap',     label: 'camera strap',      emoji: '📷',   color: '#E8D8C0' },
  { id: 'sanitizer-holder', label: 'sanitizer holder',  emoji: '🧴',   color: '#C8F8C0' },
]

// each piece is an asset with connection points
// accepts: which connection point types it can attach to
// provides: what connection points it exposes for other pieces
const PIECES = {
  charms: [
    { id: 'star',        label: 'star',       emoji: '⭐', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'heart',       label: 'heart',      emoji: '❤️', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'moon',        label: 'moon',       emoji: '🌙', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'bell',        label: 'bell',       emoji: '🔔', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'key',         label: 'key',        emoji: '🗝️', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'flower',      label: 'flower',     emoji: '🌸', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'gem',         label: 'gem',        emoji: '💎', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'bear',        label: 'bear',       emoji: '🐻', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'skull',       label: 'skull',      emoji: '💀', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'mushroom',    label: 'mushroom',   emoji: '🍄', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'butterfly',   label: 'butterfly',  emoji: '🦋', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'strawberry',  label: 'strawberry', emoji: '🍓', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'cloud',       label: 'cloud',      emoji: '☁️', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'lightning',   label: 'lightning',  emoji: '⚡', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'cherry',      label: 'cherry',     emoji: '🍒', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'tag',         label: 'tag',        emoji: '🏷️', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'heart-lock',  label: 'heart lock', emoji: '💝', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'cat',         label: 'cat',        emoji: '🐱', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'frog',        label: 'frog',       emoji: '🐸', accepts: ['jump-ring','split-ring'], provides: [] },
    { id: 'ghost',       label: 'ghost',      emoji: '👻', accepts: ['jump-ring','split-ring'], provides: [] },
  ],
  hardware: [
    { id: 'jump-ring',     label: 'jump ring',     emoji: '⭕',  accepts: ['attachment-point'], provides: ['jump-ring'] },
    { id: 'lobster-clasp', label: 'lobster clasp', emoji: '🪝',  accepts: ['attachment-point'], provides: ['lobster-clasp'] },
    { id: 'swivel-clip',   label: 'swivel clip',   emoji: '📎',  accepts: ['attachment-point'], provides: ['swivel-clip'] },
    { id: 'split-ring',    label: 'split ring',    emoji: '🔄',  accepts: ['attachment-point'], provides: ['split-ring'] },
    { id: 'o-ring',        label: 'o-ring',        emoji: '🔵',  accepts: ['attachment-point'], provides: ['o-ring'] },
    { id: 's-hook',        label: 's-hook',        emoji: '🎣',  accepts: ['attachment-point'], provides: ['s-hook'] },
    { id: 'chain-link',    label: 'chain link',    emoji: '⛓️', accepts: ['attachment-point'], provides: ['chain'] },
    { id: 'd-ring',        label: 'd-ring',        emoji: '🅳',  accepts: ['attachment-point'], provides: ['d-ring'] },
    { id: 'eyelet',        label: 'eyelet',        emoji: '👁️', accepts: ['attachment-point'], provides: ['eyelet'] },
    { id: 'rivet',         label: 'rivet',         emoji: '🔩',  accepts: ['attachment-point'], provides: [] },
  ],
  soft: [
    { id: 'ribbon-bow', label: 'ribbon bow', emoji: '🎀', accepts: ['jump-ring','attachment-point'], provides: [] },
    { id: 'tassel',     label: 'tassel',     emoji: '🪢', accepts: ['jump-ring','attachment-point'], provides: [] },
    { id: 'pom-pom',    label: 'pom pom',    emoji: '🟣', accepts: ['jump-ring','attachment-point'], provides: [] },
    { id: 'cord',       label: 'cord',       emoji: '〰️', accepts: ['attachment-point'],             provides: [] },
    { id: 'lace',       label: 'lace trim',  emoji: '🧵', accepts: ['attachment-point'],             provides: [] },
    { id: 'yarn-knot',  label: 'yarn knot',  emoji: '🧶', accepts: ['jump-ring','attachment-point'], provides: [] },
    { id: 'faux-fur',   label: 'faux fur',   emoji: '🐑', accepts: ['attachment-point'],             provides: [] },
    { id: 'macrame',    label: 'macrame',    emoji: '🕸️', accepts: ['attachment-point'],             provides: [] },
  ],
  beads: [
    { id: 'pearl',       label: 'pearl',      emoji: '🫧', accepts: ['cord','chain','attachment-point'], provides: [] },
    { id: 'crystal',     label: 'crystal',    emoji: '🔷', accepts: ['cord','chain','attachment-point'], provides: [] },
    { id: 'alphabet',    label: 'alphabet',   emoji: '🔡', accepts: ['cord','chain','attachment-point'], provides: [] },
    { id: 'glass-bead',  label: 'glass bead', emoji: '🫐', accepts: ['cord','chain','attachment-point'], provides: [] },
    { id: 'wooden-bead', label: 'wooden',     emoji: '🟤', accepts: ['cord','chain','attachment-point'], provides: [] },
    { id: 'clay-bead',   label: 'clay bead',  emoji: '🟠', accepts: ['cord','chain','attachment-point'], provides: [] },
    { id: 'gemstone',    label: 'gemstone',   emoji: '💠', accepts: ['cord','chain','jump-ring'],        provides: [] },
    { id: 'metallic',    label: 'metallic',   emoji: '⚙️', accepts: ['cord','chain','jump-ring'],        provides: [] },
  ],
  tags: [
    { id: 'label',       label: 'label',         emoji: '🔖', accepts: ['jump-ring','attachment-point'], provides: [] },
    { id: 'engraved',    label: 'engraved tag',  emoji: '🪧', accepts: ['jump-ring','split-ring'],       provides: [] },
    { id: 'luggage-lbl', label: 'luggage label', emoji: '✈️', accepts: ['jump-ring','attachment-point'], provides: [] },
    { id: 'tiny-photo',  label: 'photo insert',  emoji: '🖼️', accepts: ['jump-ring'],                    provides: [] },
    { id: 'custom-text', label: 'custom text',   emoji: '✍️', accepts: ['jump-ring','attachment-point'], provides: [] },
  ],
}

// flatten all pieces for search
const ALL_PIECES = Object.values(PIECES).flat()

// connection point types (for snap logic)
const CONNECTION_TYPES = [
  'attachment-point', // main ring / base attachment
  'jump-ring',        // small connecting ring
  'split-ring',       // split ring
  'lobster-clasp',    // lobster claw clasp
  'swivel-clip',      // swivel clip
  'chain',            // chain link sequence
  'd-ring',           // D-shaped ring
  'eyelet',           // eyelet hole
  'cord',             // cord / string threading
  'o-ring',           // O ring
  's-hook',           // S-shaped hook
]

// material system
const MATERIALS = [
  { id: 'matte',        label: 'matte',        desc: 'flat, soft finish' },
  { id: 'glossy',       label: 'glossy',       desc: 'shiny, reflective' },
  { id: 'metallic',     label: 'metallic',     desc: 'chrome or gold look' },
  { id: 'translucent',  label: 'translucent',  desc: 'see-through / acrylic' },
  { id: 'matte-worn',   label: 'worn',         desc: 'distressed, weathered' },
]

// color palette presets
const COLOR_PRESETS = [
  { id: 'y2k',         label: 'y2k pastel',   c1: '#C8B8F0', c2: '#FFB6C1' },
  { id: 'edgy',        label: 'alt / edgy',   c1: '#C0C0C0', c2: '#FF1493' },
  { id: 'cottagecore', label: 'cottagecore',  c1: '#8B7355', c2: '#6B8E6B' },
  { id: 'monochrome',  label: 'monochrome',   c1: '#1C1C1C', c2: '#808080' },
  { id: 'bubblegum',   label: 'bubblegum',    c1: '#FF69B4', c2: '#FFD700' },
  { id: 'ocean',       label: 'ocean',        c1: '#006994', c2: '#B0E0E6' },
  { id: 'forest',      label: 'forest',       c1: '#228B22', c2: '#F5DEB3' },
  { id: 'sunset',      label: 'sunset',       c1: '#FF4500', c2: '#FFD700' },
]
