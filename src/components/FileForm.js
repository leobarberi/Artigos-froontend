import React, { useState, useEffect } from 'react';

const FileForm = ({ file, onSave }) => {
    const [nomeArquivo, setNomeArquivo] = useState('');
    const [arquivo, setArquivo] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (file) {
            setNomeArquivo(file.nomeArquivo);
            setArquivo(file.arquivo);
        }
    }, [file]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedFile) {
            onSave({ id: file?.id, nomeArquivo: selectedFile.nomeArquivo, file: selectedFile });
        } else {
            onSave({ id: file?.id, nomeArquivo, arquivo });
        }
        setNomeArquivo('');
        setArquivo('');
        setSelectedFile(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>File</label>
                <input type="file" onChange={handleFileChange} />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default FileForm;