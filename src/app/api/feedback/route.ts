import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, type } = body;

    // Налаштування транспортера для відправки email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Формування повідомлення
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `[${type.toUpperCase()}] Зворотній зв'язок від ${name}`,
      text: `
        Ім'я: ${name}
        Email: ${email}
        Тип: ${type}
        Повідомлення: ${message}
      `,
      html: `
        <h2>Нове повідомлення зворотного зв'язку</h2>
        <p><strong>Ім'я:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Тип:</strong> ${type}</p>
        <p><strong>Повідомлення:</strong></p>
        <p>${message}</p>
      `,
    };

    // Відправка email
    await transporter.sendMail(mailOptions);

    // Збереження в базу даних (якщо потрібно)
    // await prisma.feedback.create({ data: { name, email, message, type } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing feedback:', error);
    return NextResponse.json(
      { error: 'Failed to process feedback' },
      { status: 500 }
    );
  }
} 