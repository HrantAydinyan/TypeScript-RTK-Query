import React, { FC } from 'react';
import { Route } from 'react-router-dom';

interface IMultiRoute {
    path: string | string[];
    element: React.ReactChild;
}

const MultiRoutes: FC<IMultiRoute> = ({ path, element }) => {
    return (
        <>
            {Array.isArray(path) ? (
                path.map((p) => <Route path={p} element={element} key={p} />)
            ) : (
                <Route path={path} element={element} />
            )}
        </>
    );
};

export default MultiRoutes;
