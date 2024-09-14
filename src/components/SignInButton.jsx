import { signInWithGoogle } from "../Auth";

const SignInButton = () => (
  <button
    onClick={signInWithGoogle}
    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
  >
    Sign in with Google
  </button>
);

export default SignInButton;
