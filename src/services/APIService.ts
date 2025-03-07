import { genericRequest, genericRequestAutheticated } from "@/utils/genericRequest";

// const base_url = 'http://localhost:3000'

// const headers = {
//   'Content-Type': 'application/json',
//   Authorization: 'Bearer ' + localStorage.getItem('token'),
// }

export const sqlService = async (newItem: string) => {
  return await genericRequest('/items', 'POST', newItem)
}

export const getComments = async () => {
  const response = await genericRequestAutheticated('/attack/xss', 'GET')
  return response.results;
}

export const postComment = async (comment: string, user_id: number) => {
  return await genericRequestAutheticated(
    '/attack/xss',
    'POST',
    { comment, user_id }
  );
};

export const sqlInjection = async (query: string) => {
  return await genericRequestAutheticated(
    `/attack/sql-injection?term=${encodeURIComponent(query)}`,
    "GET"
  );
};