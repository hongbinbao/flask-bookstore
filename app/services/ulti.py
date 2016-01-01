from os import environ

def env(var):
    try:
        return environ[var]
    except KeyError:
        return None
