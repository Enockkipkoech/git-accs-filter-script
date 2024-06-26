import { octokit } from "./Octokit.js";
// import { HttpsProxyAgent } from 'https-proxy-agent';


const getUser = async (_username) => {
  // const proxyAgent = new HttpsProxyAgent('http://168.63.76.32:3128')


    try {  
    

    const resp = await octokit.request('GET /users/{username}', {
        username: _username,
        headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  },
        // agent: proxyAgent 
    })
    return resp;
} catch (error) {
    console.log("Error in getUser", error);
        return error;
}

    
};

export { getUser };