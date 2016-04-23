import json

from flask import session, abort

from services.auth_ulti import require_auth

def config(app):
	"""
	/api/user
	app (Flask): the flask object.
	provider (provider): provider.py module
	"""
	base = "/api/user"
	
	@app.route(base + "/info")
	@require_auth
	def getUserInfo():
		return json.dumps(session["user_info"], encoding='utf-8', ensure_ascii=False)
