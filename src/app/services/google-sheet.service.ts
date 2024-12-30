import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root',
})
export class GoogleSheetService {
  private readonly apiKey = environment.googleApiKey;
  private readonly baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) {}

  getPlayerRecords(sheetId: string, range: string): Promise<any[]> {
    const url = `${this.baseUrl}/${sheetId}/values/${range}?key=${this.apiKey}`;
    
    console.log('Request URL:', url); // Log the URL
  
    return this.http
      .get<any>(url)
      .toPromise()
      .then((response) => {
        console.log('API Response:', response); // Log full response
        return response.values || []; // Extract values array
      })
      .catch((error) => {
        console.error('Error fetching player records:', error);
        return [];
      });
  }
  
}
