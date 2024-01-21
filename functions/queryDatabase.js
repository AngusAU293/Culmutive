const mysql = require("mysql")

exports.handler = async (event, context) => {
    const connection = mysql.createConnection({
        host: "sql307.infinityfree.com",
        user: "if0_35829764",
        password: "Angus50293",
        database: "if0_35829764_Culmutive"
    });

    connection.connect()

    const query = "SELECT * FROM users";

    connection.query(query, (error, results) => {
        if (error) {
            connection.end();
            return {
                statusCode: 500,
                body: JSON.stringify({ message: "Internal Server Error" }),
            };
        }

        connection.end();

        return {
            statusCode: 200,
            body: JSON.stringify(results),
        };
    });
};
