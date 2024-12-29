# HEXend

```shell
$ python -m venv .venv
$ source .venv/bin/activate.fish
$ pip install -r requirements.txt
$ sudo pacman -S redis
$ sudo systemctl start redis
$ uvicorn hexend.asgi:application --reload
```