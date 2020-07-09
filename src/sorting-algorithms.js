const get = (selector) => {
    return document.querySelector(selector);
};
const getClass = (selector) => {
    return document.getElementsByClassName(selector);
};

let time = 100;
const setTime = (t) => {
    time = t;
};
let animation = [];
const clearAnimation = () => {
    animation = [];
};

const swapBar = (oldBar, toBar) => {
    getClass("bar")[oldBar[0]].style.height = toBar[1] + "px";
    getClass("bar")[toBar[0]].style.height = oldBar[1] + "px";
    getClass("value")[oldBar[0]].textContent = toBar[1];
    getClass("value")[toBar[0]].textContent = oldBar[1];
};
let merge = false;

//O(n^2)
const bubbleSort = (array) => {
    let arr = [...array];
    let times = arr.length;
    let swap = false;
    do {
        swap = false;
        times--;
        for (let i = 0; i < times; i++) {
            animation.push(["com", arr[i], arr[i + 1]]);
            if (arr[i][1] > arr[i + 1][1]) {
                let tempA = [...arr[i]];
                let tempB = [...arr[i + 1]];
                animation.push(["push", tempA, tempB]);
                [arr[i][1], arr[i + 1][1]] = [arr[i + 1][1], arr[i][1]];
                swap = true;
            }
        }
    } while (times > 0 && swap);

    return arr;
};

const insertionSort = (array) => {
    let arr = [...array];
    let length = array.length;
    for (let i = 1; i < length; i++) {
        // let temp = arr[i][1];
        for (let j = i - 1; j >= 0; j--) {
            let tempA = [...arr[j]];
            let tempB = [...arr[j + 1]];
            animation.push(["com", tempA, tempB]);
            if (tempA[1] > tempB[1]) {
                animation.push(["push", tempA, tempB]);
                [arr[j + 1][1], arr[j][1]] = [arr[j][1], arr[j + 1][1]];
            } else {
                break;
            }
        }
        // while (j >= 0 && arr[j][1] > temp) {
        //     let tempA = [...arr[j + 1]];
        //     let tempB = [...arr[j]];
        //     animation.push(['com', tempA, tempB]);
        //     animation.push(['push', tempA, tempB]);
        //     arr[j + 1][1] = arr[j][1];
        //     j--;
        // }
        // arr[j + 1][1] = temp;
    }
    return arr;
};
const selectionSort = (array) => {
    let arr = [...array];

    for (let i = 0; i < array.length - 1; i++) {
        let min = arr[i][1];
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            let tempA = [...arr[minIndex]];
            let tempB = [...arr[j]];
            animation.push(["com", tempA, tempB]);
            if (arr[j][1] < min) {
                let temp = [...arr[j]];
                // animation.push(['min',temp]);
                min = arr[j][1];
                minIndex = j;
            }
        }
        let tempA = [...arr[i]];
        let tempB = [...arr[minIndex]];
        animation.push(["push", tempA, tempB]);
        [arr[i][1], arr[minIndex][1]] = [arr[minIndex][1], arr[i][1]];
    }

    return arr;
};

