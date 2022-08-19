import React from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export const applyFullScreen = (Component) => {
    return (props) => {
        const handle = useFullScreenHandle();
  
        return <div>
            <button onClick={handle.enter} style={{position:"absolute", zIndex:1000}} class="mb-3 btn btn-primary">
                <i class="fa fa-expand"/>
            </button>
            <FullScreen handle={handle}>
                <Component {...props} />;
            </FullScreen>
        </div>;
    };
  };