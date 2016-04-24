import redis

from ulti import env
import provider

def configure(app, configuration):
    app.config["redis.host"] = env("RedisHost") or "localhost"
    app.config["redis.port"] = env("RedisPort") or 6379
    app.config["redis.password"] = env("RedisPassword")

    # Add dependency to provider
    service = RedisService(app.config).get_database()
    provider.register("RedisService", service)
	
# pylint: disable=R0903

class RedisService(object):

    def __init__(self, config):
		self._db = redis.Redis(
			host=config["redis.host"], 
			port=config["redis.port"], 
			password=config["redis.password"],
			db=0)

    def get_database(self):
        return self._db