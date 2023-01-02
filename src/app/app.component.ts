import { Component } from '@angular/core';
import { Cluster } from 'src/models/Cluster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public clusters: Cluster[] = [];
  public onNewClusters(clusters: Cluster[]): void {
    this.clusters = clusters;
  }
}
