import originMapOption from "./mapOption.json"


export const createOption = (data) => {
    const copyOption = originMapOption
    const c = Object.values(copyOption)
    debugger
    data.map(item => {
        debugger
        if (item.state in copyOption) {
            copyOption[item.state].value = 0
        }
    })
    return Object.values(copyOption)
}