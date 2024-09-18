import { User } from './user';

describe('User', () => {
  it('deberia crear una instancia', () => {
    expect(new User()).toBeTruthy();
  });
});
