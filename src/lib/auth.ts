import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword)
}

export async function createToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(SECRET_KEY))
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(
      token, 
      new TextEncoder().encode(SECRET_KEY)
    )
    return payload
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'JWTExpired') {
        return 'expired'
      }
    }
    return null

  }
}

export async function refreshToken(oldToken: string) {
  try {
    const payload = await verifyToken(oldToken)
    
    if (payload && typeof payload === 'object') {
      const newToken = await createToken({
        id: payload.id,
        role: payload.role
      })
      
      return newToken
    }
  } catch (error) {
    return null
  }
}