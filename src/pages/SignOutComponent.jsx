import { useState } from "react";
import { signOut } from "../lib/auth";

export default function SignOutComponent() {
    const [loggedout, setloggedout] = useState(false);
    const [user , setuser] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await signOut();

        if (error) {
            console.error(error.message);
        } else {
            console.log("logged out succesfully!!");
            setloggedout(true);
            const {data} = await supabase.auth.getUser();
            setuser(data.user);

        }
    };

    console.log("USER DATA : ", user);
    return (
        <div className="text-center flex flex-center container max-w-3xl justify-center">
            {loggedout ? (<p className="font-bold text-green-500">
                You are logged out.
            </p>) : (<button onClick={handleSubmit} className="btn bg-red-300 font-bold text-10">Singout</button>)}


        </div>
    );
}