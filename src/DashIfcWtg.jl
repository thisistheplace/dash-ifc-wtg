
module DashIfcWtg
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.3"

include("jl/dashifcwtg.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "dash_ifc_wtg",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "dash_ifc_wtg.min.js",
    external_url = "https://unpkg.com/dash_ifc_wtg@0.0.3/dash_ifc_wtg/dash_ifc_wtg.min.js",
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dash_ifc_wtg.min.js.map",
    external_url = "https://unpkg.com/dash_ifc_wtg@0.0.3/dash_ifc_wtg/dash_ifc_wtg.min.js.map",
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
