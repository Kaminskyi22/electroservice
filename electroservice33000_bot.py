from telegram import Update, ReplyKeyboardMarkup, KeyboardButton
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
# ... існуючий код імпортів та налаштувань ...

keyboard = [
    [KeyboardButton("⚡️ Викликати електрика")],
    [KeyboardButton("💡 Дізнатись ціни"), KeyboardButton("❓ FAQ")],
    [KeyboardButton("📝 Залишити заявку"), KeyboardButton("📝 Відгук")],
    [KeyboardButton("📞 Контакти")]
]
reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = update.effective_user
    logger.info(f"start() called by user: {user.id} ({user.first_name})")
    await update.message.reply_text(
        f'Вітаємо, {user.first_name}! Я бот ElectroService ⚡️\n'
        'Оберіть дію нижче або напишіть питання.\n'
        'Ми допоможемо з електрикою у Рівному та області.',
        reply_markup=reply_markup
    )

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = update.effective_user
    message = update.message.text
    logger.info(f"handle_message() called by user: {user.id} ({user.first_name}), message: {message}")

    if message == "⚡️ Викликати електрика":
        await update.message.reply_text("Залиште адресу та коротко опишіть проблему — наш майстер зв'яжеться з вами найближчим часом.")
        return
    elif message == "💡 Дізнатись ціни":
        await update.message.reply_text("Ознайомитись з орієнтовними цінами можна на нашому сайті electroservice.com.ua або уточнити у менеджера.")
        return
    elif message == "❓ FAQ":
        await update.message.reply_text(
            "Поширені питання:\n"
            "— Які послуги ви надаєте?\n"
            "— Які ціни?\n"
            "— Як швидко приїде майстер?\n"
            "— Як оплатити?\n"
            "— Чи є гарантія?\n"
            "Поставте своє питання — і ми відповімо!"
        )
        return
    elif message == "📞 Контакти":
        await update.message.reply_text(
            "Наші контакти:\n"
            "м. Рівне, вул. Електриків, 1\n"
            "Телефон: +380 67 123 45 67\n"
            "Email: electroservice33000@gmail.com\n"
            "Сайт: electroservice.com.ua"
        )
        return
    elif message == "📝 Залишити заявку":
        await update.message.reply_text("Напишіть, будь ласка, адресу, суть проблеми та контактний номер.")
        return
    elif message == "📝 Відгук":
        await update.message.reply_text("Будемо вдячні за ваш відгук! Напишіть його у відповідь на це повідомлення.")
        return

    # Пересилання повідомлення адміну
    await context.bot.send_message(
        chat_id=ADMIN_CHAT_ID,
        text=f'Нове повідомлення від {user.first_name} (ID: {user.id}):\n\n{message}'
    )
    await update.message.reply_text('Ваше повідомлення отримано та передано адміністратору.')

# Add health check endpoint
async def health_check(request):
    return web.Response(text="OK")

app.router.add_get("/health", health_check)
# Додаю ще один endpoint на '/'
app.router.add_get("/", health_check)
# ... решта коду без змін ... 