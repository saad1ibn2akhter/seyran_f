import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import Field from "@/components/auth/Field";
import SelectField from "@/components/auth/SelectField";
import { signUp } from "@/lib/auth";
import { SCHOOLS, YEAR_GROUPS } from "@/constants/schoolOptions";

const INITIAL_FORM = {
    name: "",
    email: "",
    password: "",
    school: "",
    yearGroup: "",
};

export default function RegisterPage() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { error } = await signUp(form);

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        window.location.href = "/";
    };

    return (
        <AuthLayout
            stepLabel="01 / Create account"
            heading="Begin"
            headingTail="."
            subtitle="A few details and you're in."
            topRight={{
                prompt: "Have one?",
                linkText: "Sign in",
                href: "/login",
            }}
            rightFooter="→ New here"
        >
            <form onSubmit={handleSubmit} className="space-y-7">
                <Field
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

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

                <SelectField
                    label="School"
                    name="school"
                    value={form.school}
                    onChange={handleChange}
                    options={SCHOOLS}
                    required
                />

                <SelectField
                    label="Year Group"
                    name="yearGroup"
                    value={form.yearGroup}
                    onChange={handleChange}
                    options={YEAR_GROUPS}
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
                    {loading ? "Creating account…" : "Create account"}
                </button>
            </form>
        </AuthLayout>
    );
}