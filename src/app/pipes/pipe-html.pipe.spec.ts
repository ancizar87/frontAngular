import { PipeHtmlPipe } from './pipe-html.pipe';

describe('PipeHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new PipeHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
