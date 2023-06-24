import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SideDrawer from '../components/SideDrawer';
import { useAuthDataMutation } from "../Features/auth/authDataSlice.ts";
import { getCookie } from "../helper/cookiee.js";
import { AuthResponse } from '../Interface/index.ts';
import { useAppDispatch } from '../app/store.ts';
import { setAuth } from '../app/reducer/authReducer.ts';

interface Props {

}

let ProtectiveLayout: FC<Props> = ({ }) => {

    const [authData, { isLoading }] = useAuthDataMutation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getData = async () => {
            try {
                const res:AuthResponse = await authData({token:getCookie('token')}).unwrap();
                if(!res.message){
                    dispatch(setAuth(res));
                }
            } catch (e) {
                console.log(e);
            }
        }
        if(getCookie('token')){
            getData();
        }
    }, [getCookie('token')]);

    return (
        <>
            <SideDrawer />
            <Outlet />
        </>
    )
}
export default ProtectiveLayout;