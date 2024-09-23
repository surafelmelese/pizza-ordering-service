// src/components/SearchBar.js
import { TextField, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ placeholder, value, onChange }) => {
    return (
        <Box my={2} mx="auto" width="100%">
            <TextField
                fullWidth
                variant="outlined"
                value={value}
                onChange={onChange}
                sx={{
                    borderRadius: '50px', // Round edges
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '50px', // Round edges for the input
                    },
                    '& .MuiInputBase-input': {
                        height: '80px', // Increase height for a larger search bar
                        padding: '0 20px', // Adjust padding for better spacing
                        textAlign: 'left', // Align text to the left
                        verticalAlign: 'middle', // Vertically center the text
                    },
                }}
                placeholder={placeholder} // Set placeholder
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Box
                                sx={{
                                    bgcolor: 'orange',
                                    borderRadius: '50%', // Keep it circular
                                    p: 3, // Increase padding for a larger circle
                                    display: 'flex', // Center the icon
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <SearchIcon sx={{ color: 'white' }} />
                            </Box>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

export default SearchBar;