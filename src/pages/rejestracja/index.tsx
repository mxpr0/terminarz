import Link from "next/link";
import { Form, Formik, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import { useRouter } from "next/navigation";

import { signIn, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import Spinner from "../../components/spinner";

export const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Nazwa użytkownika musi posiadać minimum 4 znaki")
    .max(30, "Nazwa użytkownika może posiadać maksymalnie 30 znaków")
    .required("Nazwa użytkownika jest wymagana"),
  password: Yup.string()
    .min(3, "Hasło musi posiadać minimum 3 znaki")
    .max(40, "Hasło może posiadać maksymalnie 40 znaków")
    .required("Hasło jest wymagane"),
  retypedPassword: Yup.string()
    .min(3, "Hasło musi posiadać minimum 3 znaki")
    .max(40, "Hasło może posiadać maksymalnie 40 znaków")
    .required("Powtórzone hasło jest wymagane")
    .oneOf([Yup.ref("password")], "Hasła muszą być takie same"),
});

const RegisterPage = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { push } = useRouter();

  const { mutate, isLoading } = api.users.register.useMutation({
    onSuccess: () => {
      toast.success("Zarejestrowano !");
      push("/logowanie");
    },
    onError: (e) => {
      let errorMessage = "Błąd przy rejestracji";
      if (e?.message) {
        errorMessage = e.message;
      } else {
        const errorMessages = e.data?.zodError?.fieldErrors.content;
        if (errorMessages && errorMessages[0]) {
          errorMessage = errorMessages[0];
        }
      }
      toast.error(errorMessage);
    },
  });
  return (
    <Formik
      initialValues={{ username: "", password: "", retypedPassword: "" }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => {
        mutate({ password: values.password, username: values.username });
      }}
    >
      <div className="relative mx-auto mt-20 flex max-w-md flex-col rounded-md bg-gray-50 p-6 text-gray-800 sm:p-10">
        {isLoading && <Spinner />}

        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Zarejestruj się</h1>
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
                placeholder="mojlogin"
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
            <div>
              <div className="mb-2 flex justify-between">
                <label htmlFor="repeatedPassword" className="text-sm">
                  Potwierdź Hasło
                </label>
              </div>
              <Field
                type="password"
                name="retypedPassword"
                id="retypedPassword"
                placeholder="*****"
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800"
              />
              <ErrorMessage
                className="mt-2 text-sm text-red-500"
                component="p"
                name="retypedPassword"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-violet-600 px-8 py-3 font-semibold text-gray-50"
              >
                Zarejestruj
              </button>
            </div>
            <p className="px-6 text-center text-sm text-gray-600">
              Masz już konto?
              <Link href="/logowanie">
                <span className=" pl-1 text-violet-600 hover:underline">
                  Zaloguj się
                </span>
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </Formik>
  );
};
export default RegisterPage;
