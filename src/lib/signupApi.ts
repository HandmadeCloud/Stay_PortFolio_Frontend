import { fetchRequest } from './fetchRequest';

interface SignupRequest {
  email: string;
  password: string;
  name: string;
  phone_number: string;
}

interface SignupResponse {
  message: string;
}

export async function signupApi(data: SignupRequest): Promise<SignupResponse> {
  return fetchRequest<SignupResponse>('http://localhost:3000/api/v1/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}