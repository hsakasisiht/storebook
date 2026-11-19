# PANDORA --- Online Book Store

## Visual Design System & UI Guidelines

**Document:** `design.md`\
**Project:** Academic Mini Project --- Online Book Store\
**Version:** 1.0\
**Visual direction:** Deep Vintage Mood\
**Related documents:** `Pandora_Online_Book_Store_PRD.md`,
`architecture.md`

> **Design intent:** Create the feeling of a curated independent
> bookstore: editorial, warm, cinematic and calm. Use the supplied Deep
> Vintage Mood reference for its earthy colour contrast and restrained
> composition---not its car imagery or page layout.

------------------------------------------------------------------------

## 1. Brand Direction

**Brand:** Pandora\
**Tagline:** *Discover Stories. Collect Worlds.*

Pandora should feel like a thoughtfully curated bookstore, not a generic
mass-market shopping template.

### Design attributes

-   Editorial and book-focused.
-   Warm, earthy and cinematic.
-   Clean hierarchy with generous whitespace.
-   Strong deep-teal structure balanced by warm cream surfaces.
-   Coral used sparingly for key actions.
-   Book covers treated as the primary visual content.

### Avoid

-   Glossy or shiny gradients.
-   Neon colours and excessive glow.
-   Excessive animation or decorative effects.
-   Too many competing accent colours.
-   Overcrowded cards and dense page layouts.
-   Using the reference image's automotive imagery or copying the
    reference website.

## 2. Approved Colour Palette

Use these exact palette values as the foundation of the interface.

  -----------------------------------------------------------------------
  Token                   Hex                     Primary use
  ----------------------- ----------------------- -----------------------
  Deep Teal               `#244855`               Navigation, headings,
                                                  footer, dark panels

  Signal Coral            `#E64833`               Primary CTA, active
                                                  states, small
                                                  highlights

  Terracotta              `#874F41`               Secondary accents,
                                                  category labels, warm
                                                  emphasis

  Muted Sage              `#90AEAD`               Supporting surfaces,
                                                  tags, subtle borders

  Warm Cream              `#FBE9D0`               Hero backgrounds, warm
                                                  cards, selected
                                                  sections
  -----------------------------------------------------------------------

### Colour roles

#### Deep Teal --- `#244855`

The main structural colour. Use it for the header, footer, important
headings, dark feature panels and strong navigation elements.

#### Signal Coral --- `#E64833`

The action colour. Reserve it for the most important button or action in
a section, active navigation states and a few small visual highlights.
Do not make every link coral.

#### Terracotta --- `#874F41`

The supporting warm accent. Use for category labels, small editorial
details, secondary emphasis and selected status treatments.

#### Muted Sage --- `#90AEAD`

The calm supporting colour. Use for soft information panels, subtle
tags, supporting UI states and low-emphasis decoration.

#### Warm Cream --- `#FBE9D0`

The warm paper-like surface. Use for hero sections, selected cards,
banners and areas that need warmth without visual heaviness.

### Suggested neutral surfaces

The PRD specifies warm off-white, white and cream content surfaces. The
following are implementation suggestions to support that direction:

  Suggested token        Value       Use
  ---------------------- ----------- -------------------------------
  Warm page background   `#F7F4EE`   Main page canvas
  White surface          `#FFFFFF`   Cards, forms and tables
  Main text              `#20313A`   Body text
  Muted text             `#62747A`   Metadata and secondary labels
  Soft border            `#E2DED6`   Dividers and card outlines

These neutral values are proposed supporting tokens; the five-colour
brand palette above remains the reference palette.

## 3. Typography

Use an editorial display face for large campaign headlines when
available, paired with a clean sans-serif for functional text.

  -----------------------------------------------------------------------
  Text role                           Direction
  ----------------------------------- -----------------------------------
  Hero headline                       Editorial serif, bold or
                                      expressive, short line length

  Page heading                        Strong, clean heading with clear
                                      hierarchy

  Book title                          Readable, medium or semibold

  Body copy                           Clean sans-serif with comfortable
                                      line-height

  Navigation                          Sans-serif, medium weight

  Metadata                            Smaller sans-serif with muted
                                      colour

  Buttons                             Sans-serif, medium or semibold
  -----------------------------------------------------------------------

### Typography rules

-   Keep headings concise and visually distinct.
-   Use readable body sizes and comfortable line spacing.
-   Avoid decorative/cursive fonts for functional UI.
-   Use consistent font weights across the same component type.
-   Do not use all-caps for long paragraphs; reserve it for small labels
    or eyebrow text.

Specific font families are not mandated by the PRD. Choose fonts
available in the project environment and document the final selection.

## 4. Layout & Spacing

-   Use a consistent page container and align major sections to the same
    content edges.
-   Give book covers enough room to be recognized.
-   Use generous vertical spacing between major sections.
-   Keep text measure comfortable; avoid very long line lengths.
-   Use a consistent spacing scale rather than arbitrary margins.
-   Use a responsive grid for book cards.
-   Keep forms and checkout content focused and easy to scan.

