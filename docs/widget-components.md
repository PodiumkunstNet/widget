# Component & Structure Overview

Real file locations for the (React) widget. All links point to the repository paths (relative from this `docs/` folder).

## Router
Implemented with `react-router-dom` inside the app component.
Location: [App.tsx](../packages/widget/src/App.tsx)
Routes defined in the `<Routes>` block for `/about`, `/widget`, `/widget/more`.
Related provider setup: [Providers](../packages/widget/src/Providers/index.tsx) (wraps context/query etc.)

## Layout
Location: [Layout (index.tsx)](../packages/widget/src/components/Layout/index.tsx)
Purpose: Sets up the responsive container, header, main area, info overlay, size classes.

### Header
Location: [Header (index.tsx)](../packages/widget/src/components/Layout/Header/index.tsx)
Purpose: Top navigation / branding, back / start buttons, paginator, title handling.
Used in: [Layout](../packages/widget/src/components/Layout/index.tsx)

## Pages
Directory: [pages/](../packages/widget/src/pages/)
Current pages:
<!-- - About page: [pages/About/index.tsx](../packages/widget/src/pages/About/index.tsx) -->
- Grid page (main widget view): [pages/Grid/index.tsx](../packages/widget/src/pages/Grid/index.tsx)

### Grid
Location: [pages/Grid/index.tsx](../packages/widget/src/pages/Grid/index.tsx)
Purpose: Renders the list (`<ul>`) of tiles based on context data, handles loading / error states.

### Tiles
Generic content tile: [GenericTile.tsx](../packages/widget/src/pages/Grid/tiles/GenericTile.tsx)
Information tile (opens overlay): [InformationTile.tsx](../packages/widget/src/pages/Grid/tiles/InformationTile.tsx)

## Overlay / Modal Info
Information overlay component: [InfoOverlay](../packages/widget/src/components/InfoOverlay/index.tsx)
Purpose: Displays contextual information when an [InformationTile](../packages/widget/src/pages/Grid/tiles/InformationTile.tsx) is selected; injected in `Layout`.

## State & Context
Actions: [state/actions.ts](../packages/widget/src/state/actions.ts)
Reducer: [state/reducer.ts](../packages/widget/src/state/reducer.ts)
Context index (providers/exports): [state/index.ts](../packages/widget/src/state/index.ts)
Additional providers wrapper: [Providers](../packages/widget/src/Providers/index.tsx)

## Utilities & Hooks (selected)
Class name helper: [utils/cn.ts] (if present) or check utilities folder: [utils/](../packages/widget/src/utils/)
Session storage hook: [hooks/useSessionStorage.ts](../packages/widget/src/hooks/useSessionStorage.ts)
Breakpoint hook: [hooks/useCurrentBreakpoint.ts](../packages/widget/src/hooks/useCurrentBreakpoint.ts)
Navigation transition hook: [hooks/useTransitionNavigate.ts](../packages/widget/src/hooks/useTransitionNavigate.ts)
