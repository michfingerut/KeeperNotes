import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showError = (message) => {
  return toast.error(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
  });
};

export { showError };
