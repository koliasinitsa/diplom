// UserItem.tsx

import React from 'react';
import { TableCell, TableRow, Checkbox, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { User } from '../../interfaces/user';

interface UserItemProps {
  user: User;
  selected: boolean;
  onSelectUser: (userId: number) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, selected, onSelectUser }) => {
  const { t } = useTranslation();

  const handleSelectUser = () => {
    onSelectUser(user.id);
  };

  return (
    <TableRow sx={selected ? { backgroundColor: '#e0e0e0' } : {}}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={handleSelectUser} />
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.status}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>
        <Link to={`/userProfile/${user.id}`}>
          <Button variant="outlined">{t('View')}</Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default UserItem;
