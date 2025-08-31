// Error service

export class ErrorService {
  // Log error to console
  static logError(error: any, context?: string): void {
    console.error(`[ERROR] ${context || 'Unknown context'}:`, error);
  }

  // Log warning to console
  static logWarning(warning: any, context?: string): void {
    console.warn(`[WARNING] ${context || 'Unknown context'}:`, warning);
  }

  // Format error message for display
  static formatErrorMessage(error: any): string {
    if (typeof error === 'string') {
      return error;
    }
    
    if (error instanceof Error) {
      return error.message;
    }
    
    if (error?.message) {
      return error.message;
    }
    
    return 'An unexpected error occurred';
  }

  // Handle API errors
  static handleApiError(error: any): { message: string; code?: string } {
    if (error?.response?.data?.message) {
      return {
        message: error.response.data.message,
        code: error.response.data.code
      };
    }
    
    if (error?.message) {
      return {
        message: error.message
      };
    }
    
    return {
      message: 'An unexpected error occurred while communicating with the server'
    };
  }

  // Handle validation errors
  static handleValidationError(errors: string[]): string {
    if (errors.length === 1) {
      return errors[0];
    }
    
    return `Please fix the following issues:\n${errors.map((err, i) => `${i + 1}. ${err}`).join('\n')}`;
  }

  // Create error object for consistent error handling
  static createError(message: string, code?: string, details?: any): Error {
    const error = new Error(message);
    (error as any).code = code;
    (error as any).details = details;
    return error;
  }

  // Check if error is network related
  static isNetworkError(error: any): boolean {
    return error?.code === 'NETWORK_ERROR' || 
           error?.message?.includes('Network Error') ||
           error?.message?.includes('Failed to fetch');
  }

  // Check if error is authentication related
  static isAuthError(error: any): boolean {
    return error?.response?.status === 401 || 
           error?.response?.status === 403 ||
           error?.code === 'AUTH_ERROR';
  }
}