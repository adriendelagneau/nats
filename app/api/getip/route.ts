import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const ip = (request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
   
    console.log(ip, 'ip', request.ip)
    
    return NextResponse.json({ ip })
}
