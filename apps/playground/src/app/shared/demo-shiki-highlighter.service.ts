import { Injectable } from '@angular/core';
import { createHighlighter, type Highlighter } from 'shiki';

@Injectable({ providedIn: 'root' })
export class DemoShikiHighlighterService {
  private highlighter: Highlighter | null = null;

  async init(): Promise<void> {
    if (this.highlighter) return;

    this.highlighter = await createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: ['bash', 'json', 'typescript', 'html', 'css', 'text'],
    });
  }

  toHtml(code: string, lang: string, theme: 'github-dark' | 'github-light' = 'github-light'): string {
    if (!this.highlighter) {
      // fallback: no highlight yet
      return this.escapeHtml(code);
    }

    const html = this.highlighter.codeToHtml(code, {
      lang,
      theme,
    });
    return html;
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