const isCheckbox = el => el.type === "checkbox"
const isSelect = el => el.tagName === "SELECT"
const isNotChecked = el => el.checked !== true
const getName = el => el.name
const getValue = el => el.value
const filterInObjByKeys = (obj, correctKeys) => {
    const newObj = { ...obj }
    Object.keys(newObj).forEach(key => {
        if (!correctKeys.includes(key)) {
            delete newObj[key]
        }
    })
    return newObj
}
// stringToInt :: String -> Int || NaN
const stringToInt = string => parseInt(string, 10)
// secToHour :: Number -> Number
const secToHour = s => s / 3600