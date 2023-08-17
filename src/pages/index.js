import { client } from "../client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { INLINES } from "@contentful/rich-text-types";
import Link from "next/link";

/**
 * this is used to convert a tag into link tag.In this you need to use INLINES.HYPERLINK which converts all the a tag into a link tags.For more information you can refer to https://www.contentful.com/developers/docs/tutorials/general/getting-started-with-rich-text-field-type/
 */
const options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <Link className="block" href={node.data.uri}>
          {children}
        </Link>
      );
    },
  },
};

/**
 * @returns a navigation tab with link tag
 */
export default function Home({ data }) {
  return (
    <>
      <div className="w-full mx-auto max-w-7xl">
        <div className="flex gap-3 flex-col justify-center w-full">
          {data.items[0].fields.navigationTabs.map((item, index) => (
            <div className="flex m-3 w-full" key={index}>
              {item.fields.tabCols &&
                item.fields.tabCols.map((col, index) => (
                  <div className="flex flex-col m-5" key={index}>
                    {documentToReactComponents(col.fields.col, options)}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/**
 * this is used to get the get of the navigation tab from the server
 */
export const getServerSideProps = async () => {
  const data = await client.getEntries({
    content_type: "mainNavigation",
    include: 5,
  });

  return {
    props: {
      data,
    },
  };
};
