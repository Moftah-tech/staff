import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PublicIcon from '@mui/icons-material/Public';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Grid from '@mui/material/Grid2';
import {UsersTable} from "../pages/users.tsx";
import {CountriesTable} from "../pages/countries.tsx";

const NAVIGATION: Navigation = [
    /*{
        kind: 'header',
        title: 'Main items',
    },*/
    {
        segment: 'users',
        title: 'Users',
        icon: <DashboardIcon />,
    },
    {
        segment: 'countries',
        title: 'Countries',
        icon: <PublicIcon />,
    },
    {
        kind: 'divider',
    },
    /*{
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    },*/
];

const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function useDemoRouter(initialPath: string): Router {
    const [pathname, setPathname] = React.useState(initialPath);

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path: string | URL) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

export default function DashboardLayoutBasic(props: any) {
    const { window } = props;

    const router = useDemoRouter('/users');
    const demoWindow = window ? window() : undefined;

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout >
                    <Grid container spacing={1}>
                        {router.pathname == "/users" && <UsersTable />}
                        {router.pathname == "/countries" && <CountriesTable/>}
                    </Grid>
            </DashboardLayout>
        </AppProvider>
    );
}