Suggested spacing scale (implementation token proposal):

  Token          Value Typical use
  ------------ ------- ----------------------------
  `space-1`        4px Tiny icon/text gap
  `space-2`        8px Compact control gap
  `space-3`       12px Card internals
  `space-4`       16px Standard component spacing
  `space-6`       24px Section subgroups
  `space-8`       32px Major content gaps
  `space-12`      48px Section separation
  `space-16`      64px Large page sections

These are proposed CSS tokens; adjust only to preserve a consistent
visual rhythm.

## 5. Component Design Rules

### 5.1 Header / Navigation

-   Use deep teal or warm cream as the main header surface.
-   Place the Pandora wordmark clearly.
-   Provide direct navigation to Home, Catalogue, Search, Cart and
    Account.
-   Keep the cart item count visible without making it visually
    dominant.
-   On narrow screens, collapse navigation into a compact mobile menu.
-   Clearly distinguish the current/active navigation item.

### 5.2 Hero Section

-   Use a warm cream or deep teal campaign panel.
-   Lead with a short editorial headline and a concise supporting
    sentence.
-   Include one dominant coral CTA, such as "Explore Books".
-   Use a book-related visual (book cover, stack of books or reading
    scene), not automotive imagery.
-   Keep text contrast high and avoid placing text over visually busy
    images without a readable overlay.

### 5.3 Book Cards

Book covers are the primary visual content.

Each card should show:

-   Portrait book-cover image.
-   Book title.
-   Author.
-   Price.
-   Compact category tag where useful.
-   A clear route/action to open book details.

Rules:

-   Keep book-cover aspect ratios consistent.
-   Use restrained corner rounding and subtle shadows.
-   Align card content consistently across a grid.
-   Provide a fallback image or placeholder if a cover is unavailable.
-   Avoid excessive badges and decorative labels.
-   Make the book title readable at mobile widths.

### 5.4 Catalogue & Search

-   Present the search input clearly near the catalogue heading.
-   Keep category, price and sort filters understandable.
-   Use a cream or pale neutral panel for filters.
-   Allow filters to stack cleanly on mobile.
-   Provide an explicit empty state when no books match.
-   Keep search and filter state visible enough that users understand
    why results changed.

### 5.5 Book Details

Recommended information order:

1.  Book cover.
2.  Title and author.
3.  Price and availability.
4.  Description.
5.  Category.
6.  Quantity selector and add-to-cart action.

The primary add-to-cart action should use signal coral. Out-of-stock
books should remain viewable but the purchase action must be disabled or
replaced with a clear availability message.

### 5.6 Forms --- Login, Register & Checkout

-   Use clear labels above inputs.
-   Keep related fields grouped.
-   Show field-level validation messages near the relevant input.
-   Mark required fields clearly.
-   Provide visible focus states.
-   Keep checkout summary separate from delivery details.
-   Do not request real card data, UPI PINs or banking credentials.

### 5.7 Cart

-   Make each line item easy to scan.
-   Show cover thumbnail, title, unit price, quantity and line total.
-   Provide clear quantity update and remove actions.
-   Show subtotal and next-step checkout CTA.
-   Explain when a requested quantity is unavailable.

### 5.8 Admin Dashboard & Tables

-   Use a clean white or warm-neutral surface.
-   Use deep teal for table headers and major navigation.
-   Keep data columns readable and avoid excessive visual decoration.
-   Use status labels with text, not colour alone.
-   Provide clear create/edit actions for book management.
-   Use confirmation before destructive actions.

Suggested status treatments:

  Status      Suggested treatment
  ----------- ----------------------------------
  Pending     Muted sage or neutral
  Confirmed   Deep teal
  Shipped     Muted sage
  Delivered   Terracotta or a distinct neutral
  Cancelled   Signal coral

The status text must always remain visible; colour is supplementary.

### 5.9 Footer

-   Use deep teal background.
-   Use warm cream text.
-   Include concise navigation and project/store information.
-   Keep the footer visually quiet and avoid overcrowding.

## 6. Buttons & Interaction States

### Primary button

-   Signal coral background.
-   Cream/white label.
-   Medium corner radius.
-   Clear hover, focus, pressed and disabled states.
-   One dominant primary action per section where possible.

### Secondary button

-   Deep teal outline or text treatment.
-   Use for less prominent actions such as "Continue Shopping" or
    "Back".

### Destructive action

-   Use coral carefully and pair it with explicit wording.
-   Ask for confirmation before deleting or performing irreversible
    admin actions.

### Required UI states

Every data-driven component should account for:

-   Loading.
-   Success.
-   Empty.
-   Validation error.
-   API/network error.
-   Disabled/unavailable.
-   Hover, focus and pressed states for interactive controls.

Do not show a success message until the backend confirms the operation.

## 7. Responsive Behaviour

