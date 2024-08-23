import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../assets/logo.svg';
import registerImage from '../assets/Register.svg';
import InputField from '../components/UI/InputField';
import InputPasswordField from '../components/UI/InputPasswordField';
import { registerUser } from '../redux/features/authActions';
import { AppDispatch, RootState } from '../redux/store';

const Register = () => {
  const navigate = useNavigate();
  const { loading, success, userInfo } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    // password must contain at least 8, must contain numbers
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
      .max(30, 'Password must be at most 30 characters'),
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required')
      .max(30, 'Username must be at most 30 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setConfirmPassword] = useState<boolean>(false);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);

    try {
      await dispatch(
        registerUser({
          name: values.username,
          email: values.email,
          password: values.password,
        })
      ).unwrap();

      toast.success('Registration successful!');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (success) {
      console.log(userInfo);
      navigate('/login');
    }
  }, [success, navigate]);

  return (
    <div className='relative flex flex-col h-screen items-center'>
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
          initialValues={{ email: '', password: '', username: '', confirmPassword: '' }}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {({ errors, handleSubmit, touched, values, handleChange, handleBlur, isSubmitting }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 lg:gap-6 text-black">
              <InputField
                type="text"
                text="Username"
                name="username"
                value={values.username}
                handelBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter your username"
                error={errors.username && touched.username ? true : false}
              />
              {errors.username && touched.username && (
                <p className="text-red-500 lg:-mt-5 -mt-2 -mb-4">{errors.username}</p>
              )}
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
              <InputPasswordField
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                text="Confirm Password"
                placeholder="Confirm your password"
                handleBlur={handleBlur}
                showPassword={showConfirmPassword}
                setShowPassword={setConfirmPassword}
                error={errors.confirmPassword && touched.confirmPassword ? true : false}
                dataTestid="showConfirmPassword"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 lg:-mt-5 -mt-2 -mb-4">{errors.confirmPassword}</p>
              )}
              <button
                type="submit"
                className="hover:border rounded-2xl text-white lg:h-12 md:text-xl h-9  bg-gradient-to-bl from-[#101C49] to-[#000000] lg:text-xl text-base lg:mt-6 mt-4 w-full flex justify-center items-center"
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? (
                  <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"></span>
                ) : (
                  'Register'
                )}
              </button>
            </form>
          )}
        </Formik>
        <img
          src={registerImage}
          className="lg:w-5/12 w-3/5 mt-8 lg:mt-0 hidden lg:flex"
          alt="Register"
        />
      </div>
    </div>
  );
};

export default Register;
