import './Navbar.css';
import Dashboard from './Dashboard/Dashboard';
import Account from './Account/Account';
import { useState } from 'react';


const Navbar = () => {
    const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(true);

    return (
        <div className="Navbar">
            <Dashboard isDashboardOpen={isDashboardOpen} setIsDashboardOpen={() => { setIsDashboardOpen(!isDashboardOpen) }} />
            <Account isDashboardOpen={!isDashboardOpen} setIsDashboardOpen={() => { setIsDashboardOpen(!isDashboardOpen) }} />
        </div>
    )
}

export default Navbar