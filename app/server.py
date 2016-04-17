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
app.secret_key = env("FLASK_SECRET") or "Development secret_key" 
app.config["environment"] = env("FLASK_ENV") or "Development"
app.config["DEBUG"] = app.config["environment"] == "Development"
app.config["host"] = env("HOST") or conf["hosting.host"]
app.config["port"] = env("PORT") or conf["hosting.port"]

# Configure routes and services
config.configure_services("mongo", app)
config.configure_routes(app)

# Start server
if __name__ == "__main__":
	debug = app.config["DEBUG"]
	host = app.config["host"]
	port = app.config["port"]
	app.run(debug=debug, port=int(port), host=host)
