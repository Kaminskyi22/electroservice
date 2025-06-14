from aiohttp import web
import os

async def hello(request):
    return web.Response(text="Hello, world!")

app = web.Application()
app.router.add_get("/", hello)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    web.run_app(app, port=port) 