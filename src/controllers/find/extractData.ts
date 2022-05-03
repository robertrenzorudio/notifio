const extractData = (data: any) => {
  data = data[0];
  data = {
    searchResult: data['searchResult'],
    paginationOutPut: data['paginationOutput'],
    itemSearchURL: data['itemSearchURL'],
  };
  return data;
};

export default extractData;
