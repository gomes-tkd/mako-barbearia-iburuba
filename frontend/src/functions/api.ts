import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000"
});

/*
const BASE_URL = "http://localhost:5000";

export function REGISTRAR(url: string) {
    return {
        url: BASE_URL + url,
    }
}

export function LOGIN(url: string) {
    return {
        url: BASE_URL + url,
    }
}

export function CHECKUSER(url: string) {
    return {
        url: BASE_URL + url,
    }
}
*/
