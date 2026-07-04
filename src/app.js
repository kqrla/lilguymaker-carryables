// lilguymaker · carryables · main app

const AppState = {
  activeCarryable: null,
  activeCategory: 'charms',
  selectedPieceId: null,
  canvasItems: [], // { id, pieceId, x, y, rotation, scale, color, material }
  searchQuery: '',
}

// ── Init ──────────────────────────────────────────────────────────────────────

function init() {
  renderCarryableList()
  renderCategoryTabs()
  renderAssetGrid()
  setupSearch()
  setupViewButtons()
  setupZoom()
}

// ── Carryable list ────────────────────────────────────────────────────────────

function renderCarryableList() {
  const list = document.getElementById('carryable-list')
  list.innerHTML = ''
  CARRYABLES.forEach(c => {
    const item = document.createElement('div')
    item.className = 'carryable-item' + (AppState.activeCarryable === c.id ? ' active' : '')
    item.innerHTML = `<span class="ci-emoji">${c.emoji}</span> ${c.label}`
    item.onclick = () => selectCarryable(c.id)
    list.appendChild(item)
  })
}

function selectCarryable(id) {
  AppState.activeCarryable = id
  renderCarryableList()
  Canvas.drawBase(id)
  document.getElementById('canvas-empty').classList.add('hidden')
}

// ── Category tabs ─────────────────────────────────────────────────────────────

function renderCategoryTabs() {
  const tabs = document.getElementById('cat-tabs')
  tabs.innerHTML = ''
  Object.keys(PIECES).forEach(cat => {
    const btn = document.createElement('button')
    btn.className = 'cat-tab' + (AppState.activeCategory === cat ? ' active' : '')
    btn.textContent = cat
    btn.onclick = () => { AppState.activeCategory = cat; renderCategoryTabs(); renderAssetGrid() }
    tabs.appendChild(btn)
  })
}

// ── Asset grid ────────────────────────────────────────────────────────────────

function renderAssetGrid() {
  const grid = document.getElementById('asset-grid')
  grid.innerHTML = ''
  const q = AppState.searchQuery.toLowerCase()
  let items = PIECES[AppState.activeCategory] || []
  if (q) items = ALL_PIECES.filter(p => p.label.toLowerCase().includes(q) || p.id.includes(q))
  items.forEach(p => {
    const item = document.createElement('div')
    item.className = 'asset-item'
    item.draggable = true
    item.innerHTML = `<span class="asset-icon">${p.emoji}</span>${p.label}`
    item.ondblclick = () => addPieceToCanvas(p.id)
    item.ondragstart = e => { e.dataTransfer.setData('pieceId', p.id) }
    grid.appendChild(item)
  })
}

function addPieceToCanvas(pieceId) {
  const id = Date.now().toString()
  const item = { id, pieceId, x: 400 + (Math.random()-0.5)*80, y: 320 + (Math.random()-0.5)*80, rotation: 0, scale: 1, color: '#C8B8F0', material: 'matte' }
  AppState.canvasItems.push(item)
  Canvas.drawItem(item)
  document.getElementById('canvas-empty').classList.add('hidden')
}

// ── Search ────────────────────────────────────────────────────────────────────

function setupSearch() {
  document.getElementById('search-input').addEventListener('input', e => {
    AppState.searchQuery = e.target.value
    if (AppState.searchQuery) {
      // search across all categories
      const allItems = ALL_PIECES.filter(p => p.label.toLowerCase().includes(AppState.searchQuery.toLowerCase()))
      renderSearchResults(allItems)
    } else {
      renderAssetGrid()
    }
  })
}

function renderSearchResults(items) {
  const grid = document.getElementById('asset-grid')
  grid.innerHTML = ''
  if (items.length === 0) {
    grid.innerHTML = '<div style="font-size:10px;color:#B0AEA8;grid-column:1/-1;padding:8px 2px">no results</div>'
    return
  }
  items.forEach(p => {
    const item = document.createElement('div')
    item.className = 'asset-item'
    item.draggable = true
    item.innerHTML = `<span class="asset-icon">${p.emoji}</span>${p.label}`
    item.ondblclick = () => addPieceToCanvas(p.id)
    item.ondragstart = e => e.dataTransfer.setData('pieceId', p.id)
    grid.appendChild(item)
  })
}

// ── View buttons ──────────────────────────────────────────────────────────────

function setupViewButtons() {
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      Canvas.setView(btn.dataset.view)
    }
  })
}

// ── Zoom ──────────────────────────────────────────────────────────────────────

function setupZoom() {
  document.getElementById('zoom-select').onchange = e => {
    Canvas.setZoom(parseFloat(e.target.value))
  }
}

function resetView() { Canvas.resetView() }
function clearCanvas() {
  AppState.canvasItems = []
  AppState.activeCarryable = null
  Canvas.clear()
  renderCarryableList()
  document.getElementById('canvas-empty').classList.remove('hidden')
}

// ── Export modal ──────────────────────────────────────────────────────────────

function openExport() { document.getElementById('export-modal').style.display = 'flex' }
function closeExport() { document.getElementById('export-modal').style.display = 'none' }

function exportAs(format) {
  closeExport()
  if (format === 'png') { Canvas.exportPng(false) }
  else if (format === 'transparent-png') { Canvas.exportPng(true) }
  else if (format === 'svg') { Canvas.exportSvg() }
  else if (format === 'figma') { alert('open the lilguymaker figma plugin and use "add to figma" there') }
}

// ── Canvas drop ───────────────────────────────────────────────────────────────

document.getElementById('canvas-wrap').addEventListener('dragover', e => e.preventDefault())
document.getElementById('canvas-wrap').addEventListener('drop', e => {
  e.preventDefault()
  const pieceId = e.dataTransfer.getData('pieceId')
  if (pieceId) addPieceToCanvas(pieceId)
})

// ── Boot ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', init)
