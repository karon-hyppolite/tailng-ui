import {
  Component,
  ElementRef,
  computed,
  input,
  signal,
  viewChild,
} from '@angular/core';

type CodeLanguage = 'text' | 'bash' | 'json' | 'typescript' | 'ts' | 'html' | 'css';

@Component({
  selector: 'tng-code-block',
  standalone: true,
  templateUrl: './code-block.component.html',
})
export class TailngCodeBlockComponent {
  // -------------------------
  // API
  // -------------------------
  content = input<string | null>(null);
  language = input<CodeLanguage>('text');
  showLineNumbers = input<boolean>(false);
  copyable = input<boolean>(true);
  wrap = input<boolean>(false);

  // -------------------------
  // klass hooks (theming)
  // -------------------------
  rootKlass = input<string>('');
  headerKlass = input<string>('');
  languageKlass = input<string>('');
  copyButtonKlass = input<string>('');
  bodyKlass = input<string>('');
  gutterKlass = input<string>('');
  preKlass = input<string>('');
  codeKlass = input<string>('');

  // -------------------------
  // Projection (fallback)
  // -------------------------
  private projectedEl = viewChild<ElementRef<HTMLElement>>('projected');

  // -------------------------
  // State
  // -------------------------
  copied = signal(false);

  // -------------------------
  // Derived
  // -------------------------
  readonly code = computed(() => {
    const c = this.content();
    if (c != null) return c;

    const el = this.projectedEl();
    return el?.nativeElement?.innerText ?? '';
  });

  readonly escapedCode = computed(() => this.escapeHtml(this.code()));

  readonly lines = computed(() => {
    const text = this.code();
    if (!text) return 0;
    return text.split(/\r\n|\r|\n/).length;
  });

  readonly lineNumbers = computed(() =>
    Array.from({ length: this.lines() }, (_, i) => i + 1),
  );

  // -------------------------
  // klass (defaults + overrides)
  // -------------------------
  readonly klass = computed(() =>
    this.join(
      'relative rounded-lg border border-border bg-alternate-background text-text',
      this.rootKlass(),
    ),
  );

  readonly headerK = computed(() =>
    this.join(
      'flex items-center justify-between border-b border-border px-3 py-2 text-xs text-text/70',
      this.headerKlass(),
    ),
  );

  readonly languageK = computed(() =>
    this.join('font-semibold uppercase tracking-wide', this.languageKlass()),
  );

  readonly copyButtonK = computed(() =>
    this.join(
      'rounded border border-border bg-background px-2 py-1 font-semibold text-text hover:border-border-hover',
      this.copyButtonKlass(),
    ),
  );

  readonly bodyK = computed(() => this.join('relative', this.bodyKlass()));

  readonly gutterK = computed(() =>
    this.join(
      'absolute inset-y-0 left-0 w-10 select-none border-r border-border bg-background px-2 py-4 text-right text-xs leading-6 text-text/60',
      this.gutterKlass(),
    ),
  );

  readonly preK = computed(() =>
    this.join(
      'overflow-auto p-4 text-xs leading-6 text-text',
      this.showLineNumbers() ? 'pl-14' : '',
      this.wrap() ? 'whitespace-pre-wrap break-words' : 'whitespace-pre',
      this.preKlass(),
    ),
  );

  readonly codeK = computed(() =>
    this.join(
      'block',
      this.codeKlass(),
    ),
  );

  // -------------------------
  // Actions
  // -------------------------
  copy(): void {
    const text = this.code();
    if (!text) return;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 1200);
      })
      .catch(() => {
        /* noop */
      });
  }

  // -------------------------
  // Utils
  // -------------------------
  private join(...parts: Array<string | null | undefined>): string {
    return parts.map((p) => (p ?? '').trim()).filter(Boolean).join(' ');
  }

  private escapeHtml(s: string): string {
    return s
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }
}
