import axios from 'axios'
import { Typography, TextField, Box, Button, Snackbar, Alert, CircularProgress } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { SyntheticEvent, useEffect, useState } from 'react'
import { CsvLine, File, PostFileResponse } from './models/CsvLine'
import { CsvDataComponent } from './components/CsvDataComponent'
import { FileComponent } from './components/FileComponent'

function App() {
    const [paginatedCsvData, paginatedCsvDataSet] = useState<CsvLine[]>([])

    const [loadingCsv, loadingCsvSet] = useState<boolean>(false)

    const [currentFileId, currentFileIdSet] = useState<string>('')
    const [files, filesSet] = useState<File[]>([])

    const [textField, textFieldSet] = useState<string>('')

    const [notificationOpen, notificationOpenSet] = useState<boolean>(false)
    const [alertMessage, alertMessageSet] = useState<string>('')
    const [alertType, alertTypeSet] = useState<'warning' | 'info' | 'success' | 'error'>('info')

    useEffect(() => {
        fetchAllFiles()
    }, [])

    const fetchAllFiles = () => {
        axios
            .get<File[]>('http://localhost:3000/api/files')
            .then((res) => {
                const files = res.data
                filesSet(files)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                loadingCsvSet(false)
            })
    }

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

    const updateTextFieldState = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement
        textFieldSet(target.value)
    }

    const fetchFileData = () => {}

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
            .post<PostFileResponse>('http://localhost:3000/api/files', formData)
            .then((res) => {
                const { fileId, successfullyInsertedLinesQuantity, wronglyFormattedLinesIndex } = res.data
                if (wronglyFormattedLinesIndex.length) {
                    openNotification(
                        `${successfullyInsertedLinesQuantity} line(s) were successfully inserted. The following lines were wrongly formatted: ${wronglyFormattedLinesIndex}`,
                        'warning'
                    )
                } else {
                    openNotification(`${successfullyInsertedLinesQuantity} line(s) were successfully inserted`, 'success')
                }
                currentFileIdSet(fileId)
                fetchAllFiles()
                fetchFileData()
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                loadingCsvSet(false)
            })
    }

    return (
        <Box sx={{ height: 1, width: 1, display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ width: '20%' }}>
                <Box>
                    {files?.map((file) => (
                        <FileComponent name={file.name}></FileComponent>
                    ))}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', alignSelf: 'center', width: 1 }}>
                <Typography sx={{ fontWeight: '600' }} color="#ACA9BB" fontSize={50}>
                    CSV UPLOADER
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100vh' }}>
                    <form onSubmit={fetchFileData}>
                        <TextField
                            id="outlined-basic"
                            label="Search CSV Fields"
                            variant="outlined"
                            value={textField}
                            sx={{ backgroundColor: '#ACA9BB', borderRadius: '10px', width: '100%' }}
                            onChange={updateTextFieldState}
                        />
                    </form>
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
            </Box>

            <Snackbar open={notificationOpen} autoHideDuration={6000} onClose={closeSnackBar}>
                <Alert severity={alertType}>{alertMessage}</Alert>
            </Snackbar>
        </Box>
    )
}

export default App
