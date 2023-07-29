import { Container, Typography, TextField, Box, Button } from '@mui/material'
import { useState } from 'react'
import { CsvLine } from './models/CsvLine'
import { CsvDataComponent } from './components/CsvDataComponent'

function App() {
    const [paginatedCsvData, paginatedCsvDataSet] = useState<CsvLine[]>([])

    return (
        <Container fixed sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
            <Typography sx={{ fontWeight: '600' }} color="#ACA9BB" fontSize={50}>
                CSV UPLOADER
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
                <TextField
                    id="outlined-basic"
                    label="Search CSV Fields"
                    variant="outlined"
                    sx={{ backgroundColor: '#ACA9BB', borderRadius: '10px', width: '60%' }}
                />
                <CsvDataComponent paginatedData={paginatedCsvData}></CsvDataComponent>

                <input accept="image/*" style={{ display: 'none' }} id="raised-button-file" multiple type="file" />
                <label htmlFor="raised-button-file">
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: '10px',
                            width: '100%',
                            backgroundColor: '#1F3F36',
                            color: '#ACA9BB',
                        }}
                        component="span"
                    >
                        Upload new Csv
                    </Button>
                </label>
            </Box>
        </Container>
    )
}

export default App
