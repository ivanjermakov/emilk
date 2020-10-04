export interface Folder {
	children: Boxes
}

export interface Boxes {
	[name: string]: Folder
}
