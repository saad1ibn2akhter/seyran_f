import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import Field from "@/components/auth/Field";
import { signIn } from "@/lib/auth";

const INITIAL_FORM = {
    email: "",
    password: "",
};

export default function LoginPage() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [u,setu] = useState(null);


    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { error } = await signIn(form);

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        // window.location.href = "/";
        setu(supabase.auth.getUser().user);
        console.log("USER DATA : ", u);

    };
    console.log("USER DATA : ", u);

    return (
        <AuthLayout
            stepLabel="01 / Sign in"
            heading="Welcome"
            headingTail=" back."
            subtitle="Enter your details to continue."
            topRight={{
                prompt: "No account?",
                linkText: "Register",
                href: "/register",
            }}
            rightFooter="→ Returning"
        >
            <form onSubmit={handleSubmit} className="space-y-7">
                <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <Field
                    label="Password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                {error && (
                    <p className="text-sm text-red-600">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-stone-900 text-white py-4 disabled:opacity-50"
                >
                    {loading ? "Signing in…" : "Sign in"}
                </button>
            </form>
        </AuthLayout>
    );
}