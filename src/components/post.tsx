import type { Post as PostType } from "@prisma/client";
import dayjs from "dayjs";

interface Props extends PostType {
  categoryName: string;
}

const Post = ({
  categoryName,
  content,
  createdAt,
  endDate,
  id,
  startDate,
}: Props) => {
  return (
    <div className=" rounded-lg bg-gray-50  px-10 py-6 text-gray-800 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Dodano: {dayjs(createdAt).format("DD/MM/YYYY")}
        </span>
        <div>
          <button className="mx-2 rounded bg-red-600 px-4 py-1 font-bold text-gray-50">
            Usuń
          </button>
          <button className="mx-2 rounded bg-blue-600 px-4 py-1 font-bold text-gray-50">
            Edytuj
          </button>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold ">{categoryName}</p>
        <p className="mt-2">{content}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="mr-4 text-violet-600">
          Data rozpoczęcia: {dayjs(startDate).format("DD/MM/YYYY")}
        </p>
        <p className=" text-violet-600">
          Data zakończenia: {dayjs(endDate).format("DD/MM/YYYY")}
        </p>
      </div>
    </div>
  );
};

export default Post;
