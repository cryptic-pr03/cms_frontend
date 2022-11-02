import { useEffect } from 'react';

function NotFoundPage() {
  useEffect(() => {
    document.title = 'Not Found | CMS';
  });
  return (
    <div style={{
      marginTop: '18%',
      fontFamily: 'Caladea, fantasy',
      fontSize: 'xxx-large',
      textAlign: 'center',
    }}
    >
      Sorry! The requested page does not exist
    </div>
  );
}

export default NotFoundPage;
