import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../assets/logo.svg';
import loginImage from '../assets/Login.svg';
import InputField from '../components/UI/InputField';
import InputPasswordField from '../components/UI/InputPasswordField';
import { loginUser } from '../redux/features/authActions';
import { AppDispatch, RootState } from '../redux/store';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
      .max(30, 'Password must be at most 30 characters'),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    try {
      await dispatch(loginUser(values)).unwrap();
      toast.success('Login successful!');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (success) {
      navigate('/dashboard');
    }
  }, [success, navigate]);

  return (
    <div className="relative flex flex-col h-screen items-center">
      <img
        src={logo}
        alt="logo"
        className="absolute top-0 left-0 mx-12 mt-10 lg:w-1/12 w-1/4"
        data-testid="logo"
        onClick={() => {
          navigate('/');
        }}
      />
      <div className="flex flex-col lg:flex-row justify-around items-center h-full w-full lg:pt-14 pt-8 px-10 lg:mx-12 mx-5">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {({
            errors,
            handleSubmit,
            touched,
            values,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 lg:gap-6 text-black"
            >
              <InputField
                type="text"
                text="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                handelBlur={handleBlur}
                placeholder="Enter your email"
                error={errors.email && touched.email ? true : false}
              />
              {errors.email && touched.email && (
                <p className="text-red-500 lg:-mt-5 -mt-2 -mb-4">{errors.email}</p>
              )}

              <InputPasswordField
                name="password"
                text="Password"
                value={values.password}
                onChange={handleChange}
                placeholder="Enter your password"
                handleBlur={handleBlur}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                error={errors.password && touched.password ? true : false}
                dataTestid="showPassword"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 lg:-mt-5 -mt-2 -mb-4">{errors.password}</p>
              )}

              <button
                type="submit"
                className="hover:border rounded-2xl text-white lg:h-12 md:text-xl h-9 bg-gradient-to-bl from-[#101C49] to-[#000000] lg:text-xl text-base lg:mt-6 mt-4 w-full flex justify-center items-center"
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? (
                  <span className="loader"></span>
                ) : (
                  'Login'
                )}
              </button>
            </form>
          )}
        </Formik>

        <img
          src={loginImage}
          className="lg:w-5/12 w-3/5 mt-8 lg:mt-0 hidden lg:flex"
          alt="Login"
        />
      </div>
    </div>
  );
};

export default Login;
