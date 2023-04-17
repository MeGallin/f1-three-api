const axios = require('axios');
const ErrorResponse = require('../utils/ErrorResponse');

// @description: Get and Save winner from API
// @route: GET /api/winners
// @access: Public
exports.winners_2023 = async (req, res, next) => {
  const round = req.params.id;
  //https://ergast.com/api/f1/2023/1/results
  //http://ergast.com/api/f1/current/last/results.json?callback

  async function fetchDataFromApi() {
    const response = await axios.get(
      `https://ergast.com/api/f1/2023/${round}/results.json?callback`,
    );
    return response.data;
  }

  try {
    const data = await fetchDataFromApi();
    if (!data) return next(new ErrorResponse('Server Error', 500));

    const season = data.MRData?.RaceTable?.season;
    const round = data.MRData?.RaceTable?.round;
    const results = data.MRData?.RaceTable?.Races[0]?.Results;

    const result = results.slice(0, 3)?.flatMap((result) => {
      return {
        season,
        round,
        number: result.number,
        position: result.position,
        driver: result.Driver.givenName + ' ' + result.Driver.familyName,
      };
    });
    //save relevant data to DB?
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.send(error.message);
  }
};
