from bson.objectid import ObjectId
from bson.regex import Regex
from bson import json_util

from services.ulti import normalize_id
from services import provider

# pylint: disable=W0612


def config(app):
    """
    /api/book
    app (Flask): the flask object.
    provider (provider): provider.py module
    """
    base = "/api/book"
    db = provider.request("MongoService")
    books = db.get_collection("books")
    limit = 24

    @app.route(base + "/<string:book_id>", methods=["GET"])
    def get(book_id):
        doc = books.find_one({"_id": ObjectId(book_id)})
        doc = normalize_id(doc)
        return json_util.dumps(doc), 200

    @app.route(base + "/pages/<int:page_num>", methods=["GET"])
    def get_page(page_num):
        skip = page_num * limit
        projection = {"name": 1, "pictures": 1}
        docs = []
        for doc in books.find({}, projection).skip(skip).limit(limit):
            doc = normalize_id(doc)
            docs.append(doc)
        return json_util.dumps(docs), 200

    @app.route(base + "/search/<string:title>/pages/<int:page_num>", methods=["GET"])
    def find_book(title, page_num):
        skip = page_num * limit
        projection = {"name": 1, "pictures": 1}
        query = {"$or": []}
        title = title.replace("%20", " ")
        for keyword in title.split(" "):
            if len(keyword) > 1:
                criteria = {"name": Regex("^" + keyword.lower(), "i")}
                query["$or"].append(criteria)
        docs = []
        for doc in books.find(query, projection).skip(skip).limit(limit):
            doc = normalize_id(doc)
            docs.append(doc)
        return json_util.dumps(docs), 200
