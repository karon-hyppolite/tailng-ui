export type TngCodeBlockSlot =
  | 'container'   // Outer wrapper (root)
  | 'body'       // Inner body div
  | 'gutter'     // Line numbers column
  | 'pre'        // pre element
  | 'code'       // code element
  | 'copyWrapper'; // Copy button wrapper div
