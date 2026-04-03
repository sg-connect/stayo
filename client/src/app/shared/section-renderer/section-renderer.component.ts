import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Section } from '../../models/apartment.model';

@Component({
  selector: 'app-section-renderer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-renderer.component.html',
  styleUrl: './section-renderer.component.scss',
})
export class SectionRendererComponent {
  @Input({ required: true }) section!: Section;

  copied = false;

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    });
  }

  get icon(): string {
    const icons: Record<string, string> = {
      wifi: 'wifi',
      entry: 'key',
      rules: 'list',
      contact: 'phone',
      laundry: 'local_laundry_service',
      custom: 'info',
      link: 'link',
    };
    return icons[this.section.type] || 'info';
  }
}
