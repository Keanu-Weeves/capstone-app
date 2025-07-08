import Logo from '../Images/Logo.svg'

function Nav() {
    return (
        <header>
            <nav>
                <img src={Logo} alt='Logo'></img>
                <ul>
                    <li><a href='/home'>Home</a></li>
                    <li><a href='/about'>About</a></li>
                    <li><a href='/menu'>Menu/Order Online</a></li>
                    <li><a href='/reservations'>Reservations</a></li>
                    <li><a href='/login'>Login</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Nav;