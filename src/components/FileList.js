import React, { useState, useEffect } from 'react';
import fileService from '../services/fileService';
import FileForm from './FileForm';

const FileList = () => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await fileService.getAllFiles();
            setFiles(response.data);
        } catch (error) {
            console.error('There was an error fetching the files!', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fileService.deleteFile(id);
            fetchFiles();
        } catch (error) {
            console.error('There was an error deleting the file!', error);
        }
    };

    const handleSave = async (file) => {
        try {
            if (file.file) {
                await fileService.createFile(file);
            } else if (file.id) {
                await fileService.updateFile(file.id, file);
            }
            setSelectedFile(null);
            window.location.reload();
        } catch (error) {
            console.error('There was an error saving the file!', error);
        }
    };

    const handleDownload = async (id, nomeArquivo) => {
        try {
            const response = await fileService.downloadFile(nomeArquivo);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', nomeArquivo);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('There was an error downloading the file!', error);
        }
    };

    return (
        <div>
            <h2>Files</h2>
            <FileForm file={selectedFile} onSave={handleSave} />
            <ul>
                {files.map(file => (
                    <li key={file.id}>
                        {file.nomeArquivo}
                        <button onClick={() => handleDelete(file.nomeArquivo)}>Delete</button>
                        <button onClick={() => handleDownload(file.id, file.nomeArquivo)}>Download</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;