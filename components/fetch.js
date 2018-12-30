const hostApi = "https://bakesaleforgood.com";

export const fetchInitialDeals = async function() {
  try {
    let response = await fetch(`${hostApi}/api/deals`);
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};
