import axiosEndpoint from "@/lib/axiosEndpoint";

export const getList = async (endpoint:string) => {
  const popular = await axiosEndpoint.get(endpoint, {
    params: {
      language: "en-US",
      page: 1,
    },
  });
  return popular.data;
};
