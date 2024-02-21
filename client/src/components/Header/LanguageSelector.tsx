// src/components/LanguageSelector.tsx
import React, { useState } from 'react';
import { changeLanguage } from '../../services/i18n';
import { IconButton, Menu, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSelector: React.FC = () => {
    const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);
    const languageMenuOpen = Boolean(anchorElLang);
  
    const handleClickLanguageMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElLang(event.currentTarget);
    };
  
    const handleCloseLanguageMenu = () => {
      setAnchorElLang(null);
    };
  
    const handleLanguageChange = (language: string) => {
      changeLanguage(language);
      handleCloseLanguageMenu();
    };
  
    return (
      <div>
      {/* Используем IconButton с иконкой */}
      <IconButton
        color="inherit"
        aria-label="language"
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleClickLanguageMenu}
      >
        <LanguageIcon />
      </IconButton>

      <Menu
        id="language-menu"
        anchorEl={anchorElLang}
        open={languageMenuOpen}
        onClose={handleCloseLanguageMenu}
      >
        <MenuItem onClick={() => handleLanguageChange('en')}>Eng</MenuItem>
        <MenuItem onClick={() => handleLanguageChange('ru')}>Rus</MenuItem>
      </Menu>
    </div>
    );
  };
  
  export default LanguageSelector;
