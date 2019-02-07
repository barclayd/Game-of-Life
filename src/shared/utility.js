export const cloneArray = (arr) => {
    return JSON.parse(JSON.stringify(arr));
};

export const createArray = (rows, columns) => {
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(columns).fill(false);
    }
    return arr;
};
