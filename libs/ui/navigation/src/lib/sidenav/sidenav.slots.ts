// sidenav.slots.ts - styling slots (distinct from sidenav-slots.directive for content projection)

export type TngSidenavSlot =
  | 'container'  // Root nav base classes
  | 'expanded'   // Width/layout when expanded
  | 'collapsed'  // Width/layout when collapsed
  | 'content'    // Main content wrapper
  | 'footer';    // Footer wrapper
