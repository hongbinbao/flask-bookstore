import importlib

"""
Provider for all services
"""

__dict__ = {}

def register(service_name, service):
    __dict__[service_name] = service

def request(service_name):
    return __dict__[service_name]

def configure(service_name, *args):
    service = importlib.import_module("services." + service_name)
    service.configure(*args)
