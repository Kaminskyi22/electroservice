from telegram import Update, ReplyKeyboardMarkup, KeyboardButton
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
import aiohttp
import aiohttp.web
import asyncio
import logging
import os
from aiohttp import web

logger = logging.getLogger(__name__)

BOT_TOKEN = "7552582633:AAGQ7iCM-o8HH0LPGrW59RybckNQbJAfUF8"
ADMIN_CHAT_ID = "6125664936"
PORT = int(os.environ.get("PORT", 10000))

print("BOT STARTING")
print("BOT_TOKEN:", os.environ.get("BOT_TOKEN"))
print("ADMIN_CHAT_ID:", os.environ.get("ADMIN_CHAT_ID"))
print("PORT:", os.environ.get("PORT"))

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

async def main():
    logger.info("[BOT] Initializing Telegram Application...")
    application = Application.builder().token(BOT_TOKEN).build()
    # ... додавання handler-ів ...
    logger.info("[BOT] Deleting old webhook...")
    await application.bot.delete_webhook()
    logger.info("[BOT] Setting new webhook...")
    REND_DOMAIN = "electroservice.onrender.com"
    webhook_path = f"/webhook/{BOT_TOKEN}"
    webhook_url = f"https://{RENDER_DOMAIN}{webhook_path}"
    await application.bot.set_webhook(
        url=webhook_url,
        allowed_updates=["message", "callback_query"]
    )
    logger.info("[BOT] Initializing application...")
    await application.initialize()

    # Set up aiohttp server
    logger.info(f"[SERVER] Starting aiohttp server on port {PORT}...")
    app = web.Application()
    app['application'] = application
    app.router.add_post(webhook_path, webhook_handler)

    async def health_check(request):
        logger.info("[SERVER] Health check endpoint called.")
        return web.Response(text="OK")
    app.router.add_get("/health", health_check)
    app.router.add_get("/", health_check)

    runner = aiohttp.web.AppRunner(app)
    await runner.setup()
    site = aiohttp.web.TCPSite(runner, "0.0.0.0", PORT)
    await site.start()
    logger.info(f"[SERVER] aiohttp server started on port {PORT}!")
    await asyncio.Event().wait()

# --- створення app і endpoint-ів ---
app = web.Application()

async def health_check(request):
    logging.info("[SERVER] Health check endpoint called.")
    return web.Response(text="OK")
app.router.add_get("/health", health_check)
app.router.add_get("/", health_check)

async def webhook_handler(request):
    try:
        print("[WEBHOOK] Запит отримано!")
        application = request.app['application']
        data = await request.json()
        print(f"[WEBHOOK] Дані: {data}")
        logger.info(f"Received webhook update: {data}")
        update = Update.de_json(data, application.bot)
        await application.process_update(update)
        return web.Response(text="OK")
    except Exception as e:
        print(f"[WEBHOOK] ПОМИЛКА: {str(e)}")
        logger.error(f"Error in webhook handler: {str(e)}")
        return web.Response(status=500, text=str(e))

# --- запуск через web.run_app ---
if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    logging.info(f"[SERVER] Starting aiohttp server on port {PORT}...")
    asyncio.run(main())

# ... решта коду без змін ... 