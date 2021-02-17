
import Axios from "axios";

export default class KontinentClient {
    constructor ({ key, type, company }) {
        this.BASE_URL = `https://kontinent-lobby.com/${type}`;
        
        this.key = key;
    }

    _getRequestURL (tourists) {
        let url = `?key=${this.key}`;
        for (let touristId in tourists) {
            let keys = Object.keys(tourists[touristId]);
            
            for (let key of keys) {
                url += `&ord[tourists][${touristId}][${key}]=${tourists[touristId][key]}`
            }
        }
        return url;
    }

    async fullCalc ({ tourists, dateStart }) {
        const result = await Axios.get(`${this.BASE_URL}/fullcalc.json${this._getRequestURL(tourists)}&if[date_start]=${dateStart}&if[corona2]=3`);

        return result.data.calcResult[0];
    }

    async book ({ tourists }) {
        console.log(this._getRequestURL(tourists));

        const result = await Axios.get(`${this.BASE_URL}/book.json?key=${this.key}&if[company]=rgslife&if[corona2]=3&ord[tourists][0][firstName]`);

        return result.data.calcResult
    }
}
