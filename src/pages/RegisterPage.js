import RegisterForm from '../components/RegisterForm';
import myAxios from '../config/axios';

function RegisterPage() {
  const handleSubmit = (data) => {
    console.log(data);
    myAxios({
      method: 'post',
      url: '/register',
      data,
    });
  };

  return (
    <RegisterForm onSubmit={handleSubmit} />
  );
}

export default RegisterPage;
