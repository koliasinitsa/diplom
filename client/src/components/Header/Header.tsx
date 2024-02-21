import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
// import jwt, { JwtPayload } from 'jsonwebtoken';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import SearchPanel from './Search-panel/SearchPanel';
import LanguageSelector from './LanguageSelector';



const Header: React.FC = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                setRole(decodedToken.role);
            } catch (error) {
                // Обработка ошибок при декодировании токена
                console.error('Error decoding token:', error);
            }
            setIsAuthenticated(true);
        }
    }, []);
    // Пустой массив зависимостей для запуска эффекта только один раз при монтировании


    const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
        setUserMenuOpen(true);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        setUserMenuOpen(false);
    };

    const handleLogoutClick = () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
        setRole(null);
        handleCloseUserMenu();
        navigate('/');
    };

    //onst isAuthenticated = false // есть пользователь или нет, заглушка
    const handleLoginClick = () => {
        navigate('/AuthForm'); 
    };

    

    return (
        <AppBar position="fixed" >
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', }}>
                    <Link to="/" style={{ marginRight: '100px' }}>
                        <HomeIcon />
                    </Link>
                    {/* Поисковая строка (слева) с ограниченной шириной */}
                    <div style={{ maxWidth: '300px' }}>
                        <SearchPanel />
                    </div>
                </div>


                {/* Иконка смены цвета и языковой выбор */}
                <div>
                    <IconButton
                        color="inherit"
                        aria-label="dark mode"
                    >
                        <DarkModeIcon />
                    </IconButton>

                    <IconButton
                        color="inherit"
                        aria-label="language"
                        aria-controls="language-menu"
                        aria-haspopup="true"
                    >
                        <LanguageSelector />
                    </IconButton>


                    {/* Проверка авторизации */}
                    {isAuthenticated ? (
                        <IconButton
                            color="inherit"
                            aria-label="account of current user"
                            aria-controls="user-menu"
                            aria-haspopup="true"
                            onClick={handleUserMenuClick}
                        >
                            <AccountCircleIcon />
                        </IconButton>
                    ) : (
                        <Button color="inherit" style={{ marginLeft: '10px' }} onClick={handleLoginClick}>
                            Login
                        </Button>
                    )}

                    <Menu
                        id="user-menu"
                        anchorEl={anchorElUser}
                        open={userMenuOpen}
                        onClose={handleCloseUserMenu}
                    >
                        <Link to="/UserProfile" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                        </Link>
                        {role === 'admin' && (
                            <Link to="/UsersTable" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <MenuItem>Users</MenuItem>
                            </Link>
                        )}
                        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
