import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-paging-buttons',
  imports: [],
  templateUrl: './paging-buttons.component.html',
  styleUrl: './paging-buttons.component.scss'
})
export class PagingButtonsComponent {

    numberOfPages = input.required<number>();
    selectedPage = output<number>();
    
    getRange(): Array<number> {
      let array: Array<number> = [];
      
      for(let i = 1;i<=this.numberOfPages();++i) {
          array[i - 1] = i;
      }
      return array;
    }

    sendPageToParent(pressedPage: number) {
        this.selectedPage.emit(pressedPage)
    }
}
