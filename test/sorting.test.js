import { bubbleSort, selectionSort, insertionSort, quickSort, mergeSort } from "../src/sorting.js";

let arr = [];
for (let i = 0; i < 20; i++) {
    arr.push(Math.floor(Math.random() * 100));
}
let arrSort = arr.sort((a, b) => a - b);

test("Bubble Sort", () => {
    expect(bubbleSort(arr)).toEqual(arrSort);
});

test("Selection Sort", () => {
    expect(selectionSort(arr)).toEqual(arrSort);
})

test("Insertion Sort", () => {
    expect(selectionSort(arr)).toEqual(arrSort);
})

test("Merge Sort", () => {
    let arrIndex = [];
    let arrSortIndex = [];
    for (let i = 0; i < arr.length; i++) {
        arrIndex.push([i, arr[i]]);
        arrSortIndex.push([i, arrSort[i]]);
    }
    expect(mergeSort(arrIndex, 0)).toEqual(arrSortIndex);
})

test("Quick Sort", () => {
    expect(quickSort(arr, 0, arr.length)).toEqual(arrSort);
})