// Currently: descending order
export default function quickSortByTime(
    arr: QuickParam
) : QuickParam {
    // Base case
    if (arr.length < 2) return arr

    // Create a copy to not affect original array
    const arrCopy = [...arr]

    const midIndex = Math.floor(arrCopy.length / 2)
    const midObj = arrCopy[midIndex]

    // Split array into two halves and sort values to their respective arrays
    const [lowerHalf, upperHalf]: Array<QuickParam> = arrCopy.reduce(
        (halfArrs, curObj, curIndex) => {
            // Check if value is for lowerHalf
            if (curObj.dateMS < midObj.dateMS || (curIndex !== midIndex && curObj.dateMS === midObj.dateMS)){
                halfArrs[1].push(curObj) // halfArrs[0] (here) for ascending order
            }    
            // or for the upperHalf
            else if (curObj.dateMS > midObj.dateMS){
                halfArrs[0].push(curObj) // halfArrs[1] (here) for ascending order
            }
            return halfArrs
        },
        // Initiate with empty arrays
        // lowerHalf = halfArrs[0] && upperHalf = halfArrs[1]
        [[], []] as Array<QuickParam>
    )

    // Keep splitting into halves to sort till base case
    return [...quickSortByTime(lowerHalf), midObj, ...quickSortByTime(upperHalf)]
}