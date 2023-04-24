import { ErrorMessage, Field, Form, Formik } from "formik";
import { api } from "~/utils/api";
import * as Yup from "yup";
import { toast } from "react-toastify";

const AddCategorySchema = Yup.object().shape({
  category: Yup.string()
    .min(3, "Nazwa kategoria musi mieć minimum 3 znaki ")
    .required("Nazwa kategorii jest wymagana"),
});

const AddCategory = () => {
  const { data: categories, isLoading } = api.posts.getCategories.useQuery();
  const ctx = api.useContext();
  const { mutate, isLoading: isAdding } = api.posts.createCategory.useMutation({
    onSuccess: async () => {
      await ctx.posts.getCategories.invalidate();
      toast.success("Dodano kategorie !");
    },
    onError: (e) => {
      let errorMessage = "Błąd przy dodawaniu kategorii";
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
    <div className="container mx-auto mt-5 flex justify-center">
      {!!categories?.length && (
        <div className="mx-10">
          <h2 className="my-2 font-bold">Dostępne kategorie: </h2>
          <div className="w-48 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900">
            {categories.map((category) => (
              <p
                key={category.id}
                className="block w-full  border-b border-gray-200 px-4 py-2 hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700"
              >
                {category.name}
              </p>
            ))}
          </div>
        </div>
      )}
      <div className="mx-10">
        <h2 className="my-2 font-bold">Dodaj kategorie: </h2>
        <Formik
          initialValues={{ category: "" }}
          validationSchema={AddCategorySchema}
          onSubmit={(values, helpers) => {
            mutate({ name: values.category });
            helpers.resetForm();
          }}
        >
          <Form>
            <div>
              <Field
                name="category"
                id="category"
                placeholder="Nazwa kategorii"
                className="w-full resize-none rounded-lg border border-gray-300 p-2 text-gray-900 focus:ring focus:ring-violet-600 focus:ring-opacity-75"
              />
              <ErrorMessage
                className="my-2 text-sm text-red-500"
                component="p"
                name="category"
              />
            </div>

            <button
              type="submit"
              className="my-2 rounded-md bg-violet-600 px-8 py-2 font-semibold text-gray-50"
            >
              Dodaj
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddCategory;
