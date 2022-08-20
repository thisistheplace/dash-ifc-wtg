import React from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export const applyFullScreen = (DashIfcWtg) => {
    return (props) => {
        const handle = useFullScreenHandle();
  
        return <div className={"fullsize"}>
            <button onClick={handle.enter} style={{position:"absolute", zIndex:1000}} className="mb-3 btn btn-primary">
                <i className="fa fa-expand"/>
            </button>
            <FullScreen handle={handle} className={"fullsize"}>
                <DashIfcWtg {...props} />
            </FullScreen>
        </div>;
    };
};