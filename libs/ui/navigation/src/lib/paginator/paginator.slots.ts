export type TngPaginatorSlot =
  | 'root'          // Root wrapper
  | 'left'          // Left section (range text)
  | 'right'         // Right section (controls)
  | 'button'        // First/prev/next/last buttons
  | 'page'          // Page number buttons (inactive)
  | 'activePage'    // Active page button
  | 'select'        // Page size select
  | 'separator';    // Ellipsis separator
