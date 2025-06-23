import api from '../api/apiClient'; 
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import MembershipLanding from './MembershipLanding';

export default function Dashboard() {
  const ready = useAuth();
  const [info, setInfo] = useState(null);

  const fetchTravelerInfo = async (setInfo) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.warn('No hay access_token en localStorage');
      return;
    }

    try {
      const res = await api.get(
        'https://qa-ms-additionals.vallartaplus.mx/additionals/frequent_traveler_info',
        {
          params: { device: 'mobile' },
        }
      );
      console.log('✅ Respuesta:', res);
      
      setInfo(res.data.content.data.info);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!ready) return;

    const fetchData = async () => {
      await fetchTravelerInfo(setInfo);
    };

    fetchData();
  }, [ready]);

  if (!ready)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Cargando autenticación…</p>
      </div>
    )

  if (!info)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Cargando datos…</p>
      </div>
    )

  return <MembershipLanding info={info} />
}