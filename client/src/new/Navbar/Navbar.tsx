import './Navbar.css';
import Dashboard from './Dashboard/Dashboard';
import { useState } from 'react';


const Navbar = () => {
    const [isDashboardOpen, setIsDashboardOpen] = useState(true)
    return (
        <div className="Navbar">
            <Dashboard isDashboardOpen={isDashboardOpen} />
        </div>
    )
}

export default Navbar