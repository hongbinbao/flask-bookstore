from pymongo import MongoClient
from ulti import env
import provider


def configure(app, configuration):
    app.config["mongo.host"] = env("Mongo_Host") or configuration["mongo.host"]
    app.config["mongo.db"] = env("Mongo_Db") or configuration["mongo.db"]
    app.config["mongo.username"] = env("Mongo_Username")
    app.config["mongo.password"] = env("Mongo_Password")

    # Add dependency to provider
    service = MongoService(app.config).get_database()
    provider.register("MongoService", service)


# pylint: disable=R0903

class MongoService(object):

    def __init__(self, config):
        uri = "mongodb://"
        if config["mongo.username"]:
            uri += config["mongo.username"] + ":"
            uri += config["mongo.password"] + "@"
        uri += config["mongo.host"] + "/" + config["mongo.db"]
        client = MongoClient(uri)
        self._db = client.get_database(config["mongo.db"])

    # pylint: disable=W0612
    def get_database(self):
        return self._db
