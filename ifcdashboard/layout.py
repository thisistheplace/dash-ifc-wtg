import dash
from dash import html, dcc
import dash_bootstrap_components as dbc

import dash_ifc_wtg

from .constants import IFC_TYPES

class IfcLayout:
    
    def __init__(self):
        self._layout = self.setup_layout()

    def apply_layout(self, app: dash.Dash) -> None:
        """
        Apply layout to app

        Args:
            app (dash.App): app object to apply layout to
        """
        app.layout = self._layout

    def setup_layout(self) -> dbc.Container:
        layout = dbc.Container([
            dcc.ConfirmDialog(
                id='confirm-upload',
            ),
            html.Div(
                id='data-updated',
            ),
            # dcc.Store stores the intermediate value
            dcc.Store(id='session-id'),
            html.Div(
                [
                    html.Div([
                        dcc.Link("Dash", href="https://dash.plotly.com/"),
                        " / ",
                        dcc.Link("IFC.js", href="https://ifcjs.github.io/info/"),
                        " viewer"
                    ]),
                    html.Div(
                        dcc.Upload(
                            id='upload-data',
                            children=html.Div([
                                'Drag and Drop or ',
                                html.A('Select File')
                            ]),
                            style={
                                'width': '100%',
                                'height': '60px',
                                'lineHeight': '60px',
                                'borderWidth': '1px',
                                'borderStyle': 'dashed',
                                'borderRadius': '5px',
                                'textAlign': 'center',
                            },
                        ),
                        style={
                            "paddingTop":"20px"
                        }
                    )
                ],
                style={
                    "padding":"20px",
                    "paddingTop":"40px",
                    "fontSize": "40px"
                }
            ),
            html.Div(
                dash_ifc_wtg.DashIfcWtg("ifc_viewer", ""),
                style={"padding":"20px", "height":"75vh", "width":"100%"},
            )
        ],
        style={
            "height": "100%",
            "width": "100%"
        }
        )
        return layout
