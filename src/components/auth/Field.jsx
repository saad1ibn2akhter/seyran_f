import { fontMono } from "@/lib/fonts";

export default function Field({
    label,
    name,
    type = "text",
    value,
    onChange,
    onFocus,
    onBlur,
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

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                required={required}
                className="w-full border-b border-stone-300 py-2 focus:border-stone-900 outline-none bg-transparent"
            />
        </div>
    );
}