// API service for Strift backend integration
const API_BASE_URL = 'http://your-backend-url.com'; // Replace with your actual backend URL

export interface Job {
  job_id: string;
  type: 'train' | 'infer' | 'vton';
  status: 'pending' | 'running' | 'complete' | 'failed';
  progress?: string;
}

export interface TrainUploadResponse {
  job_id: string;
  status: string;
  message: string;
}

export interface InferResponse {
  job_id: string;
  status: string;
  images: string[];
}

export interface VTONUploadResponse {
  job_id: string;
  status: string;
}

export interface VTONResponse {
  job_id: string;
  status: string;
  output_url?: string;
}

class APIService {
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Upload training images
  async uploadTrainingImages(userId: string, images: File[]): Promise<TrainUploadResponse> {
    const formData = new FormData();
    formData.append('user_id', userId);
    
    images.forEach((image, index) => {
      formData.append('files[]', image);
    });

    const response = await fetch(`${API_BASE_URL}/train/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Get job status
  async getJobStatus(jobId: string): Promise<Job> {
    return this.makeRequest(`/jobs/${jobId}`);
  }

  // Get inference results
  async getInferenceResults(jobId: string): Promise<InferResponse> {
    return this.makeRequest(`/infer/${jobId}`);
  }

  // Upload VTON request
  async uploadVTONRequest(userId: string, inferImageId: string, garmentId: string): Promise<VTONUploadResponse> {
    return this.makeRequest('/vton/upload', {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        infer_image_id: inferImageId,
        garment_id: garmentId,
      }),
    });
  }

  // Get VTON results
  async getVTONResults(jobId: string): Promise<VTONResponse> {
    return this.makeRequest(`/vton/${jobId}`);
  }

  // Get all user jobs
  async getUserJobs(userId: string): Promise<Job[]> {
    return this.makeRequest(`/jobs?user_id=${userId}`);
  }
}

export const apiService = new APIService();