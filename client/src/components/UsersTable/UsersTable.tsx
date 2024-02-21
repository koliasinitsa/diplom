import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next';

import Header from '../Header/Header';
import { User } from '../../interfaces/user';
import { getAllUsers, deleteUser, blockUser, unblockUser, addAdmin, removeAdmin } from '../../services/UserServices';


const UsersTable: React.FC = () => {
  const { t } = useTranslation();
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers: User[] = await getAllUsers();  
        const users: User[] = fetchedUsers.map((users) => ({
          id: users.id,
          username: users.username,
          email: users.email,
          status: users.status,
          role: users.role,
        }));
        setUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Обработка ошибок загрузки пользователей
      }
    };
  
    fetchUsers();
  }, []);
  // Пустой массив зависимостей, чтобы эффект выполнялся только при монтировании компонента

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allUserIds = users.map((user) => user.id);
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleAddToAdmin = async () => {
    try {
      // Вызываем функцию из userService для добавления выделенных пользователей в админы
      await addAdmin(selectedUsers);
      // После успешного выполнения запроса можно, например, обновить список пользователей
      const updatedUsers = await getAllUsers();
      // Обновляем состояние компонента с новыми данными
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error adding users to admin:', error);
    }
  };

  const handleDeleteFromAdmin = async () => {
    try {
      await removeAdmin(selectedUsers);
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error removing users from admin:', error);
    }
  };

  const handleBlock = async () => {
    try {
      await blockUser(selectedUsers);
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error blocking users:', error);
    }
  };

  const handleUnblock = async () => {
    try {
      await unblockUser(selectedUsers);
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error unblocking users:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUsers);
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  };

  return (
    <div >
      <Header />
      <div style={{ marginTop: '100px' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: '10px' }}
          onClick={handleAddToAdmin}
        >
          {t('addToAdmin')}
        </Button>

        <Button
          variant="contained"
          color="error"
          sx={{ marginRight: '10px' }}
          onClick={handleDeleteFromAdmin}
        >
          {t('deleteFromAdmin')}
        </Button>

        <Button
          variant="contained"
          color="warning"
          sx={{ marginRight: '10px' }}
          onClick={handleBlock}
        >
          {t('Blocked')}
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: '10px' }}
          onClick={handleUnblock}
        >
          {t('UnBlocked')}
        </Button>

        <Button
          variant="contained"
          color="error"
          sx={{ marginRight: '10px' }}
          onClick={handleDelete}
        >
          {t('Deleted')}
        </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length}
                checked={selectedUsers.length === users.length}
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell>{t('Name')}</TableCell>
            <TableCell>{t('Email')}</TableCell>
            <TableCell>{t('Status')}</TableCell>
            <TableCell>{t('Role')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={selectedUsers.includes(user.id) ? { backgroundColor: '#e0e0e0' } : {}}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelectUser(user.id)}
                />
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UsersTable;