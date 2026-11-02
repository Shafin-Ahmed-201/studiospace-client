"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, LoaderCircle } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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

const LoginPage = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        setLoading(true);
        const { error: signInError } = await signIn.email({
            email: formData.email,
            password: formData.password,
            rememberMe,
        });
         router.replace("/");
        router.refresh();
        setLoading(false);

        if (signInError) {
            setError(signInError.message ?? "Invalid email or password. Please try again.");
            return;
        }
    };

    const inputClasses = "h-11 rounded-md pl-9";

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted px-4 py-12">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-semibold tracking-tight">Welcome Back</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Resume your creation with StudioSpace
                </p>
            </div>

            <div className="w-full max-w-md rounded-xl bg-card p-8 shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <label htmlFor="password" className="text-sm font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="rememberMe"
                                checked={rememberMe}
                                onCheckedChange={(checked) => setRememberMe(checked === true)}
                            />
                            <Label
                                htmlFor="rememberMe"
                                className="text-sm font-normal text-muted-foreground"
                            >
                                Remember me
                            </Label>
                        </div>
                        <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-[#a4e213] hover:underline"
                        >
                            Forgot password?
                        </Link>
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
                                Signing In...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </Button>

                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-xs text-muted-foreground">Or continue with</span>
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
                    Don&apos;t have an account?{" "}
                    <Link href="/sign-up" className="font-medium text-sky-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
