# SYMI — storefront

Front end for **SYMI**, a contemporary Sri Lankan streetwear label.
Light editorial styling: warm concrete paper, near-black condensed display
type, full-bleed dark bands. Built to match the FW26 look book.

## Stack

- **Next.js 16** (App Router, React 19)
- **Tailwind CSS v4** with **shadcn/ui** (Radix base, Nova preset)
- **motion** (Framer Motion) for animation
- **MagicUI** registry components: marquee, blur-fade, number-ticker,
  animated-shiny-text
- TypeScript throughout

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

Node 20 or newer.

## Layout

```
src/
  app/
    layout.tsx          fonts (Anton + Archivo), metadata
    page.tsx            composes every section
    globals.css         SYMI theme tokens + shadcn tokens
  components/
    ui/                 shadcn + MagicUI primitives
    cart/               cart context + slide-out drawer (shadcn sheet)
    store/              storefront sections
    providers.tsx       wraps the tree in the cart provider
  lib/
    site.ts             brand, nav, catalogue, stats  — edit this
    art.tsx             generated SVG placeholders
```

## Sections

Announcement marquee · sticky header · hero (“Define your style”) ·
sub-nav strip · **The Latest** grid · **Built Different** stat band ·
**Shop by Category** tiles · **New Arrivals** rail (with the SYMI Handloom
piece) · **Last Chance** sale band · **Rooted in Culture** story ·
**@SYMI** Instagram marquee · **Stay in the Loop** newsletter · footer ·
slide-out bag (seeded with two pieces).

## Editing content

`src/lib/site.ts` holds everything: brand details, nav labels, the
catalogue, marketing stats. Adding a product is one line. Set
`image: "/products/whatever.jpg"` and the card swaps its drawing for the
photo — portrait 4:5 crops look best. Flags on a product:

- `latest` — shows in The Latest
- `arrival` — shows in New Arrivals
- `handloom` — adds the price chip on the image
- `seedCart` — pre-loads it into the bag

`art` picks the placeholder line drawing: `tee` `polo` `jacket`
`overshirt` `hoodie` `kamis` `dress` `pant` `cap` `bandana` `tote`.

Theme tokens live at the top of `src/app/globals.css`. Change
`--background` / `--foreground` and the whole site follows.

## Before this becomes a real shop

- Real photography for every product and the editorial slots
- Stock counts, so sold-out shows as sold-out
- Payment: LankaQR, Visa/Mastercard, KOKO, cash on delivery
- A real checkout and order pipeline behind “Proceed to checkout”
- A CMS or admin screen so staff add products without a developer

Placeholder art and copy are illustrative.
