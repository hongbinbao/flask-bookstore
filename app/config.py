from os import path
import json

configuration = {}
cwd = path.dirname(__file__)


def load_configuration(file_name, base_name=None):
    """
    Load json configuration file
    file_name(string): file name
    base_name(string): namespace for the configuration key in object
        if not set then take file_name without its extension
        Example: hosting.port => hosting is base_name
    """
    base_name = base_name or file_name[:file_name.index(".")]
    with open(path.join(cwd, file_name)) as data_file:
        data = json.load(data_file)
        for key in data:
            configuration[base_name + "." + key] = data[key]

# Load configuration
for f in ["hosting.json", "mongo.json"]:
    load_configuration(f)
