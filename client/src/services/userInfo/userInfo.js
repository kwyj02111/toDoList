export function setLocalStorage(key, value) {
    if(key === undefined){
        return;
    }

    if(value === undefined){
        return;
    }

    localStorage.setItem(key, JSON.stringify(value));
    return;
}

export function getLocalStorage(key) {
    if(key === undefined){
        return;
    }

    let returnData = undefined;
    returnData = localStorage.getItem(key);
    if(returnData === null || returnData.length < 1){
        return undefined;
    }

    try{
        // json return
        returnData = JSON.parse(returnData);
        return returnData;
    }catch(e){
        //string return
        return returnData;
    }
}

export function deleteLocalStorage(key) {
    if(key === undefined){
        return;
    }

    localStorage.removeItem(key);
    return;
}

export function setUserToken(token) {
    if(token === undefined){
        return;
    }

    setLocalStorage('aslover-token', token);
    return;
}