import { register, deleteAccountByUsername } from '../APICalls/usersAPICalls';
import useUserStore from '../stores/userStore';

export const addMockUser = async () => {
  await deleteAccountByUsername('mock');
  await register('mock', 'mock', 'mock@mock.mock');
  useUserStore.getState().loginMessage = '';
};
