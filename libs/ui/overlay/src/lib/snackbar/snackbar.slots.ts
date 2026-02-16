export type TngSnackbarSlot =
  | 'host'         // Host container
  | 'item'         // Each snackbar item
  | 'itemInner'    // Inner content row
  | 'message'      // Message text
  | 'action'       // Action button
  | 'dismissBtn'   // Dismiss (×) button
  | 'intentSuccess' // Extra class when intent=success
  | 'intentInfo'   // Extra class when intent=info
  | 'intentWarning'// Extra class when intent=warning
  | 'intentError'; // Extra class when intent=error
