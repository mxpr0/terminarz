import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import Post from "../components/post";

const Home: NextPage = () => {
  const session = useSession();
  const isAuth = session.status === "authenticated";
  const { data: posts, isLoading } = api.posts.getPostsByUsername.useQuery({
    username: session.data?.user.username || "",
  });
  console.log(posts);
  return (
    <>
      <Head>
        <title>Terminarz</title>
        <meta name="description" content="Terminarz internetowy" />
      </Head>
      {isAuth ? (
        <>
          {!!posts?.length && (
            <div className="container  mx-auto mt-5 flex max-w-6xl flex-wrap justify-center gap-6">
              {posts.map((post) => (
                <Post
                  key={post.id}
                  categoryName={post.category.name}
                  {...post}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <Link href="/logowanie">Zaloguj aby zobaczyć wpisy</Link>
      )}
    </>
  );
};

export default Home;
