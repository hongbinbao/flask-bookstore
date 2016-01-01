from flask import render_template

"""
This module configure routing for the application
"""


def config(app):
    """
    Config routes
    app (Flask): the flask object.
    """

    # pylint: disable=W0612
    @app.route("/")
    def home():
        return render_template("index.html", environment=app.config["environment"])
