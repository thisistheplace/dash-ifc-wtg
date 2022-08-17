import base64
from pathlib import Path

def read_file(fpath: str) -> str:
    resolved = Path(fpath).resolve()
    with open(resolved, "r") as f:
        fstring = f.read()
    return fstring

def read_wasm(fpath: str) -> bytes:
    resolved = Path(fpath).resolve()
    with open(resolved, "rb") as f:
        fbytes = f.read()
    return fbytes

def parse_contents(contents: bytes, filename: str) -> str:
    _, content_string = contents.split(',')

    decoded = base64.b64decode(content_string)

    if 'ifc' in filename.lower():
        return decoded.decode('utf-8')
    else:
        raise TypeError("Only .IFC file extensions are supported!")