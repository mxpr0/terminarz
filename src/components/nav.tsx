import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Nav = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { push } = useRouter();

  const session = useSession();
  const authenticated = session.status === "authenticated";
  return (
    <nav className="border-gray-200 bg-white">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/">
          <span className="self-center whitespace-nowrap text-2xl font-semibold">
            Terminarz
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium  md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0">
            {authenticated && (
              <>
                <li>
                  <Link href="/" aria-current="page">
                    <span className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white  md:bg-transparent md:p-0 md:text-blue-700">
                      Moje wpisy
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/dodaj-wpis">
                    <span className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700">
                      Dodaj wpis
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/kategorie">
                    <span className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700">
                      Kategorie
                    </span>
                  </Link>
                </li>
              </>
            )}

            <li>
              {authenticated ? (
                <button
                  onClick={() => {
                    toast("Wylogowano!", {});
                    setTimeout(() => {
                      void signOut({ redirect: false });
                      push("/logowanie");
                    }, 1500);
                  }}
                  className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  Wyloguj
                </button>
              ) : (
                <Link
                  href="/logowanie"
                  className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  Zaloguj
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
