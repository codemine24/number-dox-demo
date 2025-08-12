"use client";

import { AddDocumentModal } from "@/components/document-form-modal";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Document
      </Button>
      <AddDocumentModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={(value) => console.log(value)}
        documentId={1}
      />
    </Box>
  );
}
