import './App.css'
import LoginForm from "./components/LoginForm.tsx";
import ColorPicker from "./components/ColorPicker.tsx";
import {useReducer} from "react";
import UserType from "./types/UserType.ts";
import {AppContext} from "./components/AppContext.tsx";

const reducer = (oldUser: null | UserType, newUser: null | UserType) => {
    if(newUser == null || !newUser.name) {
        localStorage.removeItem('active_user_name');
        document.getElementById('root')!.style.backgroundColor = '#ffffff';
        return null;
    }

    if(oldUser != null) {
        if(oldUser.name != newUser.name) {
            throw new Error('Already logged in.');
        }

        if (newUser.color == oldUser.color && oldUser.name == newUser.name) {
            return oldUser;
        }
    }

    const users = loadUsers();

    const index = users.findIndex(e => {
        return e.name == newUser.name;
    });

    if(index === -1) {
        newUser.color = '#ffffff';
        users.push(newUser);
    }
    else if(newUser.color) {
       users[index].color = newUser.color;
    }
    else if(oldUser === null){
        newUser.color = users[index].color;
    }

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("active_user_name", newUser.name);
    console.log(document.getElementById('root'));
    document.getElementById('root')!.style.backgroundColor = newUser.color as string;
    return {...newUser};
}

const loadUsers = (): UserType[] => {
    const userStorage = window.localStorage.getItem("users");
    return  userStorage ? JSON.parse(userStorage) : [];
}

const readActiveUser = () => {
    const name = localStorage.getItem("active_user_name");

    if(!name) {
        return null;
    }

    const users = loadUsers();

    const user = users.find((user: UserType) => {
        return user.name == name;
    })

    if(user) {
        return user;
    }

    return null;
}

function App() {
    const [user, setUser] = useReducer(reducer, readActiveUser())
    return (
        <AppContext.Provider value={{user, setUser}}>
            <div id='App'>
                {user? <ColorPicker/> : <LoginForm/>}
            </div>
        </AppContext.Provider>
    )
}

export default App
