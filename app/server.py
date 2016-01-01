from os import path
from flask import Flask

import config
from services.ulti import env

# Load configration
config.add_json_config()
conf = config.configuration

# Initialize app
static = path.relpath(conf["hosting.static"])
app = Flask("BookStore", static_folder=static)
app.config["environment"] = env("FLASK_ENV") or "Development"


# Configure routes and services
config.configure_services("mongo", app)
config.configure_routes(app)


# Start server
if __name__ == "__main__":
    debug = app.config["environment"] == "Development"
    host = env("FLASK_HOST") or conf["hosting.host"]
    port = env("FLASK_PORT") or conf["hosting.port"]
    print debug, host, port
    app.run(debug=True, port=int(port))
