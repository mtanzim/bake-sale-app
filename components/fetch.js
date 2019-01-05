const hostApi = "https://bakesaleforgood.com";

const fetchUrl = async url => {
  try {
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};

export const fetchInitialDeals = async () => {
  return fetchUrl(`${hostApi}/api/deals`);
};

export const fetchOneDeal = async id => {
  return fetchUrl(`${hostApi}/api/deals/${id}`);
};

export const fetchSearch = async searchTerm => {
  return fetchUrl(`${hostApi}/api/deals?searchTerm=${searchTerm}`);
};
