import { Component, ElementRef, computed, input, viewChild, inject, signal, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TngCodeHighlighter, TngCodeLanguage } from './code-highlighter.type';

@Component({
  selector: 'tng-code-block',
  standalone: true,
  templateUrl: './code-block.component.html',
})
export class TngCodeBlock implements OnDestroy {
  private sanitizer = inject(DomSanitizer);

  // -------------------------
  // API
  // -------------------------
  content = input<string | null>(null);
  language = input<TngCodeLanguage>('text');
  showLineNumbers = input<boolean>(false);
  wrap = input<boolean>(false);
  highlighter = input<TngCodeHighlighter | null>(null);

  // Copy UX
  copyResetMs = input<number>(5000);

  // -------------------------
  // klass hooks
  // -------------------------
  rootKlass = input<string>('');
  bodyKlass = input<string>('');
  gutterKlass = input<string>('');
  preKlass = input<string>('');
  codeKlass = input<string>('');

  // Copy button klass (merged with defaults in copyKlassFinal)
  copyKlass = input<string>('');

  private projectedEl = viewChild<ElementRef<HTMLElement>>('projected');

  readonly code = computed(() => {
    const c = this.content();
    if (c != null) return c;
    return this.projectedEl()?.nativeElement?.innerText ?? '';
  });

  readonly lines = computed(() => {
    const text = this.code();
    return text ? text.split(/\r\n|\r|\n/).length : 0;
  });

  readonly lineNumbers = computed(() =>
    Array.from({ length: this.lines() }, (_, i) => i + 1),
  );

  readonly renderedHtml = computed((): string | SafeHtml => {
    const text = this.code();
    if (!text) return '';

    const highlighter = this.highlighter();
    if (!highlighter) return this.escapeHtml(text);

    const html = highlighter.highlight(text, this.language());
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });

  // -------------------------
  // klass finals
  // -------------------------
  readonly rootKlassFinal = computed(() =>
    this.join(
      'relative rounded-lg border border-border bg-alternate-background text-fg',
      this.rootKlass(),
    ),
  );

  readonly bodyKlassFinal = computed(() => this.join('relative', this.bodyKlass()));

  readonly gutterKlassFinal = computed(() =>
    this.join(
      'absolute inset-y-0 left-0 w-10 select-none border-r border-border bg-bg px-2 py-4 text-right text-xs leading-6 text-fg/60',
      this.gutterKlass(),
    ),
  );

  readonly preKlassFinal = computed(() =>
    this.join(
      'overflow-auto p-4 text-xs leading-6 text-fg',
      this.showLineNumbers() ? 'pl-14' : '',
      this.wrap() ? 'whitespace-pre-wrap break-words' : 'whitespace-pre',
      this.preKlass(),
    ),
  );

  readonly codeKlassFinal = computed(() => this.join('block', this.codeKlass()));

  readonly copyKlassFinal = computed(() =>
    this.join(
      'absolute top-2 right-2 px-2 py-1 rounded cursor-pointer text-black text-xs bg-bg/80 border border-border',
      this.copyKlass(),
    ),
  );

  copied = signal(false);
  private copyTimer: ReturnType<typeof setTimeout> | null = null;

  copyCode() {
    const text = this.code();
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      this.copied.set(true);

      if (this.copyTimer) clearTimeout(this.copyTimer);
      this.copyTimer = setTimeout(() => this.copied.set(false), this.copyResetMs());
    });
  }

  ngOnDestroy() {
    if (this.copyTimer) clearTimeout(this.copyTimer);
  }

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