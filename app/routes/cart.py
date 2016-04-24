import json

from bson.objectid import ObjectId
from flask import session, request

from services.auth_ulti import require_auth
from services.ulti import normalize_id
from services import provider

# pylint: disable=W0612

def config(app):
	"""
	/api/user
	app (Flask): the flask object.
	provider (provider): provider.py module
	"""
	base = "/api/cart"
	books = provider.request("MongoService").get_collection("books")
	redis = provider.request("RedisService")

	@app.route(base, methods=["GET"])
	@require_auth
	def getCart():
		cartKey = getCartKey()
		items = json.loads(redis.get(cartKey))
		ids = [ObjectId(item["id"]) for item in items]
		docs = []
		for doc in books.find({"_id": {"$in": ids}}):
			doc = normalize_id(doc)
			qty = [item["qty"] for item in items if item["id"] == doc["id"]][0] 
			docs.append({"book": doc, "qty": qty})
		return json.dumps(docs)

	@app.route(base, methods=["POST"])
	@require_auth
	def updateCart():
		cartKey = getCartKey()
		data = request.data.replace("\n", "")
		redis.set(cartKey, data)
		return ""

	def getCartKey():
		email = session["user_info"]["email"]
		return "user:" + email + ":cart"
