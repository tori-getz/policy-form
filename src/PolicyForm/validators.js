
import isDate from "is-date";
import isPhoneNumber from "is-phone-number";
import isEmail from "is-email";

export const required = (value) => {
    if (!value.toString().trim().length) {
        return <small className="text-danger"> Не должно быть пустым</small>;
    }
}

export const phone = (value) => {
    if (!isPhoneNumber(value)) {
        return <small className="text-danger"> Введите номер телефона </small>;
    }
}

export const passport = (value) => {
    if (value.includes("_")) {
        return <small className="text-danger"> Введите данные паспорта </small>;
    }
}

export const email = (value) => {
    if (!isEmail(value)) {
        return <small className="text-danger"> Введите почту </small>;
    }
}

export const date = (value) => {
    if (!isDate(value)) {
        return <small className="text-danger"> Введите дату </small>;
    }
}
