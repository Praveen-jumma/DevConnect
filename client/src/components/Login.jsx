import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [toast, setToast] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                `${BASE_URL}/login`,
                { email, password },
                { withCredentials: true }
            );
            dispatch(addUser(res.data));
            setToast(true);
            setTimeout(() => setToast(false), 6000);
            navigate("/");
        } catch (err) {
            setError(err?.response?.data || "Login failed");
        }
    };

    const handleSignUp = async () => {
        try {
            const res = await axios.post(
                `${BASE_URL}/signup`,
                { firstName, lastName, email, password, skills },
                { withCredentials: true }
            );
            dispatch(addUser(res.data));
            navigate("/profile");
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    };

    const handleSkillKeyDown = (e) => {
        if (e.key === "Enter" && skillInput.trim()) {
            e.preventDefault();
            if (!skills.includes(skillInput.trim())) {
                setSkills([...skills, skillInput.trim()]);
            }
            setSkillInput("");
        } else if (e.key === "Backspace" && !skillInput && skills.length) {
            setSkills(skills.slice(0, -1));
        }
    };

    const removeSkill = (idx) => setSkills(skills.filter((_, i) => i !== idx));

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">
                        {isLoginForm ? "Login" : "Sign Up"}
                    </h2>

                    {!isLoginForm && (
                        <>
                            <label className="form-control w-full max-w-xs my-2">
                                <span className="label-text">First Name</span>
                                <input
                                    type="text"
                                    placeholder="enter firstName"
                                    value={firstName}
                                    className="input input-bordered w-full"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </label>

                            <label className="form-control w-full max-w-xs my-2">
                                <span className="label-text">Last Name</span>
                                <input
                                    type="text"
                                    placeholder="enter lastName"
                                    value={lastName}
                                    className="input input-bordered w-full"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </label>
                        </>
                    )}

                    <label className="form-control w-full max-w-xs my-2">
                        <span className="label-text">Email ID:</span>
                        <input
                            type="email"
                            placeholder="enter emailId"
                            value={email}
                            className="input input-bordered w-full"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label className="form-control w-full max-w-xs my-2">
                        <span className="label-text">Password</span>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="enter password"
                                value={password}
                                className="input input-bordered w-full pr-10"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 focus:outline-none"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </label>

                    {/* ✅ Skills tags input moved below Password */}
                    {!isLoginForm && (
                        <label className="form-control w-full max-w-xs my-2">
                            <span className="label-text">Skills</span>
                            <div className="flex flex-wrap gap-1 p-1 border rounded">
                                {skills.map((s, i) => (
                                    <span
                                        key={i}
                                        className="flex items-center bg-blue-100 px-2 py-1 rounded-full"
                                    >
                                        {s}
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(i)}
                                            className="ml-1 text-red-500 font-bold"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    value={skillInput}
                                    placeholder="Add skill and press Enter"
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={handleSkillKeyDown}
                                    className="input input-sm flex-1 min-w-[100px] border-none focus:outline-none"
                                />
                            </div>
                        </label>
                    )}

                    <p className="text-red-500">{error}</p>

                    {toast && (
                        <div className="toast toast-top toast-center">
                            <div className="alert alert-success">
                                <span>Profile Updated Successfully.</span>
                            </div>
                        </div>
                    )}

                    <div className="card-actions justify-center my-2">
                        <button
                            className="btn btn-primary"
                            onClick={isLoginForm ? handleLogin : handleSignUp}
                        >
                            {isLoginForm ? "Login" : "Sign Up"}
                        </button>
                    </div>

                    <p
                        className="m-auto cursor-pointer py-2 text-blue-500"
                        onClick={() => {
                            setIsLoginForm((v) => !v);
                            setShowPassword(false);
                        }}
                    >
                        {isLoginForm
                            ? "New User? Signup Here"
                            : "Existing User? Login Here"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
