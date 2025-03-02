import {Button, Stack, TextField} from "@mui/material";
import {ChangeEvent, useContext, useState} from "react";
import {AppContext} from "./AppContext.tsx";

const LoginForm = () => {
    const context = useContext(AppContext);
    const [name, setName] = useState("");

    const login = () => {
        context.setUser({name});
    }

    const changeName = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(event.target.value);
    }

    return (<>
        <Stack gap={1}>
            <TextField variant={"outlined"} placeholder={"Enter your name"} onChange={changeName} value={name}></TextField>
            <Button variant={"contained"} onClick={login}>Login</Button>
        </Stack>
    </>);
}

export default LoginForm;