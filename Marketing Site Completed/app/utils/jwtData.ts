import jwt from 'jsonwebtoken'

async function createToken(userName: string, role: string) {
    const token = jwt.sign({ userName: userName, Role: role }, `${process.env.JWTKEY}`)
    return token
}

async function decodJwt(token: string) {
    return jwt.decode(token)
}

export { createToken, decodJwt }