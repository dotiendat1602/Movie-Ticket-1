import { useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import { Iconify } from '../../components/iconify';
import { Main } from './main';
import { layoutClasses } from '../classes';
import { NavMobile, NavDesktop } from './nav';
import { navData } from '../config-nav-dashboard';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { ScrollToTop } from '../../components/ScrollToTop';
// import { _myAccount } from '../../_mock'

export function DashboardLayout({ sx, children, header }) {
    const theme = useTheme();

    const [navOpen, setNavOpen] = useState(false);

    const layoutQuery = 'lg';

    return (
        <LayoutSection
            //Header
            headerSection={
                <HeaderSection
                    layoutQuery={layoutQuery}
                    slotProps={{
                        container: {
                            maxWidth: false,
                            sx: { px: { [layoutQuery]: 5 } },
                        },
                    }}
                    sx={header?.sx}
                    slots={{
                        topArea: null,
                        // (
                        //     <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                        //         This is an info alert.
                        //     </Alert>
                        // ),
                        leftArea: (
                            <>
                                <MenuButton
                                    onClick={() => setNavOpen(true)}
                                    sx={{
                                        ml: -1,
                                        [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                                    }}
                                />
                                <NavMobile
                                    data={navData}
                                    open={navOpen}
                                    onClose={() => setNavOpen(false)}
                                />
                            </>
                        ),
                        rightArea: null,
                        // (
                        // <Box gap={1} display="flex" alignItems="center">
                        //     <Iconify
                        //         icon="solar:user-circle-bold-duotone"
                        //         width={22}
                        //         sx={{ cursor: 'pointer' }}
                        //         onClick={() => alert('Account icon clicked')} // Replace with desired action
                        //     />
                        // </Box>
                        // <Avatar src={_myAccount.photoURL} alt={_myAccount.displayName} sx={{ width: 40, height: 40 }} />
                        // ),
                    }}
                />
            }
            //Sidebar
            sidebarSection={
                <NavDesktop data={navData} layoutQuery={layoutQuery} />
            }
            //Footer
            footerSection={null}
            //Style
            cssVars={{
                '--layout-nav-vertical-width': '300px',
                '--layout-dashboard-content-pt': theme.spacing(1),
                '--layout-dashboard-content-pb': theme.spacing(8),
                '--layout-dashboard-content-px': theme.spacing(5),
            }}
            sx={{
                [`& .${layoutClasses.hasSidebar}`]: {
                    [theme.breakpoints.up(layoutQuery)]: {
                        pl: 'var(--layout-nav-vertical-width)',
                    },
                },
                ...sx,
            }}
        >
            <ScrollToTop />
            <Main>{children}</Main>
        </LayoutSection>
    );
}