import { useEffect, useState } from 'react';
import { getTokens } from '../utils/tokenUtils';
import { login } from '../api/authService';

export function useAuth() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { access_token } = getTokens();

        if (!access_token) {
          console.log('No hay token, iniciando sesión...');
          await login();
        }
      } catch (error) {
        console.error('Fallo en autenticación inicial:', error);
      } finally {
        console.log('Se utilizará el token guardado');
        setReady(true);
      }
    })();
  }, []);

  return ready;
}
