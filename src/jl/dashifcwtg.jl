# AUTO GENERATED FILE - DO NOT EDIT

export dashifcwtg

"""
    dashifcwtg(;kwargs...)

A DashIfcWtg component.

Keyword arguments:
- `id` (String; optional): The ID used to identify the container for the IFC viewer component.
- `ifc_file_contents` (String; required): The contents of the ifc file
"""
function dashifcwtg(; kwargs...)
        available_props = Symbol[:id, :ifc_file_contents]
        wild_props = Symbol[]
        return Component("dashifcwtg", "DashIfcWtg", "dash_ifc_wtg", available_props, wild_props; kwargs...)
end

