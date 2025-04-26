import { PrismaClient } from '@prisma/client';
import { Twilio } from 'twilio';

const prisma = new PrismaClient();

const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function sendOtpCode(phone: string) {
  const code = Math.floor(100000 + Math.random()*900000).toString();
  const expiresAt = new Date(Date.now() + 5*60*1000);
  // store in DB
  await prisma.otp.create({ data: { phone, code, expiresAt } });
  // send SMS
  await twilioClient.messages.create({
    from: process.env.TWILIO_FROM,
    to:   phone,
    body: `Your login code is ${code}. It expires in 5 minutes.`,
  });
}

export async function verifyOtpCode(phone: string, code: string) {
  const rec = await prisma.otp.findFirst({
    where: { phone, code, used: false, expiresAt: { gt: new Date() } },
  });
  if (!rec) return false;
  await prisma.otp.update({ where: { id: rec.id }, data: { used: true } });
  return true;
}
