import { register, deleteAccountByUsername } from '../APICalls/usersAPICalls';
import useRecipeStore from '../stores/recipeStore';

export const addMockUser = async () => {
  const success = await deleteAccountByUsername('mock');
  if (success) await register('mock', 'mock', 'mock@mock.mock');
  useRecipeStore.getState().message = '';
};
