from functools import wraps

from flask import session, abort


def require_auth(f):
	@wraps(f)
	def decorated(*args, **kwargs):
		if "credentials" in session:
			return f(*args, **kwargs)
		else: 
			return ""
	return decorated