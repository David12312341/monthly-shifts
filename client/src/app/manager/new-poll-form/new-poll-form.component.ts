import { Component, OnInit } from '@angular/core';
import { MDCSelect } from '@material/select';

@Component({
  selector: 'new-poll-form',
  templateUrl: './new-poll-form.component.html',
  styleUrls: ['./new-poll-form.component.css']
})
export class NewPollFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // const select = new MDCSelect(document.querySelector('.mdc-select'));
    // select.listen('MDCSelect:change', () => {
    //   alert(`Selected "${select.selectedOptions[0].textContent}" at index ${select.selectedIndex} ` +
    //     `with value "${select.value}"`);
    // });
  }

}
