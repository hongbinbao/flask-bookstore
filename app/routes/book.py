def config(app, provider):
    """
    /api/book
    app (Flask): the flask object.
    """

    db = provider.request("MongoService")

    # pylint: disable=W0612
    @app.route("/api/book", methods=["GET"])
    def get():
        print db
        count = db.get_collection("books").count()
        return str(count)
