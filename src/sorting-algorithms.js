import React from 'react';
import ReactDOM from 'react-dom';


//O(n^2)
const bubbleSort = (array) => {
    let arr = [...array];
    let times = arr.length;

    do {
        times--;
        for (let i = 0; i < times; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            }
        }
    } while (times > 0);

    return arr;
}

const insertionSort = (array) => {}
const selectionSort = (array) => {}

//O(nlogn)
const mergeSort = (array) => {
    if (array.length < 2) return array;
    // let arr = [...array];
    let mid = Math.floor(array.length / 2);
    let left = mergeSort(array.slice(0, mid));
    let right = mergeSort(array.slice(mid));

    let result = [];
    while (left.length > 0 && right.length > 0) {
        //startIndex
        if (left[0][1] > right[0][1]) result.push(right.shift());
        else result.push(left.shift());
    }
    if (left.length > 0) result = [...result, ...left];
    else if (right.length > 0) result = [...result, ...right];

    return result;
}

const quickSort = (array) => {}
const heapSort = (array) => {}
const librarySort = (array) => {}

export {
    bubbleSort,
    insertionSort,
    selectionSort,
    mergeSort,
    quickSort,
    heapSort,
    librarySort
}