import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import SideDrawer from '../components/SideDrawer';

interface Props {

}

let ProtectiveLayout: FC<Props> = ({ }) => {
    return (
        <>
            <SideDrawer />
            <Outlet />
        </>
    )
}
export default ProtectiveLayout;