class Sample {
    add = (a, b) => {
        if (a === null) {
          a = 0
        }
        return a + b
    }

    sub = (a, b) => {
        return a - b
    }
}
export default Sample;