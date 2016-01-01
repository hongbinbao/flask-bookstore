from os import path
import pkgutil
import inspect
from flask import Flask

from config import configuration
import api
from services import provider
from services.ulti import env


static = path.realpath(configuration["hosting.static"])

# Initialize app
app = Flask("BookLibrary", static_folder=static)
app.config["environment"] = env("FLASK_ENV") or "Development"


# Service configuration
provider.configure("mongo", app, configuration)

# Routing configuration
for importer, modname, ispkg in pkgutil.iter_modules(api.__path__):
    route = importer.find_module(modname).load_module(modname)
    if "config" in dir(route):
        args = inspect.getargspec(route.config).args
        if len(args) == 2:
            route.config(app, provider)
        else:
            route.config(app)

# Start server
if __name__ == "__main__":
    debug = app.config["environment"] == "Development"
    host = env("FLASK_HOST") or configuration["hosting.host"]
    port = env("FLASK_PORT") or configuration["hosting.port"]
    print debug, host, port
    app.run(debug=True, port=int(port))
