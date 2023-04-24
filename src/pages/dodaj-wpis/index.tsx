import { Form, Formik, Field, ErrorMessage } from "formik";
import dayjs from "dayjs";
import * as Yup from "yup";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "../../components/spinner";

const AddPostSchema = Yup.object().shape({
  startDate: Yup.date().required("Data rozpoczęcia jest wymagana"),
  endDate: Yup.date()
    .required("Data zakończenia jest wymagana")
    .min(
      Yup.ref("startDate"),
      "Data zakończenia musi być poźniejsza niż rozpoczęcia"
    ),
  category: Yup.string()
    .required("Kategoria jest wymagana")
    .not(["Kategoria"], "Kategoria jest wymagana"),
  content: Yup.string()
    .min(5, "Treść wpisu musi mieć min 5 znaków")
    .required("Treść wpisu jest wymagana"),
});

const AddPost = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { push } = useRouter();

  const { data: categories, isLoading } = api.posts.getCategories.useQuery();
  const { mutate, isLoading: isAdding } = api.posts.createPost.useMutation({
    onSuccess: () => {
      toast.success("Dodano wpis !");
      push("/");
    },
    onError: (e) => {
      let errorMessage = "Błąd przy dodawaniu wpisu";
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
      initialValues={{
        startDate: dayjs().format("YYYY-MM-DD"),
        endDate: dayjs().format("YYYY-MM-DD"),
        category: "",
        content: "",
      }}
      validationSchema={AddPostSchema}
      onSubmit={(values) => {
        mutate({
          ...values,
          endDate: new Date(values.endDate),
          startDate: new Date(values.startDate),
        });
      }}
    >
      <section className=" bg-gray-100 p-6 text-gray-900">
        <Form className="ng-untouched ng-pristine ng-valid container relative mx-auto flex flex-col items-center space-y-12">
          {(isLoading || isAdding) && <Spinner />}

          <fieldset className="grid  grid-cols-4 gap-6 rounded-md bg-gray-50 p-6 shadow-sm">
            <div className="col-span-full space-y-2">
              <p className="font-medium">Dodawanie wpisu</p>
              <p className="text-xs">Uzupełnij formularz aby dodać wpis !</p>
            </div>
            <div className="col-span-full grid grid-cols-6 gap-4 ">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="startDate" className="text-sm">
                  Data rozpoczęcia
                </label>
                <Field
                  id="startDate"
                  name="startDate"
                  type="date"
                  className="w-full rounded-lg border border-gray-300 p-2 text-gray-900 focus:ring focus:ring-violet-600 focus:ring-opacity-75"
                />
                <ErrorMessage
                  className="mt-2 text-sm text-red-500"
                  component="p"
                  name="startDate"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="endDate" className="text-sm">
                  Data zakończenia
                </label>
                <Field
                  id="endDate"
                  name="endDate"
                  type="date"
                  className="w-full rounded-lg border border-gray-300 p-2 text-gray-900 focus:ring focus:ring-violet-600 focus:ring-opacity-75"
                />
                <ErrorMessage
                  className="mt-2 text-sm text-red-500"
                  component="p"
                  name="endDate"
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Wybierz kategorie
                </label>
                <Field
                  as="select"
                  id="category"
                  name="category"
                  className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:ring focus:ring-violet-600 focus:ring-opacity-75 "
                >
                  <option>Kategoria</option>
                  {!!categories?.length &&
                    categories.map(({ id, name }) => (
                      <option key={id} value={name}>
                        {name}
                      </option>
                    ))}
                </Field>
                <ErrorMessage
                  className="mt-2 text-sm text-red-500"
                  component="p"
                  name="category"
                />
              </div>

              <div className="col-span-full">
                <label htmlFor="content" className="text-sm">
                  Treść wpisu
                </label>
                <Field
                  id="content"
                  name="content"
                  as="textarea"
                  placeholder=""
                  className="w-full resize-none rounded-lg border border-gray-300 p-2 text-gray-900 focus:ring focus:ring-violet-600 focus:ring-opacity-75"
                ></Field>
                <ErrorMessage
                  className="mt-2 text-sm text-red-500"
                  component="p"
                  name="content"
                />
              </div>
            </div>
            <button
              type="submit"
              className="col-start-1 max-w-xs rounded-md bg-violet-600 px-8 py-3 font-semibold text-gray-50"
            >
              Dodaj
            </button>
          </fieldset>
        </Form>
      </section>
    </Formik>
  );
};

export default AddPost;
