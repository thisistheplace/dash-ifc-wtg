from dash import no_update
from dash.dependencies import Input, Output, State

import uuid

from .app import app
from .fileutils import parse_contents

@app.callback(Output('confirm-upload', 'message'),
            Output('confirm-upload', 'displayed'),
            Output("ifc_viewer", "ifc_file_contents"),
            Input('upload-data', 'contents'),
            State('upload-data', 'filename'),
            prevent_initial_call=True)
def update_output(file_contents, filename):
    session_id = str(uuid.uuid4())
    try:
        ifc_data = parse_contents(file_contents, filename)
        return "", False, ifc_data
    except Exception as e:
        raise e
        return str(e), True, no_update