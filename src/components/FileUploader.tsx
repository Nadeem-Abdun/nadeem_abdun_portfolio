import React, { useState, useRef } from "react";
import { IconButton } from "@mui/material";
import { FileUpload } from "@mui/icons-material";
import { useBreakpoints } from "../utils/Breakpoints";

interface FileUploaderProps {
    onFileSelect: (file: File) => void;
    existingFileUrl: string | undefined;
}

const FileUploader: React.FC<FileUploaderProps> = (props) => {
    const { onFileSelect, existingFileUrl } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(existingFileUrl !== undefined ? existingFileUrl : null);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            onFileSelect(file);
        }
    };

    const triggerFileUpload = () => {
        inputRef.current?.click();
    };

    return (
        <div>
            <input
                type="file"
                ref={inputRef}
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="fileInput"
            />
            {previewUrl ? (
                <div>
                    <img
                        src={previewUrl}
                        alt="Project Preview"
                        style={{
                            width: isXs ? '35vw' : isSm ? '25vw' : '15vw',
                            height: isXs ? '35vw' : isSm ? '25vw' : '15vw',
                            borderRadius: "10%",
                            cursor: "pointer"
                        }}
                        onClick={triggerFileUpload}
                    />
                </div>
            ) : (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: isXs ? '35vw' : isSm ? '25vw' : '15vw',
                    height: isXs ? '35vw' : isSm ? '25vw' : '15vw',
                    border: "4px dashed #888",
                    borderRadius: "10%"
                }}>
                    <label htmlFor="fileInput">
                        <IconButton size="large" color="primary" component="span">
                            <FileUpload fontSize="large" />
                        </IconButton>
                    </label>
                </div>
            )}
        </div>
    );
};

export default FileUploader;