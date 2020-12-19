import { ResponseUserNamePipe } from './response-user-name.pipe';

describe('ResponseUserNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ResponseUserNamePipe();
    expect(pipe).toBeTruthy();
  });
});
