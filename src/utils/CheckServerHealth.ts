import { GetHealthCheck } from '../services/ServiceControllers';

const checkServerHealth = async (): Promise<boolean> => {
  try {
    const response = await GetHealthCheck();
    const isResponseValid = response?.statusCode === 200;
    const isServerUp = response?.data?.server === 'up';
    const isDatabaseUp = response?.data?.database === 'connected';

    return isResponseValid && isServerUp && isDatabaseUp;
  } catch (error) {
    console.error('Error checking server health:', error);
    return false;
  }
};

export default checkServerHealth;
