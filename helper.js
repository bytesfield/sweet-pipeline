const isBoolean = (value)=> {
    if(typeof value === "boolean" ){
        return true;
    }
    return false;
}

const isArray = (value)=> {
    if(value && typeof value === "object" ){
        return true;
    }
    return false;
}

const hasLength = (value)=> {
    if(value && value > 0 ){
        return true;
    }
    return false;
}

const isPromise = (value)=> {
    if(value && typeof value.then === 'function'){
        return true;
    }
    return false;
}

const isFunction = (value)=> {
    if(value && typeof value === 'function'){
        return true;
    }
    return false;
}

const isTrue = (value)=> {
    if(value === true){
        return true;
    }
    return false;
}


module.exports = {
    isBoolean,
    isArray,
    hasLength,
    isPromise,
    isFunction,
    isTrue
}