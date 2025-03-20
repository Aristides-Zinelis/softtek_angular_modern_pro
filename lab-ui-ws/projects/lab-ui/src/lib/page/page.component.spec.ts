import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { PageComponent } from './page.component';

/**
 * Page Component tests
 * - should create
 * - should render page title and subtitle
 * - should throw error when pageTitle is not provided
 * - should not render subtitle when not provided
 * - should render content in host component
 */
describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
  });

  it('should not create', () => {
    expect(() => fixture.detectChanges()).toThrow();
  });

  it('should render page title and subtitle', () => {
    // Arrange
    const pageTitle = 'Test Title';
    const pageSubtitle = 'Test Subtitle';
    fixture.componentRef.setInput('pageTitle', pageTitle);
    fixture.componentRef.setInput('pageSubtitle', pageSubtitle);

    // Act
    fixture.detectChanges();

    // Assert
    const header = fixture.nativeElement.querySelector('header');
    expect(header.textContent).toContain(pageTitle);
    expect(header.textContent).toContain(pageSubtitle);
  });

  it('should not render subtitle when not provided', () => {
    // Arrange
    const pageTitle = 'Test Title';
    fixture.componentRef.setInput('pageTitle', pageTitle);

    // Act
    fixture.detectChanges();

    // Assert
    const header = fixture.nativeElement.querySelector('p');
    expect(header).toBeNull();
  });
});

@Component({
  template: `
    <lab-ui-page [pageTitle]="title">
      <p>Test Content</p>
      <footer>Test Footer</footer>
    </lab-ui-page>
  `,
  imports: [PageComponent],
})
class HostComponent {
  title = 'Test Host Title';
}

describe('HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
  });

  it('should render content in host component', () => {
    expect(component).toBeTruthy();
  });

  it('should render page title', () => {
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('header');
    expect(header.textContent).toContain(component.title);
  });

  it('should render content in host component', () => {
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('p');
    expect(content.textContent).toContain('Test Content');
    const footer = fixture.nativeElement.querySelector('footer');
    expect(footer.textContent).toContain('Test Footer');
  });
});
