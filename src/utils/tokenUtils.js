export function saveTokens({ access_token, refresh_token }) {
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token);
}

export function getTokens() {
  return {
    access_token: localStorage.getItem('access_token'),
    refresh_token: localStorage.getItem('refresh_token')
  };
}
