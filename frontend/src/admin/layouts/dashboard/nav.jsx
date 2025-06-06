import { useEffect } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { usePathname } from '../../routes/hooks';
import { RouterLink } from '../../routes/components';
import { varAlpha } from '../../theme/styles';
import { Scrollbar } from '../../components/scrollbar';
import { Link } from 'react-router-dom';

export function NavContent({ data, slots, sx }) {
    const pathname = usePathname();

    const handleLogout = (path) => {
        if (path === '/auth') {
            window.location.href = '/auth';
        }
    }

    return (
        <>
            {slots?.topArea}

            <Scrollbar fillContent>
                <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column" sx={sx}>
                    <Box component="ul" gap={0.5} display="flex" flexDirection="column">
                        {data.map((item) => {

                            const isActived = item.path === pathname;

                            return (
                                <ListItem disableGutters disablePadding key={item.title}>
                                    <ListItemButton
                                        disableGutters
                                        component={Link}
                                        to={item.path}
                                        onClick={() => handleLogout(item.path)}
                                        sx={{
                                            pl: 2,
                                            py: 1,
                                            gap: 2,
                                            pr: 1.5,
                                            borderRadius: 0.75,
                                            typography: 'body2',
                                            fontWeight: 'fontWeightMedium',
                                            color: 'var(--layout-nav-item-color)',
                                            minHeight: 'var(--layout-nav-item-height)',
                                            ...(isActived && {
                                                fontWeight: 'fontWeightSemiBold',
                                                bgcolor: 'var(--layout-nav-item-active-bg)',
                                                color: 'var(--layout-nav-item-active-color)',
                                                '&:hover': {
                                                    bgcolor: 'var(--layout-nav-item-hover-bg)',
                                                },
                                            }),
                                        }}
                                    >
                                        <Box component="span" sx={{ width: 24, height: 24 }}>
                                            {item.icon}
                                        </Box>

                                        <Box component="span" flexGrow={1}>
                                            {item.title}
                                        </Box>
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </Box>
                </Box>
            </Scrollbar>

            {slots?.bottomArea}
        </>
    );
}

export function NavDesktop({ sx, data, slots, layoutQuery }) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                pt: 2.5,
                px: 2.5,
                top: 0,
                left: 0,
                height: 1,
                display: 'none',
                position: 'fixed',
                flexDirection: 'column',
                bgcolor: 'var(--layout-nav-bg)',
                zIndex: 'var(--layout-nav-zIndex)',
                width: 'var(--layout-nav-vertical-width)',
                borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)})`,
                [theme.breakpoints.up(layoutQuery)]: {
                    display: 'flex',
                },
                ...sx,
            }}
        >
            <NavContent data={data} slots={slots} />
        </Box>
    );
}

export function NavMobile({ sx, data, open, slots, onClose }) {
    const pathname = usePathname();

    useEffect(() => {
        if (open) {
            onClose(); // Closes the drawer when the pathname changes
        }
    }, [pathname]); // Effect runs on pathname change

    return (
        <Drawer
            open={open}
            onClose={onClose}
            sx={{
                [`& .${drawerClasses.paper}`]: {
                    pt: 2.5,
                    px: 2.5,
                    overflow: 'unset',
                    bgcolor: 'var(--layout-nav-bg)',
                    width: 'var(--layout-nav-mobile-width)',
                    ...sx,
                },
            }}
        >
            <NavContent data={data} slots={slots} />
        </Drawer>
    );
}

