import { useState } from "react";
// import { userServiceFactory } from "../clientServices/userService";
import useUser from "../lib/useUser";
import Loading from '@/components/loading'

// const userService = userServiceFactory();

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
        // mutateUser(await userService.login(username, password));
        setIsLoading(false);
      }, 2000)
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
          <div>
            {!user.isLoggedIn &&
              <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Mevep" />
                  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Ingrese con su cuenta
                  </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  {isLoading ? (
                    <Loading /> // Mostrar el componente de carga si isLoading es true
                  ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                          Nombre de usuario
                        </label>
                        <div className="mt-2">
                          <input
                            name="uname"
                            type="text"
                            onChange={usernameHandler}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Contraseña
                          </label>
                          <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                              Forgot password?
                            </a>
                          </div>
                        </div>
                        <div className="mt-2">
                          <input
                            name="psw"
                            type="password"
                            onChange={passwordHandler}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            }
          </div>}
      </div>
    </main>
  )
}
