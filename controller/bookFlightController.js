import BookFlight from '../modal/book-flight.js';
import fs from 'fs';
import csv from 'csv-parser';

import catchAsync from '../untils/catchAsync.js';
import moment from 'moment';
function getRandomPastTwoMonthsDate() {
  const end = new Date(); // Current date (today)
  const start = new Date(end.getFullYear(), end.getMonth() - 2, 1); // Start date (2 months ago)

  // Get a random time between start and end dates
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());

  // Create a new Date object with the random time
  const randomDate = new Date(randomTime);

  // Convert the date to ISO 8601 format
  const isoString = randomDate.toISOString();

  return isoString;
}
function getRandomFutureTwoMonthsDate() {
  const start = new Date(); // Current date (today)
  const end = new Date(
    start.getFullYear(),
    start.getMonth() + 2,
    start.getDate()
  ); // 2 months from now

  // Get a random time between start and end dates
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());

  // Create a new Date object with the random time
  const randomDate = new Date(randomTime);

  // Convert the date to ISO 8601 format
  const isoString = randomDate.toISOString();

  return isoString;
}
function getRandomFutureFiveHoursDate() {
  const start = new Date(); // Current date (today)
  const end = new Date(start.getTime() + 5 * 60 * 60 * 1000); // 5 hours from now

  // Get a random time between start and end dates
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());

  // Create a new Date object with the random time
  const randomDate = new Date(randomTime);

  // Convert the date to ISO 8601 format
  const isoString = randomDate.toISOString();

  return isoString;
}

const bookFlightController = {
  add: catchAsync(async (req, res) => {
    const body = req.body;
    try {
      const bookFlightDetails = await BookFlight.create({
        ...body,
        createAt: new Date(),
        status: 'Confirmed',
        PNRNumber: Array.from({ length: 6 }, () =>
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(
            Math.floor(Math.random() * 36)
          )
        ).join(''),
      });

      return res.ok(bookFlightDetails, 'Flight Book Successfully. ');
    } catch (err) {
      return res.error(err);
    }
  }),
  list: catchAsync(async (req, res) => {
    const body = req.body;
    try {
      const bookFlightDetails = await BookFlight.find({}).populate({
        path: 'flightId',
      });
      return res.ok(bookFlightDetails, 'Fetch Flight Book Successfully. ');
    } catch (err) {
      return res.error(err);
    }
  }),
  single: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;
      const flightNo = req.query;

      if (!id) {
        return res.badRequest(null, 'Enter your PNR number to get started!');
      }
      let passengerDetails = await BookFlight.findOne({
        PNRNumber: id,
      }).populate({
        path: 'flightId',
      });
      if (!passengerDetails) {
        return res.badRequest(
          null,
          'PNR not found. Please check and try again.'
        );
      }
      if (flightNo?.flightId) {
        passengerDetails = await BookFlight.findOne({
          PNRNumber: id,
          flightId: flightNo?.flightId,
        }).populate({
          path: 'flightId',
        });
        if (!passengerDetails) {
          return res.badRequest(null, 'Please enter a valid PNR number.');
        }
        if (passengerDetails) {
          console.log('passengerDetails.status', passengerDetails.status);
          if (passengerDetails.status === 'Cancelled') {
            return res.badRequest(null, 'PNR number is cancelled.');
          }
          if (moment(passengerDetails.departureDate).isBefore()) {
            return res.badRequest(null, 'Expired PNR number.');
          }
          if (
            moment(passengerDetails.departureDate).diff(moment(new Date()) > 6)
          ) {
            return res.badRequest(
              null,
              'Patience, please. Too early to proceed.'
            );
          }
        }
      }
      return res.ok(passengerDetails, 'Book Flight Fetch Successfully');
    } catch (err) {
      return res.error(err);
    }
  }),
  update: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const bookFlightDetails = await BookFlight.updateOne(
        { PNRNumber: id },
        {
          ...body,
          update: new Date(),
        }
      );

      return res.ok(bookFlightDetails, 'Flight Book Successfully. ');
    } catch (err) {
      return res.error(err);
    }
  }),
  clearData: catchAsync(async (req, res) => {
    const { id } = req.params;
    try {
      const bookFlightDetails = await BookFlight.deleteMany({});
      return res.ok(bookFlightDetails, 'Delete All Flight Book Successfully. ');
    } catch (err) {
      return res.error(err);
    }
  }),
  importData: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;
      const csvFilePath = './customer-list.csv';

      // Read the CSV file
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', async (row) => {
          if (row?.firstName === 'Muayyad' || row?.firstName === 'Omar') {
            await BookFlight.create({
              ...row,
              departureDate: getRandomPastTwoMonthsDate(),
              DOB: moment(row?.DOB, 'DD-MM-YYYY').toISOString(),
              passportExpiry: moment(
                row?.passportExpires,
                'DD-MM-YYYY'
              ).toISOString(),
              status: 'Confirmed',
            });
          } else {
            if (row?.firstName === 'Yusuf') {
              await BookFlight.create({
                ...row,
                departureDate: getRandomFutureFiveHoursDate(),
                DOB: moment(row?.DOB, 'DD-MM-YYYY').toISOString(),
                passportExpiry: moment(
                  row?.passportExpires,
                  'DD-MM-YYYY'
                ).toISOString(),
                status: 'Confirmed',
              });
            }
            await BookFlight.create({
              ...row,
              departureDate: getRandomFutureTwoMonthsDate(),
              DOB: moment(row?.DOB, 'DD-MM-YYYY').toISOString(),
              passportExpiry: moment(
                row?.passportExpires,
                'DD-MM-YYYY'
              ).toISOString(),
              status: 'Confirmed',
            });
          }
        })
        .on('end', () => {
          // CSV data is now stored in csvData array
        });

      return res.ok({}, 'Delete All Flight Book Successfully. ');
    } catch (err) {
      return res.error(err);
    }
  }),
  findTag: catchAsync(async (req, res) => {
    try {
      const { id } = req.params;
      console.log('id', id);
      const data = await BookFlight.findOne({ baggageTag: id });
      return res.ok(data, 'Book Flight  Successfully. ');
    } catch (err) {
      return res.error(err);
    }
  }),
};
export default bookFlightController;
