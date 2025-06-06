import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Iconify } from '../../components/iconify';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export function RoomTableToolbar({ numSelected, filterName, selectedFilter, onFilterName, onFilterChange, onDeleteSelected }) {
    const filterOptions = [
        { value: 'room_name', label: 'Tên phòng chiếu' },
        { value: 'cinema_name', label: 'Tên rạp chiếu' },
    ]

    return (
        <Toolbar
            sx={{
                height: 96,
                display: 'flex',
                justifyContent: 'space-between',
                p: (theme) => theme.spacing(0, 1, 0, 3),
                ...(numSelected > 0 && {
                    color: 'primary.main',
                    bgcolor: 'primary.lighter',
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography component="div" variant="subtitle1">
                    {numSelected} đã chọn
                </Typography>
            ) : (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControl sx={{ minWidth: 150, mr: 2 }}>
                        <InputLabel>Bộ lọc</InputLabel>
                        <Select
                            value={selectedFilter}
                            onChange={(e) => onFilterChange(e.target.value)}
                            label="Bộ lọc"
                            fullWidth
                        >
                            {filterOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <OutlinedInput
                        fullWidth
                        value={filterName}
                        onChange={onFilterName}
                        placeholder="Tìm kiếm..."
                        startAdornment={
                            <InputAdornment position="start">
                                <Iconify width={20} icon="eva:search-fill" />
                            </InputAdornment>
                        }
                        sx={{ maxWidth: 320 }}
                    />
                </Box>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Xóa">
                    <IconButton
                        onClick={onDeleteSelected}
                        sx={{
                            color: 'error.main',
                            '&:hover': { backgroundColor: 'action.hover' },
                        }}
                    >
                        <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                </Tooltip>
            ) : null}
        </Toolbar>
    );
}
