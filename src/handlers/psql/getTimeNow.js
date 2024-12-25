const initializeDB = require("../../db/initializeDB");

const selectNow = async () => {
  const l = await initializeDB`
        
SELECT * FROM crud_system.users
ORDER BY id ASC 

        `;

  console.log("---> ", l);
};

const p = async () => {
  await selectNow();
};

p();
