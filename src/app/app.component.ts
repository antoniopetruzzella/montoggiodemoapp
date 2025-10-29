
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PushService } from './services/push.service';
import { SwUpdate } from '@angular/service-worker';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public showComuneSubmenu = false;
 
  

  //https://ionic.io/ionicons
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router: Router, private pushService: PushService,private updates: SwUpdate) {
    console.log('AppComponent constructor chiamato');
     pushService.initialize();
   this.updates.versionUpdates.subscribe(event => {
    if (event.type === 'VERSION_READY') {
      this.updates.activateUpdate().then(() => document.location.reload());
    }
  });
  }
}
