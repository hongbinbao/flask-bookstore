import json
import pkgutil
# import inspect
from os import path

import routes
from services import provider
from services.ulti import env

configuration = {}


def add_json_config():

	cwd = path.dirname(__file__)

	def load_configuration(file_name, base_name=None):
		"""
		Load json configuration file
		file_name(string): file name
		base_name(string): namespace for the configuration key in object
			if not set then take file_name without its extension
			Example: hosting.port => hosting is base_name
		"""
		base_name = base_name or file_name[:file_name.index(".")]
		with open(path.join(cwd, file_name)) as data_file:
			data = json.load(data_file)
			for key in data:
				configuration[base_name + "." + key] = data[key]
	
	# Load configuration
	for f in ["hosting.json", "mongo.json"]:
		load_configuration(f)
	
	# Load secret key for Google Authentication
	if env("FLASK_ENV") != "Production":
		for f in ["secret.json"]:
			load_configuration(f)
	else:
		keys = ["secret.google:clientId", "secret.google:clientSecret", "secret.google:host"]
		for k in keys:
			configuration[k] = env(k)

# Service configuration


def configure_services(service_name, app):
	provider.configure(service_name, app, configuration)

# Routing configuration

# pylint: disable=W0612
def configure_routes(app):
	for importer, modname, ispkg in pkgutil.iter_modules(routes.__path__):
		route = importer.find_module(modname).load_module(modname)
		if "config" in dir(route):
			route.config(app)
			# args = inspect.getargspec(route.config).args
			# if len(args) == 2:
			#     route.config(app, provider)
			# else:
			#     route.config(app)
