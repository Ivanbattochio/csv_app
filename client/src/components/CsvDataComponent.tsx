import React from 'react'
import { Typography, Box } from '@mui/material'
import { CsvLine } from '../models/CsvLine'

export const CsvDataComponent = ({ paginatedData }: { paginatedData: CsvLine[] }) => {
    if (!paginatedData.length) {
        return (
            <Box sx={{ display: 'flex', height: '60vh', alignItems: 'center' }}>
                <Typography>No data found!</Typography>
            </Box>
        )
    } else {
        return <Typography>ssajkhdjkas</Typography>
    }
}
