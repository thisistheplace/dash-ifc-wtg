import dash
import dash_bootstrap_components as dbc
from flask import Flask, make_response
from flask_caching import Cache
from flask_restful import Resource, Api

from .fileutils import read_wasm
from .layout import IfcLayout

server = Flask('my_app')
app = dash.Dash(server=server, external_stylesheets=[dbc.themes.SIMPLEX])
api = Api(server)

class WasmFile(Resource):
    def get(self):
        response = make_response(read_wasm("assets/web-ifc.wasm"))
        response.headers["content-type"] = "application/wasm"
        return response

api.add_resource(WasmFile, '/web-ifc.wasm')

cache = Cache(server,
    config={
        #'CACHE_TYPE': 'redis',
        'CACHE_TYPE': 'filesystem',
        'CACHE_DIR': 'cache-directory',
        # should be equal to maximum number of users on the app at a single time
        # higher numbers will store more data in the filesystem / redis cache
        'CACHE_THRESHOLD': 200
    }
)

IfcLayout().apply_layout(app)