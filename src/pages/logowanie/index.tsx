import Link from "next/link";
import { Form, Formik, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import { useRouter } from "next/navigation";

import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useState } from "react";
import Spinner from "../../components/spinner";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Nazwa użytkownika musi posiadać minimum 4 znaki")
    .max(30, "Nazwa użytkownika może posiadać maksymalnie 30 znaków")
    .required("Nazwa użytkownika jest wymagana"),
  password: Yup.string()
    .min(3, "Hasło musi posiadać minimum 3 znaki")
    .max(40, "Hasło może posiadać maksymalnie 40 znaków")
    .required("Hasło jest wymagane"),
});

const LoginPage = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={async (values) => {
        setIsLoading(true);
        const res = await signIn("credentials", {
          ...values,
          redirect: false,
        });
        setIsLoading(false);
        if (res?.ok) {
          toast.success("Zalogowano!");
          push("/");
        } else {
          toast.error("Błędne dane logowania!", { icon: "" });
        }
      }}
    >
      <div className="relative mx-auto mt-20 flex max-w-md flex-col rounded-md bg-gray-50 p-6 text-gray-800 sm:p-10">
        {isLoading && <Spinner />}

        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Zaloguj się</h1>
        </div>
        <Form className="ng-untouched ng-pristine ng-valid  space-y-12">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="mb-2 block text-sm">
                Login
              </label>
              <Field
                name="username"
                id="username"
                placeholder="twojlogin"
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800"
              />
              <ErrorMessage
                className="mt-2 text-sm text-red-500"
                component="p"
                name="username"
              />
            </div>
            <div>
              <div className="mb-2 flex justify-between">
                <label htmlFor="password" className="text-sm">
                  Hasło
                </label>
              </div>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800"
              />
              <ErrorMessage
                className="mt-2 text-sm text-red-500"
                component="p"
                name="password"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-violet-600 px-8 py-3 font-semibold text-gray-50"
              >
                Zaloguj
              </button>
            </div>
            <p className="px-6 text-center text-sm text-gray-600">
              Nie masz konta?
              <Link href="/rejestracja">
                <span className=" pl-1 text-violet-600 hover:underline">
                  Zarejestruj sie
                </span>
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </Formik>
  );
};
export default LoginPage;
