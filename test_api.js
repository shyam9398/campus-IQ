const axios = require('axios');
const API = 'http://localhost:5000/api';
(async () => {
  try {
    console.log('--- Signup ---');
    const signup = await axios.post(`${API}/auth/signup`, { name: 'testuser', password: 'testpass' });
    console.log('Signup response:', signup.data);
    const token = signup.data.token;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    console.log('--- Login (should fail duplicate) ---');
    try {
      await axios.post(`${API}/auth/login`, { name: 'testuser', password: 'testpass' });
    } catch (e) { console.log('Login after signup error (expected if duplicate):', e.response?.data); }

    console.log('--- Fetch colleges (public) ---');
    const collegesRes = await axios.get(`${API}/colleges?search=`);
    console.log('Colleges count:', collegesRes.data.length);
    const firstCollege = collegesRes.data[0];
    console.log('First college ID:', firstCollege.id);

    console.log('--- Save college ---');
    const saveRes = await axios.post(`${API}/user/save`, { collegeId: firstCollege.id });
    console.log('Save response:', saveRes.data);

    console.log('--- Get saved colleges ---');
    const savedRes = await axios.get(`${API}/user/saved`);
    console.log('Saved colleges count:', savedRes.data.length);

    console.log('--- Compare colleges (max 3) ---');
    const compareRes = await axios.post(`${API}/user/compare`, { collegeIds: [firstCollege.id] });
    console.log('Compare save:', compareRes.data);
    const getComp = await axios.get(`${API}/user/compare`);
    console.log('Compare list:', getComp.data);

    console.log('--- College detail ---');
    const detailRes = await axios.get(`${API}/colleges/${firstCollege.id}`);
    console.log('Detail name:', detailRes.data.name);

    console.log('--- Rank predictor ---');
    const rankRes = await axios.post(`${API}/tools/predict-rank`, { rank: 5000, course: 'Engineering' });
    console.log('Predict result groups:', Object.keys(rankRes.data));
  } catch (err) {
    console.error('Error during tests', err.response?.data || err.message);
  }
})();
