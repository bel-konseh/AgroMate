import LoginForm from "../components/Authentication/LoginForm"


const Login = () => {
  return (
    <main className="w-full lg:p-64 h-[100vh] flex flex-col items-center justify-center bg-[url('src/assets/images/login-bg.png')] bg-no-repeat backdrop-blur-lg bg-cover  relative mt-16 md:mt-20">
      <div className=" absolute  backdrop-blur-xs flex item-center justify-center md:p-16">
        <LoginForm />
      </div>
    </main>
  )
}

export default Login
