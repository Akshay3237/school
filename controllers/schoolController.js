const School = require('../models/schoolModel');

exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Basic validation
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string.' });
  }
  if (!address || typeof address !== 'string' || address.trim() === '') {
    return res.status(400).json({ error: 'Address is required and must be a non-empty string.' });
  }
  if (latitude === undefined || typeof latitude !== 'number' || latitude < -90 || latitude > 90) {
    return res.status(400).json({ error: 'Latitude is required and must be a number between -90 and 90.' });
  }
  if (longitude === undefined || typeof longitude !== 'number' || longitude < -180 || longitude > 180) {
    return res.status(400).json({ error: 'Longitude is required and must be a number between -180 and 180.' });
  }

  const school = { name, address, latitude, longitude };

  School.createSchool(school, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: 'Database error: ' + err.message });
    }
    res.status(201).send({ message: "School added successfully", schoolId: result.insertId });
  });
};

exports.listSchools = (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (!userLat || !userLon) {
    return res.status(400).json({ error: 'latitude and longitude are required' });
  }
  console.log(userLat);
  console.log(userLon);
  School.getAllSchools((err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const schoolsWithDistance = results.map(school => {
      const distance = haversineDistance(userLat, userLon, school.latitude, school.longitude);
      return { ...school, distance };
    });
    
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.json(schoolsWithDistance);
  });
 
};


// Haversine formula
function haversineDistance(lat1, lon1, lat2, lon2) {
  function toRad(x) { return x * Math.PI / 180; }

  const R = 6371; // Radius of Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}