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
    base = "/api/category"
    db = provider.request("MongoService")
    categories = db.get_collection("categories")
    books = db.get_collection("books")
    limit = 24

    @app.route(base + "/<string:category_id>", methods=["GET"])
    def category_get(category_id):
        category_id = category_id.replace("%20", " ")
        doc = books.find_one({"_id": category_id})
        doc = normalize_id(doc)
        return json_util.dumps(doc), 200

    @app.route(base + "/<string:category_id>/pages/<int:page_num>", methods=["GET"])
    def category_get_page(category_id, page_num):
        category_id = category_id.replace("%20", " ")
        skip = page_num * limit
        query = {"category.ancestors": category_id}
        projection = {"name": 1, "pictures": 1}
        docs = []
        for doc in books.find(query, projection).skip(skip).limit(limit):
            doc = normalize_id(doc)
            docs.append(doc)
        return json_util.dumps(docs), 200
