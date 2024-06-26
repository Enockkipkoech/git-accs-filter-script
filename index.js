import axios from "axios";
import fs from "fs";
import { getUser } from "./gitUsers.js";


const main = async () => {


  console.log("Hello from main");


  try {
    // const jsonData = await axios({
    //     method: "GET",
    //     url: "https://raw.githubusercontent.com/starknet-io/provisions-data/main/github/github-0.json",
    // });

    // const saveData = fs.writeFileSync("play.json", JSON.stringify(jsonData.data));

    const data = JSON.parse(fs.readFileSync("epoch4.json", "utf-8"));
    const foundData = JSON.parse(fs.readFileSync("Founds4.json", "utf-8"));

    if (!data) {
      console.error("No data found");
    }
    data.eligibles.forEach(async (eligible) => {


      if ((eligible.identity)===(foundData.eligibles.identity) ) {
        console.log("Data already processed");
        return;
      }
      const gitName = eligible.identity;
      const gitUser = await getUser(gitName);

      if (gitUser.status === 200) {
        console.log("User found:", gitUser.data.login);
        eligible.status = "found";
      }
      // Remove Eligibles
      const filteredData = await removeEligiblesByIdentities(
        data,
        eligible.identity
      );
      fs.writeFileSync("Founds4.json", JSON.stringify(filteredData));

      if (gitUser.status === 404 && gitUser.data === undefined) {
        console.log("User not found");
        eligible.status = "not-found";
        fs.writeFileSync("NotFound4.json", JSON.stringify(data));
      }

   
    });
  } catch (error) {
    console.log("Error in MAIN", error);
  }

  // Function to remove objects with specific identities from the JSON data
  const removeEligiblesByIdentities = async (data, identitiesToRemove) => {
    if (!data || !Array.isArray(data.eligibles)) {
      console.error("Invalid data structure");
      return data; // Return the original data if the structure is invalid
    }

    const filteredEligibles = data.eligibles.filter(
      (eligible) => identitiesToRemove !== eligible.identity
    );

    return {
      eligibles: filteredEligibles,
    };
  };
};

main();
