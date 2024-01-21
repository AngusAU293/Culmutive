const mysql = require('mysql');
const axios = require('axios');

exports.handler = async (event, context) => {
  const connection = mysql.createConnection({
    host: 'sql307.infinityfree.com',
    user: 'if0_35829764',
    password: 'Angus50293',
    database: 'if0_35829764_Culmutive',
  });

  connection.connect();

  const query = 'SELECT * FROM your_table';

  connection.query(query, async (error, results) => {
    if (error) {
      console.error('MySQL Query Error:', error);
      connection.end();
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' }),
      };
    }

    console.log('MySQL Query Result:', results);

    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      console.log('External API Response:', response.data);

      connection.end();

      return {
        statusCode: 200,
        body: JSON.stringify({ mysqlResults: results, externalApiData: response.data }),
      };
    } catch (error) {
      console.error('External API Request Error:', error);

      connection.end();

      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error making external API request' }),
      };
    }
  });
};
