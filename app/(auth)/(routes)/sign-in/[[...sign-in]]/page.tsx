import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold mb-4">Sign In with test account</h1>
        <p className="text-gray-500 mb-4">test@test.com | test</p>
      </div>
      <SignIn appearance={{
        elements: {
          footer: {
            display: 'none',
          },
        },
      }} />
    </div>
  );
};

export default SignInPage;