The application must work on desktop, tablet and mobile.

  ---------------------------------------------------------------------------
  Area              Desktop           Tablet            Mobile
  ----------------- ----------------- ----------------- ---------------------
  Header            Full navigation   Compact           Collapsed menu
                                      navigation        

  Book grid         Multiple columns  Fewer columns     One or two columns
                                                        depending on
                                                        available width

  Filters           Side panel or     Compact toolbar   Stacked/collapsible
                    toolbar                             controls

  Book details      Cover and details Balanced          Cover above details
                    side by side      two-column where  
                                      space permits     

  Admin tables      Full table        Reduced           Scrollable table or
                                      spacing/columns   stacked record
                                                        presentation

  Checkout          Form and summary  Compact layout    Stacked sections
                    side by side                        
  ---------------------------------------------------------------------------

Use responsive CSS breakpoints appropriate to the final layout. Exact
breakpoint values are implementation decisions, not fixed PRD
requirements.

## 8. Accessibility

-   Use semantic HTML elements and a logical heading hierarchy.
-   Provide visible keyboard focus for all interactive controls.
-   Ensure form controls have associated labels.
-   Provide meaningful alt text for book-cover images.
-   Use empty alt text for purely decorative imagery.
-   Maintain readable colour contrast.
-   Do not communicate order status or errors using colour alone.
-   Ensure buttons and links have descriptive accessible names.
-   Keep touch targets usable on mobile.

## 9. Motion & Effects

Use motion sparingly.

Appropriate examples:

-   Small hover elevation on a book card.
-   Subtle colour transition on buttons.
-   Short, restrained menu transitions.
-   Clear feedback when an item is added to cart.

Avoid:

-   Large parallax effects.
-   Continuous animations.
-   Strong glow effects.
-   Shiny gradients.
-   Motion that delays core tasks.

Respect reduced-motion preferences.

## 10. Design Tokens --- CSS Starter

The following is a proposed starting point for
`client/src/styles/tokens.css`:

``` css
:root {
  /* Brand palette */
  --color-deep-teal: #244855;
  --color-signal-coral: #E64833;
  --color-terracotta: #874F41;
  --color-muted-sage: #90AEAD;
  --color-warm-cream: #FBE9D0;

  /* Supporting neutrals */
  --color-page: #F7F4EE;
  --color-surface: #FFFFFF;
  --color-text: #20313A;
  --color-muted: #62747A;
  --color-border: #E2DED6;

  /* Typography */
  --font-body: sans-serif;
  --font-display: serif;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;

  /* Shape and depth */
  --radius-small: 6px;
  --radius-medium: 12px;
  --radius-large: 18px;
  --shadow-card: 0 4px 16px rgba(36, 72, 85, 0.08);
}
```

The font stacks, neutral values, spacing, radii and shadow are suggested
implementation defaults. The five brand colours are taken directly from
the PRD's approved palette.

## 11. Page-by-Page Visual Direction

  -----------------------------------------------------------------------
  Page                                Design emphasis
  ----------------------------------- -----------------------------------
  Home                                Editorial hero, featured books,
                                      categories and new arrivals

  Catalogue                           Search/filter clarity and
                                      consistent book grid

  Book details                        Large cover, readable metadata and
                                      prominent add-to-cart

  Login/Register                      Minimal, warm form surfaces and
                                      clear validation

  Cart                                Scannable items and clear
                                      subtotal/checkout action

  Checkout                            Focused delivery form and order
                                      summary

  Order history                       Clear order cards/table and
                                      readable status labels

  Profile                             Simple account and delivery
                                      information

  Admin dashboard                     Functional overview with restrained
                                      visual hierarchy

  Admin book management               Efficient forms and clean catalogue
                                      table

  Admin order management              Clear order details and explicit
                                      status controls
  -----------------------------------------------------------------------

## 12. Content & Imagery Guidelines

-   Book covers should be the most prominent images.
-   Use consistent portrait framing.
-   Use optimized image sizes and a fallback when an image fails to
    load.
-   Keep imagery relevant to reading, books and literary discovery.
-   Avoid unrelated stock imagery and visual clutter.
-   Use concise, helpful UI copy.
-   Use consistent naming for buttons and navigation throughout the
    application.

## 13. Design Acceptance Checklist

-   [ ] The interface uses the five approved Deep Vintage Mood brand
    colours.
-   [ ] Deep teal provides the main structural hierarchy.
-   [ ] Coral is reserved for primary actions and restrained highlights.
-   [ ] Warm cream and warm neutral surfaces create the editorial
    bookstore feel.
-   [ ] Book covers use consistent portrait framing.
-   [ ] Header, cards, forms, tables and footer follow shared component
    rules.
-   [ ] Desktop, tablet and mobile layouts are usable.
-   [ ] Loading, empty, error, success and disabled states are designed.
-   [ ] Keyboard focus and form labels are present.
-   [ ] Status and validation meaning is not conveyed by colour alone.
-   [ ] The interface avoids glossy gradients, neon effects and
    excessive animation.
-   [ ] The reference's automotive content is not copied into Pandora.

------------------------------------------------------------------------

**PANDORA --- DISCOVER STORIES. COLLECT WORLDS.**
