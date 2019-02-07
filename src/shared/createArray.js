export const createArray = (rows, columns) => {
    // return Array(rows).fill().map(() => Array(columns).fill(false));
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(columns).fill(false);
    }
    return arr
};
