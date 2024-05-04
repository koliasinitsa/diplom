import React, { useEffect, useState, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Checkbox } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Header from '../Header/Header';
import { User } from '../../interfaces/user';
import { getAllUsers, deleteUser, blockUser, unblockUser, addAdmin, removeAdmin } from '../../services/UserServices';
// import { Link } from 'react-router-dom';
import SuccessAlert from '../Alert/SuccessAlert';
// import ErrorAlert from '../Alert/ErrorAlert';
import UserItem from './UserItem';
import Spinner from '../Spinner/Spinner';

const UsersTable: React.FC = () => {
  const { t } = useTranslation();
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Загрузка данных пользователей при монтировании компонента
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers: User[] = await getAllUsers();
        setUsers(fetchedUsers);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    // Вызов функции при монтировании компонента
    fetchUsers();
  }, []);

  // Функция для выбора всех пользователей
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Получаем массив идентификаторов всех пользователей
      const allUserIds = users.map((user) => user.id);
      // Устанавливаем выбранных пользователей
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers([]);
    }
  };
// Мемоизированная функция для выбора пользователей
  const handleSelectUser = useCallback(
    (userId: number) => {
      setSelectedUsers(prevSelected =>
        prevSelected.includes(userId) ? prevSelected.filter(id => id !== userId) : [...prevSelected, userId]
      );
    },
    [setSelectedUsers]
  );
// Функция для выполнения действий над пользователями
  const handleAction = async (action: Function, successMessage: string, errorMessage: string) => {
    try {
      // Вызов функции которую передали с кнопки
      await action(selectedUsers);
      setAlertMessage(successMessage);
      updateUsers();
    } catch (error) {
      setAlertMessage(errorMessage);
      console.error(errorMessage, error);
    }
  };

  const updateUsers = async () => {
    const updatedUsers = await getAllUsers();
    setUsers(updatedUsers);
  };

  if (loading) {
    return <Spinner/>   
  }
  
  return (
    
    <div>
      <Header />
      <div className='container'>
        <div style={{ marginTop: '100px' }}>
          <Button variant="contained" color="primary" sx={{ marginRight: '10px' }} onClick={() => handleAction(addAdmin, 'User added to admin', 'Error adding users to admin')}>
            {t('addToAdmin')}
          </Button>
          
          {alertMessage && <SuccessAlert message={alertMessage}  />}
          <Button variant="contained" color="error" sx={{ marginRight: '10px' }} onClick={() => handleAction(removeAdmin, 'User removed from admin', 'Error removing users from admin')}>
            {t('deleteFromAdmin')}
          </Button>
          <Button variant="contained" color="warning" sx={{ marginRight: '10px' }} onClick={() => handleAction(blockUser, 'User blocked', 'Error blocking users')}>
            {t('Blocked')}
          </Button>
          <Button variant="contained" color="primary" sx={{ marginRight: '10px' }} onClick={() => handleAction(unblockUser, 'User unblocked', 'Error unblocking users')}>
            {t('UnBlocked')}
          </Button>
          <Button variant="contained" color="error" onClick={() => handleAction(deleteUser, 'User deleted', 'Error deleting users')}>
            {t('Deleted')}
          </Button>
        </div>
        <Table style={{ marginTop: '50px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length}
                  checked={selectedUsers.length === users.length}
                  onChange={(e) => handleSelectAll(e)}
                />
              </TableCell>
              <TableCell>{t('Email')}</TableCell>
              <TableCell>{t('Status')}</TableCell>
              <TableCell>{t('Role')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                selected={selectedUsers.includes(user.id)}
                onSelectUser={handleSelectUser}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersTable;
