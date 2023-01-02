import { Component } from '@angular/core';
import { Cluster } from 'src/models/Cluster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public onNewClusters(clusters: Cluster[]): void {
    console.log(JSON.stringify(clusters));
  }
}
