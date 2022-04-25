const asyncHandler = require("express-async-handler");
const axios = require("axios");

const headers = {
  "X-RapidAPI-Host": "v1-sneakers.p.rapidapi.com",
  "X-RapidAPI-Key": process.env.API_KEY,
};

// @desc Get sneakers
// @route POST /api/sneakers/
// @access Public

const getSneakers = asyncHandler(async (req, res) => {
  const gender = req.query.gender;

  const options = {
    params: { limit: 50, gender },
    headers,
  };

  // Check data for missing images
  const checkData = (data) => {
    for (let x in data) {
      if (data.hasOwnProperty(x)) {
        if (x === "media") {
          if (Object.values(data[x])[0] === null) {
            return true;
          }
        }
      }
    }
  };

  // Remove objects without images
  const removeEmptyData = (data) => {
    return data.filter((item) => !checkData(item));
  };

  try {
    // Make api call to get data for sneakers
    const { data: response } = await axios.get(
      "https://v1-sneakers.p.rapidapi.com/v1/sneakers",
      options
    );

    const sneakers = removeEmptyData(response.results);

    res.status(200).json(sneakers);
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});

// @desc Get sneaker by item id
// @route POST /api/sneakers/:id
// @access Public

const getSneakerById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const {
      data: { results: sneaker },
    } = await axios.get(
      `https://v1-sneakers.p.rapidapi.com/v1/sneakers/${id}`,
      { headers }
    );

    res.status(200).json(sneaker[0]);
  } catch (error) {
    throw new Error(error);
  }
});

// @desc Get sneaker brands
// @route POST /api/sneakers/brands
// @access Public

const getBrands = asyncHandler(async (req, res) => {
  try {
    const {
      data: { results: brands },
    } = await axios.get("https://v1-sneakers.p.rapidapi.com/v1/brands", {
      headers,
    });

    res.status(200).json(brands);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = { getSneakers, getBrands, getSneakerById };
