"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import Image from "next/image";

interface FileItem {
  id: string;
  name: string;
  size: number;
}

interface AddDocumentModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { document_id: string | number; file_name: string }) => void;
  documentId: string | number;
}

export default function AddDocumentModal({
  open,
  onClose,
  onSave,
  documentId,
}: AddDocumentModalProps) {
  const [documentTitle, setDocumentTitle] = useState("");
  const [documents, setDocuments] = useState<FileItem[]>([
    { id: "1", name: "Field.pdf", size: 1024000 },
  ]);
  const [notes, setNotes] = useState<FileItem[]>([
    { id: "2", name: "Field.pdf", size: 1024000 },
    { id: "3", name: "Field.pdf", size: 1024000 },
  ]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, type: "document" | "note") => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    files.forEach((file) => {
      const newFile: FileItem = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: file.size,
      };

      if (type === "document") {
        setDocuments((prev) => [...prev, newFile]);
      } else {
        setNotes((prev) => [...prev, newFile]);
      }
    });
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "document" | "note"
  ) => {
    const files = Array.from(e.target.files || []);

    files.forEach((file) => {
      const newFile: FileItem = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: file.size,
      };

      if (type === "document") {
        setDocuments([newFile]);
      } else {
        setNotes((prev) => [...prev, newFile]);
      }
    });
  };

  const handleDeleteFile = (id: string, type: "document" | "note") => {
    if (type === "document") {
      setDocuments((prev) => prev.filter((file) => file.id !== id));
    } else {
      setNotes((prev) => prev.filter((file) => file.id !== id));
    }
  };

  const handleSave = () => {
    console.log({ documentTitle, documents, notes });
    onSave({
      document_id: documentId,
      file_name: documents[0].name,
    });
    onClose();
  };

  const formatFileSize = (bytes: number) => {
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  const UploadArea = ({
    type,
    onDrop,
    onFileSelect,
    multiple = false,
  }: {
    type: "document" | "note";
    onDrop: (e: React.DragEvent) => void;
    onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    multiple?: boolean;
  }) => (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        textAlign: "center",
        border: "2px dashed #ccc",
        backgroundColor: "#f7f9fb",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
      onDragOver={handleDragOver}
      onDrop={onDrop}
      onClick={() => document.getElementById(`file-input-${type}`)?.click()}
    >
      <Image
        src="/upload.svg"
        alt="Upload"
        width={30}
        height={30}
        style={{ margin: "0 auto" }}
      />
      <Typography variant="subtitle2">
        <Typography
          component="span"
          sx={{ color: "primary.main", cursor: "pointer" }}
        >
          Click to Upload
        </Typography>{" "}
        or drag and drop
      </Typography>
      <Typography variant="caption">(Max File size: 25 MB)</Typography>
      <input
        id={`file-input-${type}`}
        type="file"
        multiple={multiple}
        style={{ display: "none" }}
        onChange={onFileSelect}
      />
    </Paper>
  );

  const FileList = ({
    files,
    type,
    title,
  }: {
    files: FileItem[];
    type: "document" | "note";
    title: string;
  }) =>
    files.length > 0 && (
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: "4px" }}>
          {title}
        </Typography>
        <Stack direction="column" gap={1}>
          {files.map((file, index) => (
            <Stack
              key={index}
              direction="row"
              justifyContent="space-between"
              gap={1}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  width: "95%",
                  backgroundColor: "#f7f9fb",
                  py: 1.5,
                  px: 2,
                  borderRadius: 2,
                }}
              >
                <Stack direction="row" alignItems="center" gap={2}>
                  <Image src="/file-2.svg" alt="File" width={24} height={24} />
                  <Typography>{file.name}</Typography>
                </Stack>
                <Typography variant="caption">
                  {formatFileSize(file.size)}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="end"
                sx={{ width: "5%" }}
              >
                <Image
                  src="/delete.svg"
                  alt="File"
                  width={24}
                  height={24}
                  onClick={() => handleDeleteFile(file.id, type)}
                />
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Box>
    );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          backgroundColor: "#fff",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "18px",
          fontWeight: 500,
        }}
      >
        Add Document
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            border: "1px solid",
            borderColor: grey[500],
            width: 24,
            height: 24,
          }}
        >
          <CloseIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent className="custom-scrollbar" sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: "4px" }}>
              Title of Document
            </Typography>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Title of note"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: "4px" }}>
              Upload
            </Typography>
            <UploadArea
              type="document"
              onDrop={(e) => handleDrop(e, "document")}
              onFileSelect={(e) => handleFileSelect(e, "document")}
            />
            <FileList files={documents} type="document" title="File added" />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Add Note
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: "4px" }}>
              Upload Note
            </Typography>
            <UploadArea
              type="note"
              onDrop={(e) => handleDrop(e, "note")}
              onFileSelect={(e) => handleFileSelect(e, "note")}
              multiple
            />
            <FileList files={notes} type="note" title="Note added" />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          pt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Button
          size="small"
          onClick={onClose}
          variant="outlined"
          color="inherit"
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          size="small"
          onClick={handleSave}
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
