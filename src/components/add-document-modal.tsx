import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";

interface AddDocumentModalProps {
    open: boolean;
    onClose: () => void;
}

const AddDocumentModal = ({ open, onClose }: AddDocumentModalProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <Typography variant="body1" fontWeight={600}>Add Document</Typography>
        </Dialog>
    )
}

export default AddDocumentModal