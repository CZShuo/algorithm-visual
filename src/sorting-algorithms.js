import React from 'react';
import ReactDOM from 'react-dom';

const get = (selector) => {
    return document.querySelector(selector);
};
const getClass = (selector) => {
    return document.getElementsByClassName(selector);
};


const swapBar = (oldBar, toBar) => {
    getClass('bar')[oldBar[0]].style.height = toBar[1] + 'px';
    getClass('bar')[toBar[0]].style.height = oldBar[1] + 'px';
    getClass('value')[oldBar[0]].textContent = toBar[1];
    getClass('value')[toBar[0]].textContent = oldBar[1];
}
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
            animation.push(['com', arr[i], arr[i + 1]]);
            if (arr[i][1] > arr[i + 1][1]) {
                let tempA = [...arr[i]];
                let tempB = [...arr[i + 1]];
                animation.push(['push', tempA, tempB]);
                [arr[i][1], arr[i + 1][1]] = [arr[i + 1][1], arr[i][1]];
                swap = true;
            }
        }
    } while (times > 0 && swap);

    return arr;
}

const insertionSort = (array) => {
    
}
const selectionSort = (array) => {}

let time = 100;
let animation = [];
const clearAnimation = () => {
    animation = [];
}

//O(nlogn)
const mergeSort = (arr, startIndex) => {
    let array = [...arr];
    animation.push(['range', array]);
    if (array.length < 2) return array;
    let index = startIndex;
    let mid = Math.floor(array.length / 2);
    animation.push(['getmid', mid]);
    let left = mergeSort(array.slice(0, mid), index);
    let right = mergeSort(array.slice(mid), mid + index);

    let result = [];
    while (left.length > 0 && right.length > 0) {
        animation.push(['com', [...left[0]],
            [...right[0]]
        ]);
        if (right[0][1] < left[0][1]) {
            // console.log('r'+right+' '+left);
            let temp = [index, right[0][1]];
            result.push(temp);
            animation.push(['push', [...right[0]], temp]);
            right.shift();
        } else {
            // console.log('l'+left[0]+' '+right[0]);
            let temp = [index, left[0][1]];
            result.push(temp);
            animation.push(['push', [...left[0]], temp]);
            left.shift();
        }
        index++;
    }
    if (left.length > 0) {
        left.forEach(element => {
            // console.log('ll'+element);
            let temp = [index, element[1]];
            result.push(temp);
            animation.push(['push', [...element], temp]);
            index++;
        })
    } else if (right.length > 0) {
        right.forEach(element => {
            // console.log('rr'+element);
            let temp = [index, element[1]];
            result.push(temp);
            animation.push(['push', [...element], temp]);
            index++;
        })
    }
    merge = true;
    return result;
}
const doAnimation = (animation, setArray, newArr) => {
    animation.forEach((element, index) => {
        index = index + 1;
        if (element[0] == 'com') {
            setTimeout(() => {
                Array.from(getClass('bar')).forEach(bar => {
                    bar.style.backgroundColor = '#66aef1';
                })
                Array.from(getClass('element-sort')).forEach(bar => {
                    bar.style.display = 'none';
                })
                getClass('bar')[element[1][0]].style.backgroundColor = 'blue';
                getClass('bar')[element[2][0]].style.backgroundColor = 'blue';
                getClass('element-sort')[element[1][0]].style.display = 'flex';
                getClass('element-sort')[element[2][0]].style.display = 'flex';
                getClass('bar-sort')[element[1][0]].style.backgroundColor = 'blue';
                getClass('bar-sort')[element[2][0]].style.backgroundColor = 'blue';
            }, time * index)
        } else if (element[0] == 'push') {
            setTimeout(() => {
                Array.from(getClass('bar')).forEach(bar => {
                    bar.style.backgroundColor = '#66aef1';
                })
                Array.from(getClass('bar-sort')).forEach(bar => {
                    bar.style.backgroundColor = '#66aef1';
                })
                getClass('bar')[element[1][0]].style.backgroundColor = 'red';
                getClass('bar-sort')[element[1][0]].style.backgroundColor = 'red';
                // getClass('bar')[element[1][0]].style.height = getClass('bar')[element[2][0]].style.height + 'px';
                // getClass('value')[element[1][0]].textContent = getClass('value')[element[2][0]].textContent;
                if (merge) {
                    getClass('bar')[element[2][0]].style.height = element[2][1] + 'px';
                    getClass('value')[element[2][0]].textContent = element[2][1];
                } else {
                    swapBar(element[1], element[2]);
                }


            }, time * index)
        } else if (element[0] == 'range') {
            //Draw range in svg
        } else if (element[0] == 'getmid') {
            //Draw mid in range in svg
        }
    })
    setTimeout(() => {
        Array.from(getClass('bar')).forEach(bar => {
            bar.style.backgroundColor = '#66aef1';
        })
        Array.from(getClass('element-sort')).forEach(bar => {
            bar.style.display = 'none';
        })
        // console.log(animation);
        clearAnimation();
        setArray(newArr);
    }, time * (animation.length + 1))
}

const quickSort = (array) => {}
const heapSort = (array) => {}
const librarySort = (array) => {}

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
    clearAnimation
}