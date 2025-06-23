import axios from 'axios';
import { getTokens, saveTokens } from '../utils/tokenUtils';

// * Utilizar variables de entorno para las credenciales
const USER = process.env.REACT_APP_AUTH_USER
const PASS = process.env.REACT_APP_AUTH_PASS

export const login = async () => {
  if (!USER || !PASS) {
    throw new Error('Faltan credenciales en las variables de entorno');
  }

  const credentials = btoa(`${USER}:${PASS}`);
  return await axios.get('https://qa-ms-oauth.vallartaplus.mx/OAuthVP/generate/token', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
  }).then(res => {
    const { access_token, refresh_token } = res.data.content.data;
    // * Gardamos los tokens en localStorage para su uso posterior y evitar múltiples inicios de sesión
    saveTokens({ access_token, refresh_token });
    console.log('Tokens obtenidos correctamente');
    return access_token;
  });
};

/**Función para refrescar el token de acceso utilizando el refresh_token
 - Esta función se llamará automáticamente cuando el token de acceso expire
 - utilizando un interceptor de Axios
*/
export async function refreshToken() {
  const { refresh_token } = getTokens();
  if (!refresh_token || refresh_token === 'undefined') {

    console.warn('No hay refresh_token guardado. Haciendo login completo...');
    await login();

    return;
  }

  try {
    // * El token del documento estaba mal, por lo que se cambió por las credenciales de usuario
    const credentials = btoa(`${USER}:${PASS}`);
    const res = await axios.put(
      'https://qa-ms-oauth.vallartaplus.mx/OAuthVP/refresh/token',
      { token: refresh_token },
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const { access_token, refresh_token: newRefresh } = res.data.content.data;
    saveTokens({ access_token, refresh_token: newRefresh });
    console.log('Token renovado automáticamente');
    return access_token;
  } catch (error) {
    console.error('Error al renovar token:', error);
    throw error;
  }
}

//Función de prueba para verificar el manejo de un token no autorizado
// - Primero Modifica el token desde el localStorage para simular un token no autorizado
// export const testUnauthorizedToken = async () => {
//   try {
//     const res = await api.get(
//       'https://qa-ms-additionals.vallartaplus.mx/additionals/frequent_traveler_info',
//       {
//         params: { device: 'mobile' },
//       }
//     );
//     console.log('✅ Respuesta:', res.data);
//   } catch (err) {
//     console.error('❌ Error:', err.response?.data || err.message);
//   }
// };
