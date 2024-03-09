import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';
import { EMAIL_REGEX, PWD_REGEX } from "../scripts/Validation";
import { Tooltip } from "../components/Tooltip";

const REGISTER_URL = '/api/auth/signup';

function Register() {
    const naviguate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validMail, setvalidMail] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [agree, setAgree] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleCheckboxChange = (event) => {
        setAgree(event.target.checked);
    };

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setvalidMail(EMAIL_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd & PWD_REGEX.test(matchPwd));
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ email: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment  
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setUser('');
            setPwd('');
            setMatchPwd('');
            navigate('/login');
        } catch (err) {
            if (!err?.response || err.response?.status === 500) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <a href="/" className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src={import.meta.env.VITE_LOGO_URL} alt="logo" />
                    CMRent
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create account
                        </h1>
                        <p ref={errRef} className={errMsg ? "block text-white w-full font-bold rounded-lg border-2 sm:text-sm text-md px-5 py-2 text-center bg-red-300 border-red-400 dark:border-red-800" : "hidden"} aria-live="assertive">{errMsg}</p>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="flex items-center mb-2">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white mr-1">Your Email</span>
                                    <span className={`text-lg ${validMail ? "text-green-600" : "text-red-600"}`}>•</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    ref={userRef}
                                    name="email"
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                    placeholder="name@gmail.com"
                                    aria-invalid={validMail ? "false" : "true"}
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="flex items-center mb-2">
                                    <Tooltip
                                        position="top-right"
                                        content={
                                            <ul>The password must contain at least:
                                                <li>• one capital letter</li>
                                                <li>• one lower-case letter</li>
                                                <li>• one digit</li>
                                                <li>• one special charachter !@#$%</li>
                                            </ul>}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            className="h-5 w-5 cursor-pointer text-gray-900 dark:text-white mr-1"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                            />
                                        </svg>
                                    </Tooltip>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white mr-1">Password</span>
                                    <span className={`text-lg ${validPwd ? "text-green-600" : "text-red-600"}`}>•</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    placeholder="••••••••"
                                    aria-invalid={validPwd ? "false" : "true"}
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="flex items-center mb-2">
                                    <Tooltip position="top-right" content="must match with the password">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            className="h-5 w-5 cursor-pointer text-gray-900 dark:text-white mr-1"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                            />
                                        </svg>
                                    </Tooltip>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white mr-1">Confirm Password</span>
                                    <span className={`text-lg ${validMatch ? "text-green-600" : "text-red-600"}`}>•</span>
                                </label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    name="confirm-password"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    required
                                    placeholder="••••••••"
                                    aria-invalid={validMatch ? "false" : "true"}
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        required
                                        checked={agree}
                                        onChange={handleCheckboxChange}
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                </div>
                                <div></div>
                            </div>
                            <button type="submit" disabled={!validMail || !validPwd || !validMatch || !agree ? true : false} className="text-white w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-800 dark:bg-blue-600 disabled:bg-blue-300 dark:disabled:bg-blue-300">Create account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register