// lilguymaker · carryables · svg canvas

const Canvas = {
  zoom: 1,
  view: 'front',
  panX: 0,
  panY: 0,

  get root() { return document.getElementById('canvas-root') },
  get svg() { return document.getElementById('main-canvas') },

  clear() {
    this.root.innerHTML = ''
    this._base = null
  },

  setZoom(z) {
    this.zoom = z
    const bg = document.getElementById('canvas-bg')
    bg.style.transform = `scale(${z})`
  },

  resetView() {
    this.zoom = 1
    this.panX = 0
    this.panY = 0
    document.getElementById('zoom-select').value = '1'
    const bg = document.getElementById('canvas-bg')
    bg.style.transform = 'scale(1)'
  },

  setView(v) {
    this.view = v
    // placeholder: in a full implementation, rotate/tilt the canvas
    // front: straight-on, hanging: slight perspective tilt, tabletop: top-down
    const angles = { front: 'none', hanging: 'perspective(800px) rotateX(5deg)', tabletop: 'perspective(600px) rotateX(45deg)' }
    this.root.style.transform = angles[v] || 'none'
  },

  drawBase(carryableId) {
    // render a simplified base carryable on the svg canvas
    const c = CARRYABLES.find(x => x.id === carryableId)
    if (!c) return
    const existing = this.root.querySelector('.base-layer')
    if (existing) existing.remove()
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    g.setAttribute('class', 'base-layer')
    g.setAttribute('transform', 'translate(400, 200)')
    // simple placeholder shape per carryable type
    g.innerHTML = `<text text-anchor="middle" dominant-baseline="middle" font-size="48" dy="0">${c.emoji}</text><text text-anchor="middle" dominant-baseline="middle" font-family="Poppins,sans-serif" font-size="11" fill="#8A8880" dy="38">${c.label}</text>`
    this.root.appendChild(g)
    this._base = { id: carryableId, g }
  },

  drawItem(item) {
    const piece = ALL_PIECES.find(p => p.id === item.pieceId)
    if (!piece) return
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    g.setAttribute('class', 'piece-layer')
    g.setAttribute('data-item-id', item.id)
    g.setAttribute('transform', `translate(${item.x}, ${item.y}) rotate(${item.rotation})`)
    g.innerHTML = `<text text-anchor="middle" dominant-baseline="middle" font-size="28">${piece.emoji}</text>`
    g.style.cursor = 'move'
    this._makeDraggable(g, item)
    g.onclick = () => this._selectItem(item)
    this.root.appendChild(g)
  },

  _makeDraggable(g, item) {
    let dragging = false, ox = 0, oy = 0
    g.addEventListener('mousedown', e => {
      dragging = true; ox = e.clientX - item.x; oy = e.clientY - item.y
      e.stopPropagation()
    })
    document.addEventListener('mousemove', e => {
      if (!dragging) return
      item.x = e.clientX - ox; item.y = e.clientY - oy
      g.setAttribute('transform', `translate(${item.x}, ${item.y}) rotate(${item.rotation})`)
    })
    document.addEventListener('mouseup', () => { dragging = false })
  },

  _selectItem(item) {
    AppState.selectedPieceId = item.id
    this._renderProperties(item)
  },

  _renderProperties(item) {
    const piece = ALL_PIECES.find(p => p.id === item.pieceId)
    const panel = document.getElementById('properties-panel')
    panel.innerHTML = `
      <div class="prop-section-label">${piece ? piece.emoji + ' ' + piece.label : item.pieceId}</div>
      <div class="prop-row"><span class="prop-label">x</span><input class="prop-input" type="number" value="${Math.round(item.x)}" onchange="Canvas._updateItem('${item.id}','x',+this.value)"></div>
      <div class="prop-row"><span class="prop-label">y</span><input class="prop-input" type="number" value="${Math.round(item.y)}" onchange="Canvas._updateItem('${item.id}','y',+this.value)"></div>
      <div class="prop-row"><span class="prop-label">rotation</span><input class="prop-input" type="number" value="${item.rotation}" onchange="Canvas._updateItem('${item.id}','rotation',+this.value)"></div>
      <div class="prop-row"><span class="prop-label">scale</span><input class="prop-input" type="number" value="${item.scale}" step="0.1" onchange="Canvas._updateItem('${item.id}','scale',+this.value)"></div>
      <div class="prop-section-label" style="margin-top:8px">material</div>
      <div class="prop-chips">${MATERIALS.map(m=>`<button class="prop-chip${item.material===m.id?' active':''}" onclick="Canvas._updateItem('${item.id}','material','${m.id}')">${m.label}</button>`).join('')}</div>
      <div style="margin-top:10px"><button onclick="Canvas._deleteItem('${item.id}')" style="font-size:10px;color:#E55;background:none;border:1.5px solid #E55;border-radius:6px;padding:4px 10px;cursor:pointer;font-family:inherit">delete</button></div>
    `
  },

  _updateItem(id, key, val) {
    const item = AppState.canvasItems.find(i => i.id === id)
    if (!item) return
    item[key] = val
    const g = this.root.querySelector(`[data-item-id="${id}"]`)
    if (g) g.setAttribute('transform', `translate(${item.x}, ${item.y}) rotate(${item.rotation}) scale(${item.scale})`)
    this._renderProperties(item)
  },

  _deleteItem(id) {
    AppState.canvasItems = AppState.canvasItems.filter(i => i.id !== id)
    const g = this.root.querySelector(`[data-item-id="${id}"]`)
    if (g) g.remove()
    document.getElementById('properties-panel').innerHTML = '<div class="props-empty">select a piece to edit its properties</div>'
  },

  exportPng(transparent) {
    const svgEl = this.svg
    const serializer = new XMLSerializer()
    const svgStr = serializer.serializeToString(svgEl)
    const img = new Image()
    const blob = new Blob([svgStr], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = svgEl.width.baseVal.value * 2
      canvas.height = svgEl.height.baseVal.value * 2
      const ctx = canvas.getContext('2d')
      if (!transparent) { ctx.fillStyle = '#F0EDE6'; ctx.fillRect(0, 0, canvas.width, canvas.height) }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      const a = document.createElement('a')
      a.download = 'lilguy.png'
      a.href = canvas.toDataURL('image/png')
      a.click()
    }
    img.src = url
  },

  exportSvg() {
    const svgEl = this.svg
    const serializer = new XMLSerializer()
    const svgStr = serializer.serializeToString(svgEl)
    const blob = new Blob([svgStr], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.download = 'lilguy.svg'; a.href = url; a.click()
    URL.revokeObjectURL(url)
  },
}
