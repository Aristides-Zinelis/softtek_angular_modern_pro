import {
  Component,
  computed,
  effect,
  Signal,
  signal,
  WritableSignal,
} from "@angular/core";

@Component({
  selector: "lab-theme-toggle",
  imports: [],
  template: `
    <a aria-label="Toggle theme"
      ><span (click)="toggleTheme()">{{ icon() }}</span>
    </a>
  `,
  styles: ``,
})
export class ThemeToggleComponent {
  private theme: WritableSignal<string> = signal("light");
  protected icon: Signal<string> = computed(() =>
    this.theme() === "light" ? "🔳" : "🔲"
  );
  protected toggleTheme(): void {
    this.theme.update((theme) => (theme === "light" ? "dark" : "light"));
  }
  private onToggleEffect = effect(() => {
    // triggers
    const theme = this.theme();
    // side effects
    document.documentElement.setAttribute("data-theme", theme);
  });
}
