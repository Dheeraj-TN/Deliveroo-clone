import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
const client = sanityClient({
  projectId: "mde6xxa5", // process.env.SANITY_PROJECTID,
  dataset: "production",
  //process.env.SANITY_DATASET || 'development',
  useCdn: true,
  //api verisonto be used for requests(default is 2019-07 - 12)
  apiVersion: "2021-10-21",
});
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
//run this to add exception policy at localhost:3000 CORS poilcy
//sanity cors add http://localhost:3000
export default client;
