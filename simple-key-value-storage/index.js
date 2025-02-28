const fs = require("fs/promises");

const FILE_NAME = './storage.text'

async function setValue(key, value) {
    await fs.appendFile(FILE_NAME, key + ' - ' + value + '\n')

    return true
}



async function getValue(key) {
    const t3 = performance.now()
    const buffer = await fs.readFile(FILE_NAME)
    const string_from_buffer = buffer.toString()

    console.log(string_from_buffer)

    const pairs = string_from_buffer.split('\n')

    console.log(pairs)

    const pair = pairs.find((pair) => {
        const [_key] = pair.split(' - ')
        if (_key === key) {
            return true
        }
    })

    console.log(pair)

    if (!pair) {
        return null
    }

    const t4 = performance.now()
    console.log(t4 - t3)
    return pair.split(' - ')[1]
}


getValue('key2').then((r) => {
    console.log(r)
})
//
// const array = Array.from({length: 30000}, (x, i) => i)
//
// array.map((value) => {
//     setValue(value, 'new_value_' + value)
// })
//
//
// getValue('11').then((r) => {
//     console.log(r)
// })
//
//
//

