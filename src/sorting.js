const bubbleSort = (array) => {
    let arr = [...array];
    let times = arr.length;
    let swap = false;
    do {
        swap = false;
        times--;
        for (let i = 0; i < times; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swap = true;
            }
        }
    } while (times > 0 && swap == true);
    return arr;
};
const selectionSort = (array) => {
    let arr = [...array];
    for (let i = 0; i < array.length - 1; i++) {
        let min = arr[i];
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (arr[j] < min) {
                min = arr[j];
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }

    return arr;
};
const insertionSort = (array) => {
    let arr = [...array];
    for (let i = 1; i < arr.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            } else {
                break;
            }
        }
    }
    return arr;
};
const quickSort = (array, left, right) => {
    let arr = [...array];
    if (left >= right) {
        return null;
    }
    let pivot = left;
    for (let i = left + 1; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            [arr[i], arr[pivot]] = [arr[pivot], arr[i]];
            [arr[i], arr[pivot + 1]] = [arr[pivot + 1], arr[i]];
            pivot++;
        }
    }

    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
    return arr;
};
const mergeSort = (array, startIndex) => {
    let arr = [...array];
    if (arr.length < 2) {
        return arr;
    }
    let index = startIndex;
    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid), index);
    let right = mergeSort(arr.slice(mid), mid + index);

    let result = [];
    while (left.length > 0 && right.length > 0) {
        if (right[0][1] < left[0][1]) {
            let temp = [index, right[0][1]];
            result.push(temp);
            right.shift();
        } else {
            let temp = [index, left[0][1]];
            result.push(temp);
            left.shift();
        }
        index++;
    }
    if (left.length > 0) {
        left.forEach((element) => {
            let temp = [index, element[1]];
            result.push(temp);
            index++;
        });
    } else if (right.length > 0) {
        right.forEach((element) => {
            let temp = [index, element[1]];
            result.push(temp);
            index++;
        });
    }
    return result;
};

export { bubbleSort, selectionSort, insertionSort, quickSort, mergeSort };