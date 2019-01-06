const hostApi = "https://bakesaleforgood.com";

// see source:
// https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
export const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

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
