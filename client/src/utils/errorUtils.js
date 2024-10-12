//External modules
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showError = (message) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    closeButton: false,
  });
};

export { showError };
