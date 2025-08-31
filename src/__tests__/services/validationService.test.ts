import { ValidationService } from '@/services/validationService';

describe('ValidationService', () => {
  describe('isValidEmail', () => {
    it('should return true for valid emails', () => {
      expect(ValidationService.isValidEmail('test@example.com')).toBe(true);
      expect(ValidationService.isValidEmail('user.name@domain.co.zm')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(ValidationService.isValidEmail('invalid-email')).toBe(false);
      expect(ValidationService.isValidEmail('test@')).toBe(false);
      expect(ValidationService.isValidEmail('@example.com')).toBe(false);
    });
  });

  describe('isValidZambianPhone', () => {
    it('should return true for valid Zambian phone numbers', () => {
      expect(ValidationService.isValidZambianPhone('+260971234567')).toBe(true);
      expect(ValidationService.isValidZambianPhone('0961234567')).toBe(true);
    });

    it('should return false for invalid Zambian phone numbers', () => {
      expect(ValidationService.isValidZambianPhone('+260123456789')).toBe(false);
      expect(ValidationService.isValidZambianPhone('097123456789')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('should return valid for strong passwords', () => {
      const result = ValidationService.isValidPassword('Password123');
      expect(result.valid).toBe(true);
    });

    it('should return invalid for weak passwords', () => {
      expect(ValidationService.isValidPassword('pass').valid).toBe(false);
      expect(ValidationService.isValidPassword('password').valid).toBe(false);
      expect(ValidationService.isValidPassword('PASSWORD').valid).toBe(false);
      expect(ValidationService.isValidPassword('Password').valid).toBe(false);
    });
  });
});