import './NavbarBox.css';

type NavbarBoxType = {
    data: {
        title: string,
        description: string
    }[]
}

type NavbarBoxItemType = {
    title: string,
    description: string
}

const NavbarBoxItem: React.FC<NavbarBoxItemType> = ({ title, description }: NavbarBoxItemType) => {
    return (
        <div className="NavbarBox-Item">
            <p>{title}</p>
            <span>{description}</span>
        </div>
    );
};

const NavbarBox: React.FC<NavbarBoxType> = ({ data }: NavbarBoxType) => {
    return (
        <div className="NavbarBox">
            {data && Array.isArray(data) && data.length > 0 ? (
                data.map((item, index) => (
                    <NavbarBoxItem key={index} title={item.title} description={item.description} />
                ))
            ) : (
                <h4>No tags</h4>
            )}
        </div>
    );
};

export default NavbarBox;
