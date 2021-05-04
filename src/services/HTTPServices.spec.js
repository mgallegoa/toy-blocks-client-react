import { getBlocksFromUrl } from "./HTTPServices";

jest.mock("cross-fetch");

describe("Test the HTTP Services", () => {
  let baseUrl;
  beforeEach(() => {
    baseUrl = "http://mgallegoa.github.io";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should concatenate the correct url for the blocks", () => {
    const mockJsonPromise = Promise.resolve({ data: ["data"] });
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    getBlocksFromUrl(baseUrl);

    expect(fetch).toHaveBeenCalledTimes(0);
    /*TODO: integrate jest-fetch-mock to test the service.
      expect(fetch).toHaveBeenCalledWith(
      "http://mgallegoa.github.io/api/v1/blocks"
    );
    expect(dataMock).toEqual({ data: ["data"] });*/
  });
});
