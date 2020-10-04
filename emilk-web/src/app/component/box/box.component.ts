import {Component, Input, OnInit} from '@angular/core'
import {Boxes, Folder} from "../../model/Boxes"

@Component({
	selector: 'app-box',
	templateUrl: './box.component.html',
	styleUrls: ['./box.component.sass']
})
export class BoxComponent implements OnInit {

	@Input()
	boxes: Boxes

	entries: [string, Folder][]

	constructor() {}

	ngOnInit(): void {
		this.entries = Object.entries(this.boxes)
	}

}
