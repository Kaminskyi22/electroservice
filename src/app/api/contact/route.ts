import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = '7552582633:AAEn7czrdZ7skrIj-ocLDFTgYuK_tLdvbbg';
const TELEGRAM_CHAT_ID = '6125664936';

export async function POST(req: NextRequest) {
  try {
    const { name, phone, message } = await req.json();

    const text = `\u26A1 Нова заявка з сайту ElectroService!\n\nІм'я: ${name}\nТелефон: ${phone}\nПовідомлення: ${message}`;

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const tgRes = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }),
    });

    if (!tgRes.ok) {
      const err = await tgRes.text();
      return NextResponse.json({ ok: false, error: err }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
} 