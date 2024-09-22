import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axiosInstance from '../services/axios.config';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setConfirmPassword] = useState<boolean>(false);

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
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

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setLoading(true);
    setSubmitting(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axiosInstance.post(
        'signup',
        {
          name: values.username,
          email: values.email,
          password: values.password,
        },
        config
      );

      toast.success('Registration successful!');
      navigate('/login');
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data.message || 'Registration failed');
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>Enter your details to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{ email: '', password: '', username: '', confirmPassword: '' }}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            {({ errors, handleSubmit, touched, values, handleChange, handleBlur, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.username && touched.username && (
                    <p className="text-red-600 text-sm">{errors.username}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-600 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"} Password
                  </Button>
                  {errors.password && touched.password && (
                    <p className="text-red-600 text-sm">{errors.password}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "Hide" : "Show"} Confirm Password
                  </Button>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? "Registering..." : "Register"}
                </Button>
              </form>
            )}
          </Formik>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Button variant="link" onClick={() => navigate('/login')}>
              Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
