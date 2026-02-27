import { NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose'

const PUBLIC = ['/login']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('token')?.value

  const getSession = async () => {
    if (!token) return null
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
      const { payload } = await jose.jwtVerify(token, secret)
      return payload
    } catch {
      return null
    }
  }

  const session = await getSession()

  // Logged in user hitting /login → send to dashboard (/)
  if (PUBLIC.some(r => pathname.startsWith(r))) {
    if (session && !session.mustChangePassword) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next()
  }

  // No token → send to login
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Has token but must change password → only allow /change-password
  if (session.mustChangePassword && !pathname.startsWith('/change-password')) {
    return NextResponse.redirect(new URL('/change-password', req.url))
  }

  // Already changed password, don't let them back to /change-password
  if (!session.mustChangePassword && pathname.startsWith('/change-password')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}