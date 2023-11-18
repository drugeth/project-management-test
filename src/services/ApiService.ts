import axios, { AxiosResponse } from "axios";

class ApiService {
  private static instance: ApiService;

  private constructor() {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    // Itt lehetőséged van a választ feldolgozni, hibakezelést végezni, stb.
    return response.data;
  }

  async get<T>(url: string): Promise<T> {
    const response = await axios.get<T>(url);
    return this.handleResponse<T>(response);
  }

  // További metódusok (post, put, stb.) hozzáadhatók szükség esetén
}

export default ApiService;
