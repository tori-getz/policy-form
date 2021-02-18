
import Axios from "axios";

export default class KontinentClient {
    constructor ({ key, type, company }) {
        this.BASE_URL = `https://kontinent-lobby.com/${type}`;
        
        this.key = key;
    }

    _getTourists (tourists) {
        let url = ``;
        for (let touristId in tourists) {
            let keys = Object.keys(tourists[touristId]);
            
            for (let key of keys) {
                url += `&ord[tourists][${touristId}][${key}]=${tourists[touristId][key]}`
            }
        }
        return url;
    }

    _getBuyer (buyer) {
        let url = ``;
        let keys = Object.keys(buyer);
        for (let key of keys) {
            url += `&ord[buyer][${key}]=${buyer[key]}`
        }
        return url;
    }

    async fullCalc ({ tourists, dateStart, months }) {
        const result = await Axios.get(`${this.BASE_URL}/fullcalc.json?key=${this.key}${this._getTourists(tourists)}&if[date_start]=${dateStart}&if[corona2]=${months}`);

        return result.data.calcResult[0];
    }

    async book ({ tourists, buyer, dateStart, months }) {
        const result = await Axios.get(`${this.BASE_URL}/book.json?key=${this.key}&if[company]=rgslife&if[corona2]=${months}&if[date_start]=${dateStart}${this._getBuyer(buyer)}${this._getTourists(tourists)}`);

        return result.data;
    }

    async pay ({ orderId, sum, success_url, failure_url }) {
        const result = await Axios.get(`${this.BASE_URL}/pay.json?key=${this.key}&order=${orderId}&pay_sum=${sum}`)
    }
}
