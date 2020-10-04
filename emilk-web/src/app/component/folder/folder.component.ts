import {Component, Input, OnInit} from '@angular/core'
import {Folder} from '../../model/Boxes'

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.sass']
})
export class FolderComponent implements OnInit {

  @Input()
  name: string

  @Input()
  folder: Folder

  constructor() { }

  ngOnInit(): void {}

}
