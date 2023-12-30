import axios from "axios";
import { makeAutoObservable } from "mobx";

class PartStore {
    selectedBrands = [];

    constructor() {
        makeAutoObservable(this);
    }

    addBrand = (brandSlug) => {
        const activeIndex = this.selectedBrands.indexOf(brandSlug);
        if (activeIndex === -1) {
            this.selectedBrands.push(brandSlug);
        } else {
            this.selectedBrands.splice(activeIndex, 1);
        }
    }

    fetchParts = async (filters=null) => {
        return filters === null
            ? axios.get('https://f76d-113-23-129-82.ngrok-free.app/api/parts')
            : axios.get('https://f76d-113-23-129-82.ngrok-free.app/api/parts', {params: filters})
    }

    fetchPart = async (id) => {
        return await axios.get(`https://f76d-113-23-129-82.ngrok-free.app/api/part/${id}`);
    }
}

export const partStore = new PartStore();