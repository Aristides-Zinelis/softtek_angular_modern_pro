import { Component, computed, effect, signal } from "@angular/core";

@Component({
  selector: "lab-theme-toggle",
  imports: [],
  template: `
    <a aria-label="Toggle theme">
      <span (click)="toggleTheme()">{{ icon() }}</span>
    </a>
  `,
  styles: ``,
})
export class ThemeToggleComponent {
  private theme = signal("light");
  protected icon = computed(() => (this.theme() === "light" ? "🔳" : "🔲"));
  protected toggleTheme(): void {
    this.theme.update((theme) => (theme === "light" ? "dark" : "light"));
  }
  private onToggleEffect = effect(() => {
    const theme = this.theme();
    document.documentElement.setAttribute("data-theme", theme);
  });
}
