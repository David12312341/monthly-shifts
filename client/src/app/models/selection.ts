export class Selection {
    public isSelected: boolean;
    public name: string;
    public option: string;

    constructor(option: string, name: string) {
        this.option = option;
        this.name = name;
        this.isSelected = false;
    }
}