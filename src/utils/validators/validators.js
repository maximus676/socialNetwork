
export const required = value => {  // value приходит из validate который прописывается в Field формы
    if(value) {
        return undefined;
    }
        return "Field is required";
}

export const maxLengthThunkCreator = (maxLength) => (value) => {      /* санка */
    if(value.length > maxLength) {
        return `Max Length is ${maxLength} symbols `
    }
    return undefined;
}

export const maxLength30 = value => {
    if(value.length>30) {
        return "Max Length is 30 symbols ";
    }
    return undefined;
}