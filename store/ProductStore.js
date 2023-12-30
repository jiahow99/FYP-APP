import axios from "axios";
import { makeAutoObservable } from "mobx";

class ProductStore {
    constructor() {
        makeAutoObservable(this);
    }

    getProduct = async (id) => {
        const { data } = await axios.get(`https://f76d-113-23-129-82.ngrok-free.app/api/tyre/${id}`);
        return data;
    }
}

export const productStore = new ProductStore();