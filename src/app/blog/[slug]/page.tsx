import { RichText } from "basehub/react-rich-text";
import { CodeBlock } from "basehub/react-code-block";
// import CoverImage from "@/app/components/cover-image";
// import Avatar from "@/app/components/avatar";
// import Date from "@/app/components/date";
import { BodyImage } from "@/components/basehub/body-image";
import {
  PostMetaFragment,
  type PostFragmentType,
  PostFragment,
} from "../../(core)/blog/post";
import { basehub } from "basehub";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Pump } from "basehub/react-pump";
import Link from "next/link";
import { Post } from "@/components/basehub/post";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const data = await basehub().query({
    blog: { posts: { items: { _slug: true } } },
  });

  return data.blog.posts.items.map((post) => ({ slug: post._slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const postData = await basehub().query({
    blog: {
      posts: {
        __args: { first: 1, filter: { _sys_slug: { eq: slug } } },
        items: PostMetaFragment,
      },
    },
  });
  const [post] = postData.blog.posts.items;
  if (!post) notFound();

  return {
    title: `Post / ${post._title}`,
    description: post.excerpt,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return (
    <Pump
      queries={[
        {
          blog: {
            morePosts: true,
            posts: {
              __args: { first: 1, filter: { _sys_slug: { eq: slug } } },
              items: PostFragment,
            },
          },
        },
        {
          blog: {
            posts: {
              __args: {
                filter: { _sys_slug: { notEq: slug } },
                first: 8,
                orderBy: "date__DESC",
              },
              items: PostMetaFragment,
            },
          },
        },
      ]}
    >
      {async ([postData, morePostsData]) => {
        "use server";

        const [post] = postData.blog.posts.items;
        if (!post) notFound();

        return (
          <main className="py-10">
            <section className="mx-auto px-5 pb-5">
              <div className="max-w-2xl w-full mx-auto font-mono flex gap-x-2 pb-16 text-md items-center justify-start">
                <Link href="/blog" className="hover:underline">
                  {"<"} Blog
                </Link>
                <div className="flex justify-self-end ml-auto gap-x-2">
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                  <span className="select-none">|</span>
                  <Link href="/stats" className="hover:underline">
                    Stats
                  </Link>
                </div>
              </div>
              <Post {...post} />
              {/* <hr className="mt-28 mb-24" /> */}
              {/* <MoreStories
                morePosts={morePostsData.blog.posts.items}
                title={postData.blog.morePosts}
              /> */}
            </section>
            <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/20 w-2xl max-w-[calc(100vw-2.5rem)] mx-auto text-sm p-8 text-card-foreground font-mono font-bold flex flex-col gap-y-2">
              <span className="text-muted-foreground pb-2">
                // END_OF_ARTICLE.md
              </span>
              <span>- Thanks for reading!</span>
              <span>
                - If you enjoyed, feel free to follow me on{" "}
                <Link
                  href={"/links"}
                  className="underline decoration-dotted underline-offset-2"
                >
                  the Internet
                </Link>
                .
              </span>
              <span>
                - You can read more posts{" "}
                <Link
                  href={"/blog"}
                  className="underline decoration-dotted underline-offset-2"
                >
                  here
                </Link>{" "}
                or explore the{" "}
                <Link
                  href={"/"}
                  className="underline decoration-dotted underline-offset-2"
                >
                  rest of the site
                </Link>
                .
              </span>
              <span className="pt-2">Cheers! 🍻</span>
            </div>
          </main>
        );
      }}
    </Pump>
  );
}
