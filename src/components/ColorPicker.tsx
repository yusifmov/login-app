import {Button, Input, Stack, Typography} from "@mui/material";
import {AppContext} from "./AppContext.tsx";
import {ChangeEvent, useContext} from "react";

const styles = {
    border: "2px solid #ccc",
    padding: "0px 4px",
    borderRadius: "4px",
}

const ColorPicker = () => {
    const context = useContext(AppContext);

    const colorPicked = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        context.setUser(context.user ? {...context.user, color: event.target.value} : null);
    }

    const logOut = () => {
      context.setUser(null);
    }

    return (<>
        <Stack gap={1}>
            <Typography>{context.user?.name}</Typography>
            <Input type={"color"} disableUnderline={true} style={styles} onChange={colorPicked} value={context.user?.color} />
            <Button variant={"contained"} onClick={logOut}>Logout</Button>
        </Stack>
    </>)
}

export default ColorPicker;