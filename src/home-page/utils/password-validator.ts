// Function to check if a password meets certain requirements:
//  - At least 8 characters
//  - At least one digit
//  - At least one special character
export function passwordMeetsRequirements(password: string): boolean {
    const lengthReq = /.{8,}/; // 8+ characters
    const digitReq = /\d/;     // at least one digit
    const specialReq = /[!@#$%^&*(),.?":{}|<>]/; // at least one special character
  
    return lengthReq.test(password) 
        && digitReq.test(password) 
        && specialReq.test(password);
  }
  