import { makeAutoObservable } from "mobx";

class TyreStore {
    selectedInches = [];
    selectedBrands = [];

    constructor() {
        makeAutoObservable(this);
    }

    addInch = (inch) => {
        const index = this.selectedInches.indexOf(inch);
        if (index === -1) {
            this.selectedInches.push(inch);
        } else {
            this.selectedInches.splice(index, 1);
        }
    }

    addBrand = (brands) => {
        const index = this.selectedBrands.indexOf(brands);
        if (index === -1) {
            this.selectedBrands.push(brands);
        } else {
            this.selectedBrands.splice(index, 1);
        }
    }
}

export const tyreStore = new TyreStore();