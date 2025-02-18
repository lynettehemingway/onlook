import { useAuthManager, useProjectsManager, useRouteManager } from '@/components/Context';
import { Route } from '@/lib/routes';
import { observer } from 'mobx-react-lite';
import ProjectEditor from './editor';
import Projects from './projects';
import SignIn from './signin';
import { useEffect } from 'react';

const Routes = observer(() => {
    const routeManager = useRouteManager();
    const authManager = useAuthManager();
    const projectsManager = useProjectsManager();

    if (!authManager.authenticated && authManager.isAuthEnabled) {
        routeManager.route = Route.SIGN_IN;
    } else if (projectsManager.project) {
        routeManager.route = Route.EDITOR;
    } else {
        routeManager.route = Route.PROJECTS;
    }

    useEffect(() => {
        // lynette hemingway edit
        switch (routeManager.route) {
            case Route.EDITOR:
                document.title = 'Onlook - Project Editor';
                break;
            case Route.SIGN_IN:
                document.title = 'Onlook - Sign In';
                break;
            case Route.PROJECTS:
                document.title = 'Onlook - Projects';
                break;
            default:
                document.title = 'Onlook - Unknown Route';
        }
    }, [routeManager.route]);

    switch (routeManager.route) {
        case Route.EDITOR:
            return <ProjectEditor />;
        case Route.SIGN_IN:
            return <SignIn />;
        case Route.PROJECTS:
            return <Projects />;
        default:
            return <div>404: Unknown route</div>;
    }
});

export default Routes;
