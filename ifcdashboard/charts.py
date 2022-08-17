import plotly.graph_objects as go
import pandas as pd

def radar_chart(ifc_data: pd.DataFrame):
    fig = go.Figure(
        data=go.Scatterpolar(
            r=ifc_data.values[0],
            theta=ifc_data.columns.values,
            fill='toself'
        ),
    )

    fig.update_layout(
        polar=dict(
            radialaxis=dict(
            visible=True
            ),
        ),
        showlegend=False,
    )
    return fig 

def histogram(ifc_data: pd.DataFrame, column=None):
    fig = go.Figure()
    if column is None:
        column = ifc_data.columns.values[0]
    fig.add_trace(
        go.Scatter(
            x=list(range(len(ifc_data[column]))),
            y=ifc_data[column],
            mode='lines',
            name=column,
        )
    )
    fig.update_layout(showlegend=True)
    return fig

