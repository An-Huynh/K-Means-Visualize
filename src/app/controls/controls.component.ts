import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { lloyds } from 'src/lloyds-algorithm/lloyds-algorithm';
import { Cluster } from 'src/models/Cluster';

@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {
  @Output() newClusters = new EventEmitter<Cluster[]>();

  public clusterError: string = '';

  public form = new FormGroup({
    data: new FormControl<string>('', [
      Validators.pattern(/^(-?(\d*\.)?\d+(\s+|$))*$/),
      Validators.required,
    ]),
    k: new FormControl<number>(1, [Validators.min(1)]),
  });

  public get data() {
    return this.form.get('data');
  }

  public get k() {
    return this.form.get('k');
  }

  public onCalculate() {
    try {
      if (this.data?.value && this.k?.value && this.form.valid) {
        this.clusterError = '';
        const points = this.data.value
          .split(/\n/)
          .filter((l) => l.trim() !== '')
          .map((l) =>
            l
              .split(/\s/)
              .filter((i) => i.trim() !== '')
              .map((i) => parseInt(i))
          );
        this.newClusters.emit(lloyds(points, this.k.value));
      }
    } catch (err) {
      if (err instanceof Error) {
        this.clusterError = err.message;
      } else {
        console.log('Unknown error: ', err);
      }
    }
  }
}