//O(nlogn)
const mergeSort = (arr, startIndex, animationArray) => {
    let array = [...arr];
    // animation.push(['range', array]);
    if (array.length < 2) return array;
    let index = startIndex;
    let mid = Math.floor(array.length / 2);
    // animation.push(['getmid', mid]);
    let left = mergeSort(array.slice(0, mid), index, animationArray);
    let right = mergeSort(array.slice(mid), mid + index, animationArray);

    let result = [];
    while (left.length > 0 && right.length > 0) {
        animation.push(["com", [...left[0]], [...right[0]]]);
        if (right[0][1] < left[0][1]) {
            // console.log('r'+right+' '+left);
            // [animationArray[index][1],right[0][1]]=[right[0][1],animationArray[index][1]];
            let temp = [index, right[0][1]];
            result.push(temp);
            animation.push(["push", [...right[0]], temp]);
            right.shift();
        } else {
            // console.log('l'+left[0]+' '+right[0]);
            // [animationArray[index][1],left[0][1]]=[left[0][1],animationArray[index][1]];
            let temp = [index, left[0][1]];
            result.push(temp);
            animation.push(["push", [...left[0]], temp]);
            left.shift();
        }
        index++;
    }
    if (left.length > 0) {
        left.forEach((element) => {
            // console.log('ll'+element);
            let temp = [index, element[1]];
            result.push(temp);
            animation.push(["push", [...element], temp]);
            index++;
        });
    } else if (right.length > 0) {
        right.forEach((element) => {
            // console.log('rr'+element);
            let temp = [index, element[1]];
            result.push(temp);
            animation.push(["push", [...element], temp]);
            index++;
        });
    }
    merge = true;
    return result;
};
const doAnimation = (animation, setArray, newArr) => {
    let times = 0;
    // console.log(animation);
    animation.forEach((element, index) => {
        index = index + 1;
        if (element[0] == "com") {
            setTimeout(() => {
                Array.from(getClass("bar")).forEach((bar) => {
                    bar.style.backgroundColor = "#66aef1";
                });
                Array.from(getClass("element-sort")).forEach((bar) => {
                    bar.style.display = "none";
                });
                // setCompare([element[1][0],element[2][0]]);
                getClass("bar")[element[1][0]].style.backgroundColor = "blue";
                getClass("bar")[element[2][0]].style.backgroundColor = "blue";
                getClass("element-sort")[element[1][0]].style.display = "flex";
                getClass("element-sort")[element[2][0]].style.display = "flex";
                getClass("bar-sort")[element[1][0]].style.backgroundColor =
                    "blue";
                getClass("bar-sort")[element[2][0]].style.backgroundColor =
                    "blue";
            }, time * index);
        } else if (element[0] == "push") {
            times++;
            setTimeout(() => {
                Array.from(getClass("bar")).forEach((bar) => {
                    bar.style.backgroundColor = "#66aef1";
                });
                Array.from(getClass("bar-sort")).forEach((bar) => {
                    bar.style.backgroundColor = "#66aef1";
                });
                getClass("bar")[element[1][0]].style.backgroundColor = "red";
                getClass("bar-sort")[element[1][0]].style.backgroundColor =
                    "red";
                // getClass('bar')[element[1][0]].style.height = getClass('bar')[element[2][0]].style.height + 'px';
                // getClass('value')[element[1][0]].textContent = getClass('value')[element[2][0]].textContent;
                if (merge) {
                    getClass("bar")[element[2][0]].style.height =
                        element[2][1] + "px";
                    getClass("value")[element[2][0]].textContent =
                        element[2][1];
                } else {
                    swapBar(element[1], element[2]);
                }
            }, time * index);
        } else if (element[0] == "range") {
            //Draw range in svg
        } else if (element[0] == "getmid") {
            //Draw mid in range in svg
        }
    });
    setTimeout(() => {
        Array.from(getClass("bar")).forEach((bar) => {
            bar.style.backgroundColor = "#66aef1";
        });
        Array.from(getClass("element-sort")).forEach((bar) => {
            bar.style.display = "none";
        });
        // console.log(animation);
        console.log(times);
        clearAnimation();
        setArray(newArr);
    }, time * (animation.length + 1));
};

const mergeSortTemp = (arr, startIndex) => {
    let array = [...arr];
    if (array.length < 2) return array;
    let index = startIndex;
    let mid = Math.floor(array.length / 2);
    let left = mergeSortTemp(array.slice(0, mid), index);
    let right = mergeSortTemp(array.slice(mid), mid + index);

    let result = [];
    while (left.length > 0 && right.length > 0) {
        if (left[0][1] < right[0][1]) {
        }
    }
};

const quickSort = (array, left, right) => {
    if (left >= right) return null;
    let arr = [...array];
    let pivot = left;
    for (let i = left + 1; i <= right; i++) {
        let tempA = [...arr[i]];
        let tempB = [...arr[pivot]];
        animation.push(["com", tempA, tempB]);
        if (arr[i][1] < arr[pivot][1]) {
            animation.push(["push", tempA, tempB]);
            [arr[i][1], arr[pivot][1]] = [arr[pivot][1], arr[i][1]];
            tempA = [...arr[i]];
            tempB = [...arr[pivot + 1]];
            animation.push(["push", tempA, tempB]);
            [arr[i][1], arr[pivot + 1][1]] = [arr[pivot + 1][1], arr[i][1]];
            pivot++;
        }
    }
    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
    return arr;
};

// const quickSort2 = (array,left,right) => {
//     if(left>=right) return null;
//     let arr = [...array];
//     let indexStart = index;
//     if (arr.length <= 1) {
//         return arr;
//     }
//     // console.log(indexStart);

//     let less = [];
//     let greater = [];

//     let pivot = arr.length - 1;
//     let pivotNum = arr[pivot][1];
//     console.log('P'+pivotNum)
//     for (let i = 0; i < arr.length - 1; ++i) {
//         let num = arr[i][1];
//         let tempA = [...arr[i]];
//         let tempB = [...arr[pivot]];
//         animation.push(["com", tempA, tempB]);

//         if (num < pivotNum) {
//             // console.log(arr[indexStart]);
//             // let tempC = [...arr[indexStart]];
//             // animation.push(['push', tempA, tempC]);
//             less.push(arr[i]);
//             indexStart++;
//             console.log('S'+indexStart)
//         } else {
//             // let tempC = [...arr[indexStart]];
//             // animation.push(['push', tempA, tempC]);
//             greater.push(arr[i]);
//             indexStart++;
//             console.log('B'+indexStart)

//         }
//     }

//     return [...quickSort(less,0), pivot, ...quickSort(greater,pivot+1)];
// };
const librarySort = (array) => {};
const heapSort = (array) => {};

export {
    get,
    getClass,
    bubbleSort,
    insertionSort,
    selectionSort,
    mergeSort,
    quickSort,
    heapSort,
    librarySort,
    animation,
    doAnimation,
    clearAnimation,
    setTime,
};
