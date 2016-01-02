from os import environ


def env(var):
    try:
        return environ[var]
    except KeyError:
        return None


def normalize_id(obj):
    p = [obj]
    while p:
        for doc in p:
            if "_id" in doc:
                doc["id"] = str(doc["_id"])
                del doc["_id"]
            for val in doc.values():
                if isinstance(val, dict) and "_id" in val:
                    p.append(val)
            p.remove(doc)
    return obj
