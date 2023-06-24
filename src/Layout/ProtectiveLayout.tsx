import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SideDrawer from '../components/SideDrawer';
import { useAuthDataMutation } from "../Features/auth/authDataSlice.ts";
import { getCookie } from "../helper/cookiee.js";
import { AuthResponse } from '../Interface/index.ts';
import { useAppDispatch, useAppSelector } from '../app/store.ts';
import { setAuth } from '../app/reducer/authReducer.ts';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading.tsx';

interface Props {

}

let ProtectiveLayout: FC<Props> = ({ }) => {

    const [authData] = useAuthDataMutation();
    const dispatch = useAppDispatch();
    const { token,loading } = useAppSelector((state) => state.Token);

    useEffect(() => {
        const getData = async () => {
            try {
                const res: AuthResponse = await authData({ token: getCookie('token') }).unwrap();
                if (!res.message) {
                    dispatch(setAuth(res));
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (getCookie('token')) {
            getData();
        }
    }, [getCookie('token')]);

    if(loading){
        return <Loading open={loading}/>
    }

    return (
        <>
            {
                token ? <><SideDrawer />
                    <Outlet /></> :
                    <Navigate to={'/log-in'}/>
            }
        </>
    )
}
export default ProtectiveLayout;