import { signInWithGoogle } from "../Auth";

const SignInButton = () => (
  <button
    onClick={signInWithGoogle}
    className="px-6 py-3 bg-blue-600 text-white text-lg rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
  >
    Sign in with Google
  </button>
);

export default SignInButton;
