import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ControlsComponent } from './controls/controls.component';
import { ClusterCanvasComponent } from './cluster-canvas/cluster-canvas.component';

@NgModule({
  declarations: [AppComponent, ControlsComponent, ClusterCanvasComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
