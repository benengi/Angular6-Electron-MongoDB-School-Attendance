import { Component, ViewChild , ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @ViewChild('content') content: ElementRef;

  clicked() {
    // tslint:disable-next-line:prefer-const
    let doc = new jsPDF();

    // tslint:disable-next-line:prefer-const
    let specialElementHandlers = {
      '#editor': function(element, renderer) {
        return true;
      }
    };

    // tslint:disable-next-line:prefer-const
    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
        'width': 190,
        'elementHandlers': specialElementHandlers
    });

    doc.save('report.pdf');

  }
}
