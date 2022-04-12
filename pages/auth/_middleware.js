import { NextResponse } from "next/server";

export async function middleware(req, ev) {
  const {token = ''} = req.cookies;
  
  if (!token) {
    return NextResponse.next();
  } else{
    const url = req.nextUrl.clone()
    url.pathname = '/';
    return NextResponse.redirect(url)
  }
}