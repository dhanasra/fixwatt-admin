
import { Snackbar, SnackbarContent } from "@mui/material";

const Toaster =({open, close, message})=>{

    return (
        <Snackbar
            open={open}
            autoHideDuration={1500}
            bodyStyle={{ maxWidth: '100%', height: 'auto' }}
            onClose={close}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}
            message={message}
        >
            <SnackbarContent
                sx={{
                    backgroundColor: "green",
                    fontSize: '15px'
                }}
                message={message}
            />
        </Snackbar>
    )
}

export default Toaster;