import Flight from '../modal/flight.js';
import catchAsync from '../untils/catchAsync.js';

const flightController = {
  list: catchAsync(async (req, res) => {
    try {
      const flight = await Flight.find({});

      return res.ok(flight, 'Fetch Flight  Successfully. ');
    } catch (err) {
      return res.error(err);
    }
  }),
};
export default flightController;
