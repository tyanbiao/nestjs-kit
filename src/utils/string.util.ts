export function generateRandomString(length = 8) {
    let result = ''
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charLen = characters.length
    const alphabetCharLen = charLen - 10
    for (let i = 0; i < length; i++) {
        const position = Math.floor(
            Math.random() * (i === 0 ? alphabetCharLen : charLen)
        )
        result += characters.charAt(position)
    }
    return result
}
