import ThemeToggle from "./themeToggle";
import LoginButton from "./loginBottom";

interface HeaderProps {
    name: string;
}

const Header = ({ name }: HeaderProps) => {
    return (
        <header className="flex items-center justify-between p-5">
            <ThemeToggle />
            <h1 className="text-2xl font-bold">{name}</h1>
            <LoginButton />
        </header>
    );
};

export default Header;
