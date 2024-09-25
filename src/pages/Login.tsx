import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/redux/features/authActions";
import { AppDispatch, RootState } from "@/redux/store";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

export const description = "A simple login form with email and password. The submit button says 'Sign in'.";

export default function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, success } = useSelector((state: RootState) => state.auth);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .max(30, 'Password must be at most 30 characters')
            .required('Password is required'),
    });

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        setSubmitting(true);

        try {
            await dispatch(
                loginUser({
                    email: values.email,
                    password: values.password,
                })
            ).unwrap();

            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (error: any) {
            toast.error('Login failed');
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
        <div className="flex h-full w-full items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
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
                            <form onSubmit={handleSubmit} className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="m@example.com"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    {errors.email && touched.email && (
                                        <span className="text-red-600">{errors.email}</span>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Your password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    {errors.password && touched.password && (
                                        <span className="text-red-600">{errors.password}</span>
                                    )}
                                    <Button
                                        type="button"
                                        variant="link"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Hide" : "Show"} Password
                                    </Button>
                                </div>
                                <Button type="submit" className="w-full" disabled={isSubmitting || loading}>
                                    {isSubmitting || loading ? 'Signing in...' : 'Sign in'}
                                </Button>
                            </form>
                        )}
                    </Formik>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Button variant="link" onClick={() => navigate('/register')}>
                            Sign up
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
