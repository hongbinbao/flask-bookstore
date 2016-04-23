# New imports for this step
import random
import string
import httplib2

from flask import session, request, redirect, Response
from oauth2client import client
from apiclient.discovery import build


from config import configuration as conf

def setAntiforgery(seq):
	state = "".join(random.choice(seq) for _ in range(32))
	session["state"] = state

def loginGoogle(host):
	scopes = " ".join([
		"https://www.googleapis.com/auth/plus.me",
		"https://www.googleapis.com/auth/userinfo.email"
	])
	flow = client.OAuth2WebServerFlow(
				client_id=conf["secret.google:clientId"],
				client_secret=conf["secret.google:clientSecret"],
				scope=scopes,
				redirect_uri=host+"/auth/login")
						   
	if "code" not in request.args:
		auth_uri = flow.step1_get_authorize_url()
		return redirect(auth_uri)
	else:
		auth_code = request.args.get("code")
		credentials = flow.step2_exchange(auth_code)
		session["credentials"] = credentials.to_json()
		http = credentials.authorize(httplib2.Http())
		service = build("plus", "v1", http=http)
		mePerson = service.people().get(userId="me").execute(http=http)
		session["user_info"] = {
			"name": mePerson["displayName"],
			"picture" : mePerson["image"]["url"],
			"email": mePerson["emails"][0]["value"]
		}
		return redirect("/")

# pylint: disable=W0612
def config(app):
	case = {"Google": loginGoogle}
	
	@app.route("/auth/login")
	def login():
		if "state" not in session:
			setAntiforgery(string.ascii_uppercase + string.digits)
		if "authscheme" in request.args:
			session["scheme"] = request.args.get("authscheme")
		host = conf["secret.google:host"] if "secret.google:host" in conf else "http://localhost"
		host += "" if "secret.google:host" in conf else ":" + str(app.config["port"])
		return case[session["scheme"]](host)
		
	@app.route("/auth/logout")
	def logout():
		session.clear()
		Response().delete_cookie("session")
		return redirect("/")
		
		