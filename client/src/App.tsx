import axios from 'axios'
import { Container, Typography, TextField, Box, Button, Snackbar, Alert, CircularProgress } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { SyntheticEvent, useState } from 'react'
import { CsvLine } from './models/CsvLine'
import { CsvDataComponent } from './components/CsvDataComponent'

function App() {
    const [paginatedCsvData, paginatedCsvDataSet] = useState<CsvLine[]>([])

    const [loadingCsv, loadingCsvSet] = useState<boolean>(false)

    const [notificationOpen, notificationOpenSet] = useState<boolean>(false)
    const [alertMessage, alertMessageSet] = useState<string>('')
    const [alertType, alertTypeSet] = useState<'warning' | 'info' | 'success' | 'error'>('info')

    const openNotification = (message: string, type: 'warning' | 'info' | 'success' | 'error') => {
        alertMessageSet(message)
        alertTypeSet(type)
        notificationOpenSet(true)
    }

    const closeSnackBar = () => {
        alertTypeSet('info')
        alertMessageSet('')
        notificationOpenSet(false)
    }

    const removeLastFilePath = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement
        target.value = ''
    }

    const uploadCsv = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement
        const filesArray = target.files

        if (!filesArray) return
        if (!filesArray.length) return

        if (filesArray.length > 1) {
            openNotification('You can only submit one CSV at a time!', 'error')
            return
        }

        const file = filesArray[0]
        const formData = new FormData()
        formData.append('file', file)

        loadingCsvSet(true)

        axios
            .post('http://localhost:3000/api/files', formData)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                loadingCsvSet(false)
            })
    }

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

                <input
                    accept=".csv"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={uploadCsv}
                    onClick={removeLastFilePath}
                />
                <label htmlFor="raised-button-file">
                    <Button
                        variant="contained"
                        sx={{
                            display: 'flex',
                            borderRadius: '10px',
                            width: '250px',
                            backgroundColor: '#1F3F36',
                            color: '#ACA9BB',
                            gap: '5px',
                            alignItems: 'center',
                        }}
                        component="span"
                    >
                        {loadingCsv ? (
                            <CircularProgress size={24} />
                        ) : (
                            <>
                                <FileUploadIcon />
                                Upload new Csv
                            </>
                        )}
                    </Button>
                </label>
            </Box>

            <Snackbar open={notificationOpen} autoHideDuration={6000} onClose={closeSnackBar}>
                <Alert severity={alertType}>{alertMessage}</Alert>
            </Snackbar>
        </Container>
    )
}

export default App
