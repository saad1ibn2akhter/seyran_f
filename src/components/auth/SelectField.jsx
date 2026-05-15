import { fontMono } from "@/lib/fonts";

export default function SelectField({
    label,
    name,
    value,
    onChange,
    options,
    required = false,
}) {
    return (
        <div>
            <label
                htmlFor={name}
                style={fontMono}
                className="text-[10px] uppercase text-stone-400"
            >
                {label}
            </label>

            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full border-b border-stone-300 py-2 bg-transparent outline-none focus:border-stone-900"
            >
                <option value="">Select {label}</option>
                {options.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </div>
    );
}