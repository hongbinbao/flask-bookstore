import json

from flask import session, abort

def config(app):
	"""
	/api/user
	app (Flask): the flask object.
	provider (provider): provider.py module
	"""
	base = "/api/user"
	
	@app.route(base + "/info")
	def getUserInfo():
		if "credentials" in session:
			return json.dumps(session["user_info"], encoding='utf-8', ensure_ascii=False)
		else: 
			return abort(401)
