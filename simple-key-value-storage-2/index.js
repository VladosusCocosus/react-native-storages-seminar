const fs = require("fs/promises");

const FILE_NAME = 'storage.text'

class Storage {
    storage = {}
    constructor() {
        fs.readFile(FILE_NAME)
            .then((buffer) => {
                const string_from_buffer = buffer.toString()

                const pairs = string_from_buffer.split('\n')

                this.storage = pairs.reduce((acc, item) => {
                    const [key, value] = item.split(' - ')
                    if (key && value) {
                        return {
                            ...acc,
                            [key]: value
                        }
                    }

                    return acc
                }, {})
            })
    }

    async setValue(key, value) {
        this.storage = {...this.storage, [key]: value}
        await fs.appendFile(FILE_NAME, key + ' - ' + value + '\n')

        return true
    }

    async getValue(key) {
        return this.storage[key] ?? null
    }
}




const storage = new Storage()

setTimeout(() => {
    const t1 = performance.now()
    storage.getValue('key1').then((r) => {
        console.log(r)
    })

    const t2 = performance.now()

    console.log(t2 - t1)
}, [1000])
