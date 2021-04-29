module.exports = (property, objArr) => {
    return objArr.reduce((acc, cur) => {
        acc.push(cur[property]);
        return acc
    }, []);
}