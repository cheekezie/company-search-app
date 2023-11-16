import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import {
  Event as RouterEvent,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isShowingRouteLoadIndicator = false;
  constructor(private router: Router, private renderer: Renderer2) {
    let asyncLoadCount = 0;
    router.events.subscribe((event: RouterEvent): void => {
      if (event instanceof RouteConfigLoadStart) {
        asyncLoadCount++;
      } else if (event instanceof RouteConfigLoadEnd) {
        asyncLoadCount--;
      }

      this.isShowingRouteLoadIndicator = !!asyncLoadCount;
    });
  }
  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement('#appLoader');
    this.renderer.setStyle(loader, 'display', 'none');
  }
}
