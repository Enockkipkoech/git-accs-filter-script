import { Octokit } from "@octokit/core";
import dotenv from 'dotenv';
dotenv.config();


const octokit = new Octokit({ auth: process.env.GIT_FINE_GRAINED_TOKEN})

export { octokit};