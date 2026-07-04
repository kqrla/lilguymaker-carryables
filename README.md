# lilguymaker | carryables customizer

a modular design studio for everyday carry accessories. inspired by picrew, built for bags.

> assemble realistic carryable accessories from interchangeable parts — keychains, carabiners, phone charms, lanyards, and more.

## what is this

lilguymaker lets you build custom everyday carry accessories ("carryables") from a curated library of modular parts. every piece — charms, clasps, chains, beads, ribbons — is an independent object with defined connection points that snap together naturally.

## supported carryables

- keychains · keyrings · carabiners · bag charms · zipper pulls · phone charms
- wrist straps · lanyards · id holders · badge reels · luggage tags
- airtag holders · camera straps · sanitizer holders

## architecture

the asset system is the foundation. every piece has:
- an `id` and `category`
- svg geometry
- named connection points (`accepts: [...]`)
- material / finish properties

this means any future category (bracelets, ita bags, necklaces) can reuse the same asset library.

## structure

```
index.html          webapp entry
src/
  app.js            main application
  canvas.js         svg canvas + interaction
  data.js           asset registry
assets/
  schema.json       data model definition
  carryables.json   base carryable definitions
  pieces.json       piece / charm definitions
styles/
  main.css          global styles
```

## figma plugin

the plugin version lives separately and uses the same asset vocabulary. select your base, pick your pieces, and export directly to your figma file as editable layers.

## roadmap

- [ ] full svg asset library (phase 1: carryables)
- [ ] snap-to-connection-point logic
- [ ] material + color system
- [ ] export: png / transparent png / svg / figma frame
- [ ] save / load presets
- [ ] shareable links
- [ ] future categories: bracelets, necklaces, ita bags
