import { useState } from "react";
 import { userServiceFactory } from "../clientServices/userService";
import useUser from "../lib/useUser";
import Loading from '@/components/loading'

 const userService = userServiceFactory();

export default function Login() {
  const { user, mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      setIsLoading(true);
      setTimeout(async () => {
         mutateUser(await userService.login(username, password));
        setIsLoading(false);
      }, 5000)
    } catch (error) {
      setIsLoading(false);
      alert(error.response.data.error);
    }
  };

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  }

  return (
    <main>
      <div>
        {!user ?
          (<Loading />)
          :
          <section className="bg-gray-50 dark:bg-gray-900">
            {!user.isLoggedIn &&
              <div className="flex flex-col gap items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                {isLoading ? (
                  <Loading /> // Mostrar el componente de carga si isLoading es true
                ) : (
                  <div>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img className="mx-auto h-10 w-auto"
                              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                              alt="Mevep" />
                          </div>
                          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                          </h1>
                          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                              <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de usuario</label>
                              <input
                                name="uname"
                                type="text"
                                onChange={usernameHandler}
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="VeterinariaMevep" />
                            </div>
                            <div>
                              <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                              <input
                                name="psw"
                                type="password"
                                onChange={passwordHandler}
                                required
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            <div>
                              <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Sign in
                              </button>
                              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                              </p>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            }
          </section>}
      </div>
    </main >
  )
}
