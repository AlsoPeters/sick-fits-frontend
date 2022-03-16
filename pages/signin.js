import RequestReset from '../components/RequestReset';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

export default function SignInPage() {
  return (
    <div className="flex justify-center mx-4 space-x-8 ">
      <SignIn />
      <SignUp />
      <RequestReset />
    </div>
  );
}
