// module.exports = {
//   reactStrictMode: true,
// }

module.exports = {
  // https://github.com/vercel/next.js/issues/21079
  // Remove the workaround the issue is fixed
  images: {
    loader: "imgix",
    path: "",
  },
};