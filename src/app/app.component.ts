import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { SohoPersonalizeDirective } from 'ids-enterprise-ng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(SohoPersonalizeDirective, { static: true })
  private personalize: SohoPersonalizeDirective;

  title = 'ids-enterprise-ng-quickstart';

  theme: string;

  get useUpliftIcons() {
    return this.theme === 'theme-uplift-light' || this.theme === 'theme-uplift-light' || this.theme === 'theme-uplift-light';
  }

  /**
   * Constructor.
   */
  constructor() {
    this.theme =  localStorage.getItem('soho_theme') ?? 'uplift-dark-theme';
    console.log(`${this.theme}`);
  }

  ngAfterViewInit() {
    this.personalize.theme = this.theme;
  }


  public clicked() {
    alert('Clicked me!');
  }

  onChangeTheme(ev: SohoChangeThemePersonalizeEvent) {
    this.theme = ev.theme;
  }
}
