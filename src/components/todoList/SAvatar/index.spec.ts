import { getUserFirstName } from './core';

describe('>>> getUserFirstName', () => {
  it('when name is Jimmy should return J', () => {
    expect(getUserFirstName('Jimmy')).toBe('J');
  });

  it('when name is jimmy should return J', () => {
    expect(getUserFirstName('jimmy')).toBe('J');
  });

  it("when name is '' should return U", () => {
    expect(getUserFirstName('')).toBe('U');
  });
});
