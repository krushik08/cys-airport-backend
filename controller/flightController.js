import Flight from '../modal/flight.js';
import catchAsync from '../untils/catchAsync.js';
import mongoose from 'mongoose';

const flight = [
  {
    flightNo: 'NE 989',
    departureTime: '12:45',
    arrivalTime: '13:50',
    takenTime: '1H 5Minutes',
    name: 'NovaGlide',
    imgPath: 'Air6',
    price: 786,
    __v: 0,
  },
  {
    flightNo: 'AR 720',
    departureTime: '14:45',
    arrivalTime: '16:40',
    takenTime: '2H 0Minutes',
    name: 'AeroZephyr',
    imgPath: 'Air1',
    price: 650,
    __v: 0,
  },
  {
    flightNo: 'AN 340',
    departureTime: '12:45',
    arrivalTime: '14:10',
    takenTime: '1H 15Minutes',
    name: 'AviaNex',
    imgPath: 'Air2',
    price: 780,
    __v: 0,
  },
  {
    flightNo: 'AN 340',
    departureTime: '12:45',
    arrivalTime: '14:10',
    takenTime: '1H 15Minutes',
    name: 'SkyZenith',
    imgPath: 'Air3',
    price: 580,
    __v: 0,
  },
  {
    flightNo: 'EX 340',
    departureTime: '10:45',
    arrivalTime: '11:10',
    takenTime: '1H 15Minutes',
    name: 'Equinox',
    imgPath: 'Air4',
    price: 680,
    __v: 0,
  },
  {
    flightNo: 'AT 340',
    departureTime: '11:45',
    arrivalTime: '12:50',
    takenTime: '1H 05Minutes',
    name: 'AlturaJet',
    imgPath: 'Air5',
    price: 630,
    __v: 0,
  },
];

const flightController = {
  list: catchAsync(async (req, res) => {
    try {
      const flight = await Flight.find({});

      return res.ok(flight, 'Fetch Flight  Successfully. ');
    } catch (err) {
      return res.error(err);
    }
  }),
  add: catchAsync(async (req, res) => {
    try {
      flight.map(async (item) => {
        await Flight.create({ ...item });
      });

      return res.ok(flight, 'Flight Added  Successfully. ');
    } catch (err) {
      return res.error(err);
    }
  }),
};
export default flightController;
