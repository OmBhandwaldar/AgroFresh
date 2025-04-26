import { NextResponse } from "next/server";
import { sendOtpCode } from "@/lib/otp";

export async function POST(req: Request) {
  const { phone } = await req.json();
  if (!phone) {
    console.log("Error(by dev) from send-otp/route.ts")
    return NextResponse.error();
  }
  
  await sendOtpCode(phone);
  return NextResponse.json({ success: true });
}
// export async function POST(req: Request) {
//   const { phone } = await req.json();
//   if (!phone) return NextResponse.error();
//   await sendOtpCode(phone);
//   return NextResponse.json({ success: true });
// }