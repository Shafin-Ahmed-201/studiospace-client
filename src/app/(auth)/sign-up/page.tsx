"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, LoaderCircle, Image as ImageIcon } from "lucide-react";
import { signIn, signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function GoogleIcon() {
    return (
        <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="#4285F4"
                d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
            />
            <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z"
            />
            <path
                fill="#FBBC05"
                d="M5.27 14.29A7.2 7.2 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.29a11.86 11.86 0 0 0 0 10.76l3.98-3.09z"
            />
            <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
            />
        </svg>
    );
}

const SignUpPage = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        imageurl:"",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        const { error: signUpError } = await signUp.email({
            name: formData.name,
            email: formData.email,
            image: formData.imageurl,
            password: formData.password,
        });
        setLoading(false);

        if (signUpError) {
            setError(signUpError.message ?? "Something went wrong. Please try again.");
            return;
        }

        router.push("/");
        router.refresh();
    };

    const inputClasses = "h-11 rounded-md pl-9";

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted px-4 py-12">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-semibold tracking-tight">Create Account</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Create your content with StudioSpace
                </p>
            </div>

            <div className="w-full max-w-md rounded-xl bg-card p-8 shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label htmlFor="name" className="text-sm font-medium">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={inputClasses}
                            />
                        </div>
                    </div>
                        <div className="space-y-1.5">
                        <label htmlFor="imageurl" className="text-sm font-medium">
                            ImageUrl
                        </label>
                        <div className="relative">
                            <ImageIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="imageurl"
                                name="imageurl"
                                type="text"
                                placeholder="Enter your imageurl"
                                required
                                value={formData.imageurl}
                                onChange={handleChange}
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="password" className="text-sm font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Create a password"
                                required
                                minLength={8}
                                value={formData.password}
                                onChange={handleChange}
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="confirmPassword" className="text-sm font-medium">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                required
                                minLength={8}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-destructive" role="alert">
                            {error}
                        </p>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="h-11 w-full rounded-md bg-[#C5F45B] text-sm font-medium text-black hover:bg-white hover:border-[#C5F45B]"
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="animate-spin" data-icon="inline-start" />
                                Creating Account...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </Button>

                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-xs text-muted-foreground">Or sign up with</span>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        disabled={googleLoading}
                        onClick={async () => {
                            setGoogleLoading(true);
                            await signIn.social({
                                provider: "google",
                                callbackURL: "/",
                            });
                            setGoogleLoading(false);
                        }}
                        className="h-11 w-full rounded-md border-border text-sm font-medium"
                    >
                        {googleLoading ? (
                            <>
                                <LoaderCircle className="animate-spin" data-icon="inline-start" />
                                Redirecting...
                            </>
                        ) : (
                            <>
                                <GoogleIcon data-icon="inline-start" />
                                Sign Up With Google
                            </>
                        )}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/sign-in"
                        className="font-medium text-sky-600 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
