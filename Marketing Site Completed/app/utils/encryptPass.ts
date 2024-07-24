import bcrypt from "bcrypt"
function encryptPass(pass: string) {
    const salt = bcrypt.genSaltSync(10)
    const encodPass = bcrypt.hashSync(pass, salt)
    return encodPass
}

function comparePass(pass: string, encyPass: string) {
    return bcrypt.compareSync(pass, encyPass)
}

export { encryptPass, comparePass }