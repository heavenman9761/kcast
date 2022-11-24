from application import app
from pages.api import api
from pages.index import index

app.register_blueprint(api, url_prefix="/api")
app.register_blueprint(index,url_prefix='')